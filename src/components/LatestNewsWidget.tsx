import Link from "next/link";
import { Clock, Zap } from "lucide-react";
import { getMainStory, getTopStories } from "@/lib/api";

export async function LatestNewsWidget() {
  const mainStory = await getMainStory();
  const topStories = await getTopStories(4);

  // If completely empty, render nothing or clean placeholder
  if (!mainStory && topStories.length === 0) {
    return null;
  }

  // Filter out mainStory from the topStories list to avoid duplicate display
  const otherStories = mainStory
    ? topStories.filter((s) => s.slug !== mainStory.slug)
    : topStories;

  return (
    <div className="w-full flex flex-col font-sans bg-white pt-2">
      {/* Header Badge */}
      <div className="relative mb-6">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#f72e06] to-[#cd0442] text-white px-5 py-2 rounded-r-3xl font-bold tracking-wide shadow-md">
          <Zap className="w-4 h-4 fill-current" />
          <span className="uppercase text-lg">Latest News</span>
        </div>
      </div>

      {/* Top Featured Story */}
      {mainStory && (
        <Link href={`/article/${mainStory.slug}`}>
          <div className="group cursor-pointer mb-6 border-b border-gray-100 pb-6">
            <div className="relative w-full h-[220px] bg-gray-200 overflow-hidden shadow-sm rounded-lg">
              {/* Tag */}
              {mainStory.tag && (
                <div className="absolute top-0 right-0 bg-[#cd0442] text-white text-xs font-bold px-3 py-1 z-20 rounded-bl-sm">
                  {mainStory.tag}
                </div>
              )}

              {/* Dark Gradient Overlay for Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090909]/95 via-[#090909]/40 to-transparent z-10"></div>

              {/* Image */}
              <img
                src={mainStory.image}
                alt={mainStory.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Content Overlaid */}
              <div className="absolute bottom-0 left-0 w-full p-4 z-20 flex flex-col justify-end">
                <div className="flex items-center space-x-1.5 text-white/90 text-[11px] mb-2 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{mainStory.date}</span>
                </div>
                <h3 className="text-white font-bold text-xl leading-snug group-hover:text-[#f72e06] transition-colors line-clamp-2">
                  {mainStory.title}
                </h3>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* News List */}
      {otherStories.length > 0 && (
        <div className="flex flex-col">
          {otherStories.map((news, index) => (
            <Link href={`/article/${news.slug}`} key={news.slug || index}>
              <div
                className={`flex items-start justify-between py-4 border-b border-gray-100 group cursor-pointer ${
                  index === otherStories.length - 1 ? "border-b-0" : ""
                }`}
              >
                {/* Title & Date */}
                <div className="flex-1 pr-4 flex flex-col justify-between">
                  <h4
                    className={`text-sm font-bold leading-snug mb-2 line-clamp-3 transition-colors ${
                      news.highlight
                        ? "text-[#cd0442]"
                        : "text-[#090909] group-hover:text-[#cd0442]"
                    }`}
                  >
                    {news.title}
                  </h4>
                  <div className="flex items-center space-x-1.5 text-gray-500 text-[11px] font-medium">
                    <Clock className="w-3 h-3" />
                    <span>{news.date}</span>
                  </div>
                </div>

                {/* Thumbnail Image */}
                <div className="w-[90px] h-[65px] bg-gray-200 shrink-0 relative overflow-hidden rounded-md">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {news.tag && (
                    <div className="absolute top-0 right-0 bg-[#090909] text-white text-[8px] font-bold px-1.5 py-0.5 z-10">
                      {news.tag}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
