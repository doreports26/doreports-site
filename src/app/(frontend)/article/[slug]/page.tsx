import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { getArticleBySlug, getTopStories } from "@/lib/api";
import { DraftModeBar } from "@/components/DraftModeBar";
import { ArticleTracker } from "@/components/analytics/ArticleTracker";
import { LiveArticleView } from "@/components/LiveArticleView";
import { LatestNewsWidget } from "@/components/LatestNewsWidget";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ preview?: string; draft?: string; id?: string; inStudio?: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const search = searchParams ? await searchParams : {};
  const isDraft = search?.preview === 'true' || search?.draft === 'true' || Boolean(search?.id);
  const article = await getArticleBySlug(slug, { isDraftMode: isDraft, documentId: search?.id });

  if (!article) {
    if (isDraft) {
      return {
        title: "Draft Preview | Do Reports",
      };
    }
    return {
      title: "Article Not Found | Do Reports",
    };
  }

  return {
    title: `${article.title} | Do Reports`,
    description: article.snippet || article.title,
    openGraph: {
      title: article.title,
      description: article.snippet || article.title,
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: "article",
      publishedTime: article.date,
      authors: [article.author || "Do Reports Desk"],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.snippet || article.title,
      images: [article.image],
    },
  };
}

export default async function ArticlePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ preview?: string; draft?: string; id?: string; inStudio?: string }>;
}) {
  const { isEnabled: isDraftCookieEnabled } = await draftMode();
  const { slug } = await params;
  const search = searchParams ? await searchParams : {};
  const inStudio = search?.inStudio === 'true';
  const isDraftMode =
    isDraftCookieEnabled ||
    search?.preview === 'true' ||
    search?.draft === 'true' ||
    Boolean(search?.id);

  const article = await getArticleBySlug(slug, {
    isDraftMode,
    documentId: search?.id,
  });

  // If not in draft/preview mode and article doesn't exist, return 404
  if (!article && !isDraftMode) {
    notFound();
  }

  const latestStories = await getTopStories(3);
  const author = article?.authorDetails || {
    name: article?.author || "Do Reports Desk",
    fullName: article?.author || "Do Reports Desk",
    role: "Special Correspondent | Do Reports",
    avatar: null,
    avatarLetter: "DR",
    verified: true,
    bio: "Special Correspondent at Do Reports",
  };

  const categoryName = article?.category?.name || article?.tag || "ताज्या घडामोडी";
  const wordCount = typeof article?.rawContent === 'string'
    ? article.rawContent.split(/\s+/).filter(Boolean).length
    : article?.content ? JSON.stringify(article.content).split(/\s+/).length : 0;

  return (
    <>
      {article && (
        <ArticleTracker
          slug={slug}
          title={article.title}
          category={categoryName}
          author={author.fullName || author.name}
          date={article.date}
          tags={article.tags || []}
          wordCount={wordCount}
        />
      )}
      {isDraftMode && !inStudio && (
        <DraftModeBar slug={slug} isPublished={Boolean(article)} />
      )}
      <LiveArticleView
        initialArticle={article}
        isDraftMode={isDraftMode}
        latestStories={latestStories}
        slug={slug}
        sidebar={<LatestNewsWidget />}
      />
    </>
  );
}

