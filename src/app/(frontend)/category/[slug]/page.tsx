import Link from "next/link";
import { notFound } from "next/navigation";
import { LatestNewsWidget } from "@/components/LatestNewsWidget";
import { Pagination } from "@/components/Pagination";
import { getArticlesByCategory, getCategoryDetails, type ArticleItem } from "@/lib/api";
import { CategoryTracker } from "@/components/analytics/CategoryTracker";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const search = searchParams ? await searchParams : {};
  const details = await getCategoryDetails(slug);
  if (!details) {
    return {
      title: "श्रेणी सापडली नाही",
      robots: { index: false, follow: false },
    };
  }

  const title = details.seoTitle || details.title;
  const description =
    details.seoDescription ||
    details.description ||
    details.intro ||
    `${details.title} संबंधित ताज्या घडामोडी आणि सर्व महत्त्वाच्या बातम्या वाचा Do Reports वर.`;

  const canonicalPath = search?.page && parseInt(search.page, 10) > 1
    ? `/category/${slug}?page=${search.page}`
    : `/category/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "website",
      url: canonicalPath,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const categoryDetails = await getCategoryDetails(slug);

  if (!categoryDetails) {
    notFound();
  }

  const title = categoryDetails.title || categoryDetails.name || "Category";
  const currentPage = resolvedSearchParams?.page ? parseInt(resolvedSearchParams.page, 10) : 1;
  const { docs: articles, totalPages, totalDocs } = await getArticlesByCategory(slug, currentPage, 6);

  const breadcrumbJsonLd = breadcrumbSchema([
    { name: "मुख्यपृष्ठ", path: "/" },
    { name: title, path: `/category/${slug}` },
  ]);

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 font-sans">
      <JsonLd data={breadcrumbJsonLd} />
      <CategoryTracker
        slug={slug}
        title={title}
        currentPage={currentPage}
        totalArticles={totalDocs}
      />

      {/* Category Header */}
      <div className="mb-8 border-b-2 border-gray-100 pb-4 mt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-2 h-10 bg-gradient-to-b from-[#f72e06] to-[#cd0442] rounded-full"></div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#090909] tracking-tight">{title}</h1>
          </div>
          <div className="hidden md:flex items-center text-sm font-bold text-[#cd0442] uppercase tracking-widest bg-[#cd0442]/5 px-4 py-1.5 rounded-full border border-[#cd0442]/20">
            Category
          </div>
        </div>

        {/* Hyperlocal Intro Paragraph if available */}
        {categoryDetails.intro && (
          <p className="mt-4 text-sm md:text-base text-gray-600 leading-relaxed max-w-3xl">
            {categoryDetails.intro}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* LEFT COLUMN: Main Content */}
        <div className="lg:col-span-8 flex flex-col space-y-8">
          {articles.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              या श्रेणीमध्ये कोणतीही बातमी उपलब्ध नाही.
            </div>
          ) : (
            articles.map((item: ArticleItem, idx: number) => (
              <Link href={`/article/${item.slug}`} key={item.slug || idx}>
                <div className="flex flex-col md:flex-row gap-6 border-b border-gray-100 pb-8 last:border-0 group cursor-pointer">
                  {/* Thumbnail Image */}
                  <div className="w-full md:w-[40%] h-[220px] md:h-[200px] bg-gray-200 rounded-lg relative overflow-hidden shadow-sm">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-[#090909]/95 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1.5 uppercase tracking-wide z-10 shadow-md flex items-center space-x-2 rounded-[3px]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#f72e06] animate-pulse"></div>
                      <span>{title}</span>
                    </div>
                  </div>

                  {/* Content Details */}
                  <div className="w-full md:w-[60%] flex flex-col justify-center">
                    <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                      <span className="font-semibold text-[#cd0442]">By {item.author || "Do Reports Desk"}</span>
                      <span>—</span>
                      <span>{item.date}</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#cd0442] cursor-pointer transition-colors line-clamp-2">
                      {item.title}
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {item.snippet || "ही बातमीची सविस्तर माहिती आहे. या भागात बातमीचा सारांश किंवा महत्त्वाचे मुद्दे दिले जातील."}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath={`/category/${slug}`}
            />
          )}
        </div>

        {/* RIGHT COLUMN: Sidebar (Sticky) */}
        <div className="lg:col-span-4 relative">
          <div className="sticky top-24 space-y-8">
            {/* Latest News Widget */}
            <LatestNewsWidget />
          </div>
        </div>

      </div>
    </div>
  );
}
