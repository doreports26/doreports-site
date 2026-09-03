import Link from "next/link";
import { LatestNewsWidget } from "@/components/LatestNewsWidget";
import { Pagination } from "@/components/Pagination";
import { searchArticles, type ArticleItem } from "@/lib/api";
import { SearchTracker } from "@/components/analytics/SearchTracker";
import { Search as SearchIcon, AlertCircle, ArrowRight } from "lucide-react";
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";
  return {
    title: query ? `शोधाचे निकाल: "${query}" | Do Reports` : `बातमी शोधा | Do Reports`,
    description: `Search results for "${query}" on Do Reports - Marathi News & Updates`,
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = (resolvedParams.q || "").trim();
  const currentPage = resolvedParams.page ? parseInt(resolvedParams.page, 10) : 1;

  const { docs: articles, totalDocs, totalPages } = await searchArticles(query, currentPage, 8);

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 font-sans">
      <SearchTracker query={query} totalDocs={totalDocs} />
      {/* Search Header Banner */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white rounded-2xl p-6 md:p-10 mb-10 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#cd0442] opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center space-x-2 text-[#f72e06] text-xs font-bold uppercase tracking-widest mb-3">
            <span className="w-4 h-[2px] bg-[#f72e06]"></span>
            <span>Search Results</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4 text-white">
            {query ? (
              <span>
                निकाल: <span className="text-[#f72e06] font-normal">&ldquo;{query}&rdquo;</span>
              </span>
            ) : (
              <span>बातमी शोधा</span>
            )}
          </h1>

          <p className="text-gray-300 text-sm md:text-base mb-6">
            {query ? (
              <span>
                <strong className="text-white">{totalDocs}</strong> लेख सापडले
              </span>
            ) : (
              "कोणताही विषय किंवा बातमी शोधण्यासाठी खालील बॉक्समध्ये टाइप करा."
            )}
          </p>

          {/* In-page quick search bar */}
          <form action="/search" method="GET" className="relative flex items-center max-w-xl">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="दुसरी बातमी शोधा..."
              className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 text-base rounded-full py-3.5 pl-5 pr-14 focus:outline-none focus:ring-2 focus:ring-[#f72e06] focus:border-transparent transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 bg-gradient-to-r from-[#f72e06] to-[#cd0442] hover:opacity-90 text-white p-2.5 rounded-full transition-transform active:scale-95 shadow-md"
              aria-label="Search"
            >
              <SearchIcon size={18} />
            </button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT COLUMN: Main Content */}
        <div className="lg:col-span-8 flex flex-col space-y-8">
          {articles.length === 0 ? (
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 md:p-12 text-center">
              <div className="w-16 h-16 bg-red-50 text-[#cd0442] rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">कोणताही निकाल सापडला नाही</h2>
              <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto mb-8">
                &ldquo;{query}&rdquo; या शब्दासाठी कोणतीही बातमी उपलब्ध नाही. कृपया वेगळा शब्द वापरून पहा किंवा खालील लोकप्रिय श्रेणी तपासा.
              </p>

              <div className="border-t border-gray-200 pt-6 max-w-lg mx-auto">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-4">
                  लोकप्रिय श्रेणी (Popular Categories)
                </span>
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    { name: "Latest News", href: "/category/latest-news" },
                    { name: "कल्याण- डोंबिवली (KDMC)", href: "/category/kalyan-dombivli" },
                    { name: "जव्हार-पालघर", href: "/category/jawhar-palghar" },
                    { name: "महत्वाचे", href: "/category/important" },
                    { name: "विशेष", href: "/category/special" },
                    { name: "Welfare", href: "/category/welfare" },
                    { name: "शिक्षण", href: "/category/education" },
                    { name: "उद्योजकता", href: "/category/entrepreneurship" },
                  ].map((cat, i) => (
                    <Link
                      key={i}
                      href={cat.href}
                      className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 text-xs font-semibold hover:border-[#cd0442] hover:text-[#cd0442] transition-colors shadow-sm"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            articles.map((item: ArticleItem, idx: number) => (
              <Link href={`/article/${item.slug}`} key={item.slug || idx} className="group">
                <div className="flex flex-col sm:flex-row gap-6 border-b border-gray-100 pb-8 last:border-0 cursor-pointer">
                  {/* Thumbnail Image */}
                  <div className="w-full sm:w-[220px] md:w-[260px] h-[200px] sm:h-[160px] md:h-[180px] bg-gray-100 rounded-xl relative overflow-hidden shadow-sm flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-[#090909]/95 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 uppercase tracking-wide z-10 shadow-md flex items-center space-x-1.5 rounded-[3px]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#f72e06] animate-pulse"></div>
                      <span>{item.tag || "Do Reports"}</span>
                    </div>
                  </div>

                  {/* Content Details */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                        <span className="font-semibold text-[#cd0442]">By {item.author || "Do Reports Desk"}</span>
                        <span>—</span>
                        <span>{item.date}</span>
                      </div>
                      <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2 leading-snug group-hover:text-[#cd0442] transition-colors line-clamp-2">
                        {item.title}
                      </h2>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 md:line-clamp-3">
                        {item.snippet || "ही बातमीची सविस्तर माहिती आहे. या भागात बातमीचा सारांश किंवा महत्त्वाचे मुद्दे दिले जातील."}
                      </p>
                    </div>
                    <div className="flex items-center text-xs font-bold text-[#cd0442] uppercase tracking-wider mt-3 group-hover:translate-x-1 transition-transform">
                      <span>संपूर्ण बातमी वाचा</span>
                      <ArrowRight size={14} className="ml-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath={`/search?q=${encodeURIComponent(query)}`}
            />
          )}
        </div>

        {/* RIGHT COLUMN: Sidebar */}
        <div className="lg:col-span-4 relative">
          <div className="sticky top-24 space-y-8">
            {/* Ad Placeholder */}
            <div className="w-full h-[250px] bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center text-gray-400 text-xs tracking-widest uppercase rounded-xl">
              - Advertisement -
            </div>

            {/* Latest News Widget */}
            <LatestNewsWidget />
          </div>
        </div>
      </div>
    </div>
  );
}
