import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleBySlug, getTopStories } from "@/lib/api";
import { LatestNewsWidget } from "@/components/LatestNewsWidget";
import { ArticleShareButtons } from "@/components/ArticleShareButtons";
import { RichTextRenderer } from "@/components/RichTextRenderer";
import { Zap, BadgeCheck, Copy, Clock, Calendar, Eye } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
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
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const latestStories = await getTopStories(3);
  const author = article.authorDetails || {
    name: article.author || "Do Reports Desk",
    fullName: article.author || "Do Reports Desk",
    role: "Special Correspondent | Do Reports",
    avatar: null,
    avatarLetter: "DR",
    verified: true,
    bio: "Special Correspondent at Do Reports",
  };

  const categoryName = article.category?.name || article.tag || "ताज्या घडामोडी";
  const categorySlug = article.category?.slug || article.section || "latest-news";

  return (
    <main className="min-h-screen bg-white text-gray-900 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start relative">
          
          {/* Left Column (Main Content) */}
          <div className="lg:col-span-8 flex flex-col">
            
            {/* Category Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-5">
              <Link
                href={`/category/${categorySlug}`}
                className="inline-flex items-center gap-1.5 bg-[#cd0442] hover:bg-[#b10150] text-white text-[11px] font-bold px-3 py-1 uppercase tracking-wider shadow-sm rounded-[3px] transition-colors"
              >
                <Zap className="w-3 h-3 fill-current" />
                <span>{categoryName}</span>
              </Link>
              <span className="inline-flex items-center gap-1.5 bg-[#090909] text-white text-[11px] font-bold px-2.5 py-1 uppercase tracking-wider shadow-sm rounded-[3px]">
                {article.tag || "Do Reports"}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-[26px] sm:text-[32px] md:text-[38px] font-bold text-[#090909] leading-tight md:leading-[1.3] break-words mb-5 md:mb-6">
              {article.title}
            </h1>

            {/* Author and Social Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 gap-4 border-b border-gray-100">
              
              {/* Author Info */}
              <div className="flex items-center gap-3">
                <div className="w-[44px] h-[44px] rounded-full bg-gradient-to-br from-[#f72e06] to-[#cd0442] p-0.5 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm overflow-hidden">
                  {author.avatar ? (
                    <img src={author.avatar} alt={author.name} className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#090909] to-[#cd0442] flex items-center justify-center text-white text-xs font-bold">
                      {author.avatarLetter || "DR"}
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-1.5 text-[14px] font-bold text-gray-900 mb-0.5">
                    <span>By {author.name}</span>
                    {author.verified !== false && (
                      <BadgeCheck className="w-4 h-4 text-[#cd0442] fill-current" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      {article.date}
                    </span>
                    {article.views !== undefined && article.views > 0 && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3 text-gray-400" />
                          {article.views} Views
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Social Icons (Top Compact) */}
              <ArticleShareButtons title={article.title} slug={article.slug} variant="top-compact" />

            </div>

            {/* Main Hero Image */}
            <div className="w-full aspect-[16/10] sm:aspect-[1.8/1] relative bg-gray-100 overflow-hidden mb-8 rounded-xl shadow-sm border border-gray-100">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Snippet / Lead paragraph */}
            {article.snippet && (
              <div className="bg-gray-50/90 border-l-4 border-[#cd0442] p-4 sm:p-5 mb-8 rounded-r-lg shadow-sm">
                <p className="text-[#1a1a1a] text-[17px] sm:text-[18px] leading-[1.75] font-semibold">
                  {article.snippet}
                </p>
              </div>
            )}

            {/* Content (Article Body - Lexical AST & Plaintext Support) */}
            <div className="max-w-none mb-10">
              <RichTextRenderer
                content={article.content}
                rawContent={article.rawContent}
                snippet={article.snippet}
              />
            </div>

            {/* Tag List */}
            {article.tags && article.tags.length > 0 && (
              <div className="mb-8 border-t border-gray-100 pt-6">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-3">
                  संबंधित विषय (Tags):
                </span>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, i) => (
                    <Link
                      key={i}
                      href={`/search?q=${encodeURIComponent(tag)}`}
                      className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-[#cd0442] text-gray-800 hover:text-white text-[12px] font-semibold px-3.5 py-1.5 rounded-full transition-all cursor-pointer shadow-xs active:scale-95"
                    >
                      <span>#{tag}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Social Media Share Row (Bottom Bar) */}
            <ArticleShareButtons title={article.title} slug={article.slug} variant="bottom-bar" />

            {/* Author Bio Box */}
            <div className="border border-gray-200 bg-gray-50/50 p-5 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-10 rounded-xl">
              <div className="w-[72px] h-[72px] rounded-full overflow-hidden flex items-center justify-center shrink-0 border-2 border-white bg-gradient-to-br from-[#090909] via-[#b10150] to-[#cd0442] shadow-md">
                {author.avatar ? (
                  <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white font-bold text-lg">{author.avatarLetter || "DR"}</span>
                )}
              </div>
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="flex items-center gap-1.5 mb-1">
                  <h3 className="text-[20px] font-bold text-gray-900 leading-none">{author.fullName || author.name}</h3>
                  {author.verified !== false && (
                    <BadgeCheck className="w-5 h-5 text-[#cd0442] fill-current" />
                  )}
                </div>
                <p className="text-[#cd0442] text-xs font-semibold uppercase tracking-wider mb-2">
                  {author.role || "Special Correspondent | Do Reports"}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {author.bio || "Do Reports न्यूज डेस्कवरील अनुभवी पत्रकार. चालू घडामोडी आणि विशेष वृत्तांकनाचे काम पाहतात."}
                </p>
              </div>
            </div>

            {/* WhatsApp Group Banner */}
            <div className="flex flex-col sm:flex-row items-center justify-between bg-[#f0fdf4] border border-[#bbf7d0] p-4 sm:p-5 mb-10 rounded-xl shadow-xs gap-4">
              <div className="flex items-center gap-3 text-gray-800">
                <div className="w-10 h-10 rounded-full bg-[#25D366]/20 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-[#25D366] fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.002 22a9.96 9.96 0 0 1-5.084-1.39l-.364-.216-3.774.99 1.01-3.68-.237-.378A9.966 9.966 0 0 1 2.005 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm0-18.156A8.167 8.167 0 0 0 3.847 12c0 1.343.344 2.656.996 3.816l.161.288-.593 2.16 2.213-.58.277.15A8.164 8.164 0 0 0 12.002 20.156a8.167 8.167 0 0 0 0-16.312z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-[15px] text-gray-900">Join Do Reports WhatsApp Channel</h4>
                  <p className="text-gray-500 text-xs">ताज्या बातम्या थेट तुमच्या WhatsApp वर मिळवा</p>
                </div>
              </div>
              <a
                href="https://whatsapp.com/channel/0029Va9W8X69hXFBzBvM2O3k"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#22c55e] text-white px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-[#16a34a] active:scale-95 transition-all w-full sm:w-auto shadow-sm"
              >
                Join Channel
              </a>
            </div>

            {/* Latest Stories Grid */}
            <div className="flex flex-col mb-8 pt-4">
              <div className="flex items-center gap-2 mb-6">
                <Copy className="w-5 h-5 text-gray-800" />
                <h3 className="text-[22px] font-bold text-gray-900">Latest Stories</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {latestStories.map((story, idx) => (
                  <Link href={`/article/${story.slug}`} key={idx}>
                    <div className="flex flex-col group cursor-pointer gap-3">
                      <div className="w-full aspect-[16/10] bg-gray-200 overflow-hidden relative rounded-lg">
                        <img 
                          src={story.image} 
                          alt={story.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-0 right-0 bg-[#cd0442] text-white text-[10px] px-2 py-0.5 font-bold rounded-bl-sm">
                          {story.tag || "Do Reports"}
                        </div>
                      </div>
                      <h4 className="font-bold text-gray-900 text-[14px] leading-[1.4] group-hover:text-[#cd0442] transition-colors line-clamp-3">
                        {story.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
          
          {/* Right Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24 self-start z-10 w-full pl-0 lg:pl-4">
            
            {/* Advertisement Placeholder */}
            <div className="w-full aspect-square bg-[#f5f5f5] flex flex-col items-center pt-3 border border-gray-100 rounded-xl">
              <span className="text-[10px] text-gray-400 font-medium">---Advertisement---</span>
            </div>

            {/* Latest News Widget */}
            <div className="mt-2">
              <LatestNewsWidget />
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
