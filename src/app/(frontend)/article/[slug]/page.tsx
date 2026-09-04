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

  const baseSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://doreports.in';
  const articleUrl = `${baseSiteUrl}/article/${slug}`;
  let imageUrl = article.image;
  if (imageUrl && !imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
    imageUrl = `${baseSiteUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
  }
  if (!imageUrl) {
    imageUrl = `${baseSiteUrl}/android-chrome-512x512.png`;
  }

  const description = article.snippet || article.title;

  return {
    title: `${article.title} | Do Reports`,
    description,
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: article.title,
      description,
      url: articleUrl,
      siteName: "Do Reports",
      type: "article",
      publishedTime: article.date,
      authors: [article.author || "Do Reports Desk"],
      images: [
        {
          url: imageUrl,
          secureUrl: imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@doreports26",
      creator: "@doreports26",
      title: article.title,
      description,
      images: [imageUrl],
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

