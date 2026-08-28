import Link from "next/link";
import { Clock } from "lucide-react";
import { mainStory, topStories } from "@/lib/mockData";

export function LatestNewsWidget() {

  return (
    <div className="w-full flex flex-col font-sans bg-white pt-2">
      
      {/* Header Badge */}
      <div className="relative mb-6">
        <div className="inline-flex items-center space-x-2 bg-[#0a4a99] text-white px-5 py-2 rounded-r-3xl font-bold tracking-wide shadow-md">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
          <span className="uppercase text-lg">Latest News</span>
        </div>
      </div>

      {/* Top Featured Story */}
      <Link href={`/article/${mainStory.slug}`}>
        <div className="group cursor-pointer mb-6 border-b border-gray-100 pb-6">
          <div className="relative w-full h-[220px] bg-gray-200 overflow-hidden shadow-sm">
            {/* Tag */}
            <div className="absolute top-0 right-0 bg-[#0a4a99] text-white text-xs font-bold px-3 py-1 z-20">
              {mainStory.tag || "थोडक्यात"}
            </div>
            
            {/* Dark Gradient Overlay for Text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10"></div>
            
            {/* Content Overlaid */}
            <div className="absolute bottom-0 left-0 w-full p-4 z-20 flex flex-col justify-end">
              <div className="flex items-center space-x-1.5 text-white/90 text-[11px] mb-2 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>{mainStory.date}</span>
              </div>
              <h3 className="text-white font-bold text-xl leading-snug group-hover:text-[#ffc20e] transition-colors line-clamp-2">
                {mainStory.title}
              </h3>
            </div>
          </div>
        </div>
      </Link>

      {/* News List */}
      <div className="flex flex-col">
        {topStories.map((news, index) => (
          <Link href={`/article/${news.slug}`} key={news.slug}>
            <div 
              className={`flex items-start justify-between py-5 border-b border-gray-100 group cursor-pointer ${index === topStories.length - 1 ? 'border-b-0' : ''}`}
            >
              {/* Title & Date */}
              <div className="flex-1 pr-4 flex flex-col justify-between">
                <h4 className={`text-base font-bold leading-tight mb-3 line-clamp-3 transition-colors ${news.highlight ? 'text-[#0a4a99]' : 'text-gray-900 group-hover:text-[#0a4a99]'}`}>
                  {news.title}
                </h4>
                <div className="flex items-center space-x-1.5 text-gray-500 text-[11px] font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{news.date}</span>
                </div>
              </div>

              {/* Thumbnail Image */}
              <div className="w-[100px] h-[70px] bg-gray-200 shrink-0 relative overflow-hidden rounded-[2px]">
                <img 
                  src={news.image} 
                  alt="thumbnail" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {news.tag && (
                  <div className="absolute top-0 right-0 bg-[#0a4a99] text-white text-[9px] font-bold px-1.5 py-0.5 z-10">
                    {news.tag}
                  </div>
                )}
                {/* Image hover effect */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
