import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { getArticleBySlug, getTopStories } from "@/lib/api";
import { DraftModeBar } from "@/components/DraftModeBar";
import { ArticleTracker } from "@/components/analytics/ArticleTracker";
import { LiveArticleView } from "@/components/LiveArticleView";
import { LatestNewsWidget } from "@/components/LatestNewsWidget";
import { urlFor } from "@/sanity/image";
import { abs, SITE } from "@/lib/seo/config";
import { newsArticleSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from "next";

// Fallback ISR revalidation (1 hour). Primary revalidation is event-driven via /api/revalidate webhook.
export const revalidate = 3600;

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
        title: "Draft Preview",
        robots: { index: false, follow: false },
      };
    }
    return {
      title: "बातमी सापडली नाही",
      robots: { index: false, follow: false },
    };
  }

  const path = `/article/${article.slug.toLowerCase()}`;
  const title = article.seoTitle || article.title;
  const description = article.seoDescription || article.snippet || article.excerpt || article.title;

  let ogImage = abs('/android-chrome-512x512.png');
  if (article.mainImage) {
    try {
      ogImage = urlFor(article.mainImage).width(1200).height(630).fit('crop').format('jpg').quality(80).url();
    } catch {
      ogImage = article.image && article.image.startsWith('http') ? article.image : abs(article.image || '/android-chrome-512x512.png');
    }
  } else if (article.image) {
    ogImage = article.image.startsWith('http') ? article.image : abs(article.image);
  }

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: 'article',
      url: path,
      title,
      description,
      siteName: SITE.name,
      locale: SITE.locale,
      publishedTime: article.publishedAt || article.date,
      modifiedTime: article._updatedAt ?? article.publishedAt ?? article.date,
      authors: [article.author || SITE.name],
      section: article.category?.title || article.category?.name,
      tags: article.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: SITE.twitter,
      creator: SITE.twitter,
      title,
      description,
      images: [ogImage],
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

  const rawCatSlug = article?.category?.slug || 'latest-news';
  const canonicalCatSlug = rawCatSlug === 'trending' ? 'important' : rawCatSlug;
  const categoryName = article?.category?.title || article?.category?.name || article?.tag || "ताज्या घडामोडी";

  const wordCount = typeof article?.rawContent === 'string'
    ? article.rawContent.split(/\s+/).filter(Boolean).length
    : article?.content ? JSON.stringify(article.content).split(/\s+/).length : 0;

  // 3 image crops for NewsArticle structured data (16:9, 4:3, 1:1)
  const schemaImages: string[] = [];
  if (article?.mainImage) {
    try {
      schemaImages.push(
        urlFor(article.mainImage).width(1200).height(675).fit('crop').format('jpg').quality(80).url(),
        urlFor(article.mainImage).width(1200).height(900).fit('crop').format('jpg').quality(80).url(),
        urlFor(article.mainImage).width(1200).height(1200).fit('crop').format('jpg').quality(80).url()
      );
    } catch {
      if (article.image) schemaImages.push(article.image.startsWith('http') ? article.image : abs(article.image));
    }
  } else if (article?.image) {
    schemaImages.push(article.image.startsWith('http') ? article.image : abs(article.image));
  } else {
    schemaImages.push(abs(SITE.logo));
  }

  const articleJsonLd = article
    ? newsArticleSchema({ ...article, slug: article.slug.toLowerCase() }, schemaImages)
    : null;
  const breadcrumbJsonLd = article
    ? breadcrumbSchema([
        { name: "मुख्यपृष्ठ", path: "/" },
        { name: categoryName, path: `/category/${canonicalCatSlug}` },
        { name: article.title, path: `/article/${article.slug.toLowerCase()}` },
      ])
    : null;

  const structuredData = [articleJsonLd, breadcrumbJsonLd].filter(Boolean) as object[];

  return (
    <>
      {article && structuredData.length > 0 && (
        <JsonLd data={structuredData} />
      )}
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
