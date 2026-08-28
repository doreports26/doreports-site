import Link from "next/link";
import Image from "next/image";
import { LatestNewsWidget } from "@/components/LatestNewsWidget";
import { Pagination } from "@/components/Pagination";
import type { Metadata } from 'next';

// Map slugs back to Marathi titles for display
const categoryTitles: Record<string, string> = {
  "latest-news": "Latest News",
  "kalyan-dombivli": "कल्याण- डोंबिवली (KDMC)",
  important: "महत्वाचे",
  special: "विशेष",
  welfare: "Welfare",
  education: "शिक्षण",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const title = categoryTitles[slug] || "Category";
  return {
    title: `${title} बातम्या | थोडक्यात News`,
    description: `Read the latest updates and breaking news for ${title} on थोडक्यात.`,
  };
}

export default async function CategoryPage({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const title = categoryTitles[slug] || "Category";
  const currentPage = resolvedSearchParams.page ? parseInt(resolvedSearchParams.page, 10) : 1;
  const totalPages = 8; // Mock total pages for demonstration

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 font-sans">

      {/* Premium Category Header */}
      <div className="flex items-center justify-between mb-10 border-b-2 border-gray-100 pb-4 mt-2">
        <div className="flex items-center space-x-4">
          <div className="w-2 h-10 bg-[#004a99] rounded-full"></div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">{title}</h1>
        </div>
        <div className="hidden md:flex items-center text-sm font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100">
          Category
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* LEFT COLUMN: Main Content */}
        <div className="lg:col-span-8 flex flex-col space-y-8">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex flex-col md:flex-row gap-6 border-b border-gray-100 pb-8 last:border-0 group cursor-pointer">
              {/* Image Placeholder */}
              <div className="w-full md:w-[40%] h-[220px] md:h-[200px] bg-gray-200 rounded-lg relative overflow-hidden shadow-sm">

                {/* Polished Category Tag */}
                <div className="absolute top-3 left-3 bg-[#004a99]/95 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1.5 uppercase tracking-wide z-10 shadow-md flex items-center space-x-2 rounded-[3px]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#f58220] animate-pulse"></div>
                  <span>{title}</span>
                </div>
                {/* Simulated Image Hover */}
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300"></div>
              </div>

              {/* Content */}
              <div className="w-full md:w-[60%] flex flex-col justify-center">
                <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                  <span className="font-semibold text-[#004a99]">By थोडक्यात Desk</span>
                  <span>—</span>
                  <span>July 14, 2026</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-snug hover:text-[#004a99] cursor-pointer transition-colors line-clamp-2">
                  समूह किंवा मुख्य बातम्यांचे शीर्षक येथे येईल जे लक्ष वेधून घेईल
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  ही बातमीची सविस्तर माहिती आहे. या भागात बातमीचा सारांश किंवा महत्त्वाचे मुद्दे दिले जातील जे वाचकांना संपूर्ण बातमी वाचण्यासाठी प्रवृत्त करतील.
                </p>
              </div>
            </div>
          ))}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath={`/category/${slug}`}
          />
        </div>

        {/* RIGHT COLUMN: Sidebar (Sticky) */}
        <div className="lg:col-span-4 relative">
          <div className="sticky top-24 space-y-8">

            {/* Ad Placeholder */}
            <div className="w-full h-[250px] bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 text-xs tracking-widest uppercase rounded-sm">
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
