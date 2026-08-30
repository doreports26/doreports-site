import Link from "next/link";
import { ChevronRight, TrendingUp, Zap, Clock, Newspaper } from "lucide-react";
import { 
  getMainStory, 
  getTopStories, 
  getStoriesBySection 
} from "@/lib/api";
import { LatestNewsWidget } from "@/components/LatestNewsWidget";

// Dynamic rendering for real-time news updates
export const dynamic = 'force-dynamic'

export default async function Home() {
  const mainStory = await getMainStory();
  const rawTopStories = await getTopStories(6);
  
  // Deduplicate top stories from main story
  const topStories = mainStory
    ? rawTopStories.filter((s) => s.slug !== mainStory.slug)
    : rawTopStories;

  const politicsStories = await getStoriesBySection('politics', 4);
  const entertainmentStories = await getStoriesBySection('important', 4);
  const specialStories = await getStoriesBySection('special', 4);
  const webStories = await getStoriesBySection('welfare', 4);
  const sportsStories = await getStoriesBySection('education', 4);

  // If no articles exist at all yet in the CMS
  if (!mainStory && topStories.length === 0) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center bg-white text-gray-900 px-4 font-sans">
        <div className="max-w-md text-center py-16">
          <div className="w-16 h-16 bg-red-50 text-[#cd0442] rounded-full flex items-center justify-center mx-auto mb-4">
            <Newspaper size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Do Reports मध्ये आपले स्वागत आहे</h1>
          <p className="text-gray-500 text-sm mb-6">
            बातम्या आणि घडामोडींचे दालन लवकरच अपडेट होत आहे. Sanity Studio मधून नवीन बातमी प्रसिद्ध करा.
          </p>
          <Link
            href="/studio"
            className="inline-flex items-center gap-2 bg-[#cd0442] hover:bg-[#b10150] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-lg shadow-sm transition-all"
          >
            Sanity Studio उघडा →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-gray-900 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-8">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 mb-8 md:mb-12 items-start relative">
          
          {/* Left Column (Main Content) */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            
            {/* Header Section */}
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-gray-700" />
              <h2 className="text-xl font-bold tracking-tight text-gray-900">ताज्या घडामोडी</h2>
            </div>

            {/* Top Feature Stories (Grid with Main Story and Top Stories list) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Main Feature Story */}
              {mainStory && (
                <div className={topStories.length > 0 ? "md:col-span-7 lg:col-span-7" : "md:col-span-12"}>
                  <Link href={`/article/${mainStory.slug}`}>
                    <div className="relative group overflow-hidden cursor-pointer h-full transition-transform duration-300 rounded-lg">
                      <div className="aspect-[4/3] lg:aspect-auto lg:h-full min-h-[320px] relative w-full overflow-hidden bg-gray-200">
                        <img 
                          src={mainStory.image} 
                          alt={mainStory.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        
                        {/* Tag */}
                        {mainStory.tag && (
                          <div className="absolute top-4 right-4 bg-[#cd0442] text-white px-2.5 py-1 text-xs font-bold shadow-md rounded-sm z-10">
                            {mainStory.tag}
                          </div>
                        )}
                        
                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/95 via-black/80 to-transparent pt-14">
                          <div className="flex items-center gap-1.5 text-gray-300 text-xs mb-2">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{mainStory.date}</span>
                          </div>
                          <h1 className="text-xl md:text-2xl font-bold text-white leading-tight group-hover:text-red-200 transition-colors">
                            {mainStory.title}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Top Stories List */}
              {topStories.length > 0 && (
                <div className={mainStory ? "md:col-span-5 lg:col-span-5 flex flex-col gap-4" : "md:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-4"}>
                  {topStories.slice(0, 4).map((story, idx) => (
                    <Link href={`/article/${story.slug}`} key={story.slug || idx}>
                      <div className="flex gap-4 group cursor-pointer bg-white transition-shadow border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                        <div className="w-28 h-20 shrink-0 overflow-hidden bg-gray-200 relative rounded-md">
                          <img 
                            src={story.image} 
                            alt={story.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          {story.tag && (
                            <div className="absolute top-0 right-0 bg-[#cd0442] text-white text-[9px] px-1.5 py-0.5 font-bold rounded-bl-sm">
                              {story.tag}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col justify-start flex-1 pt-0.5">
                          <h3 className="font-bold text-gray-900 line-clamp-3 group-hover:text-[#cd0442] transition-colors leading-snug text-[14px]">
                            {story.title}
                          </h3>
                          <div className="flex items-center gap-1.5 text-gray-500 text-[11px] mt-1.5">
                            <Clock className="w-3 h-3" />
                            <span>{story.date}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

            </div>

            {/* Categories Grid (Politics & Entertainment / Important) */}
            {(politicsStories.length > 0 || entertainmentStories.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mt-4">
                {/* Politics Section */}
                {politicsStories.length > 0 && (
                  <div className="col-span-1">
                    <div className="flex items-center justify-between bg-[#090909] text-white px-4 py-2.5 mb-4 border-l-4 border-l-[#cd0442] rounded-t-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-0.5 bg-[#f72e06]" />
                        <h3 className="font-bold text-base">कल्याण- डोंबिवली (KDMC)</h3>
                      </div>
                      <Link href="/category/kalyan-dombivli" className="text-xs font-medium text-gray-300 hover:text-[#f72e06] flex items-center transition-colors">
                        See All <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                    
                    <div className="flex flex-col gap-4 bg-white p-3 border border-gray-100 rounded-b-sm shadow-xs">
                      {politicsStories.map((story, idx) => (
                        <Link href={`/article/${story.slug}`} key={story.slug || idx}>
                          <div className="flex gap-4 group cursor-pointer border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                            <div className="w-28 h-20 shrink-0 overflow-hidden bg-gray-200 rounded-md">
                              <img 
                                src={story.image} 
                                alt={story.title} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                            <div className="flex flex-col justify-start flex-1 pt-0.5">
                              <h4 className="font-bold text-gray-800 text-[14px] leading-snug group-hover:text-[#cd0442] transition-colors line-clamp-3">
                                {story.title}
                              </h4>
                              <div className="flex items-center gap-1.5 text-gray-500 text-[11px] mt-1.5">
                                <Clock className="w-3 h-3" />
                                <span>{story.date}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Important Section */}
                {entertainmentStories.length > 0 && (
                  <div className="col-span-1">
                    <div className="flex items-center justify-between bg-[#090909] text-white px-4 py-2.5 mb-4 border-l-4 border-l-[#f72e06] rounded-t-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-0.5 bg-[#cd0442]" />
                        <h3 className="font-bold text-base">महत्वाचे</h3>
                      </div>
                      <Link href="/category/important" className="text-xs font-medium text-gray-300 hover:text-[#f72e06] flex items-center transition-colors">
                        See All <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                    
                    <div className="flex flex-col gap-4 bg-white p-3 border border-gray-100 rounded-b-sm shadow-xs">
                      {entertainmentStories.map((story, idx) => (
                        <Link href={`/article/${story.slug}`} key={story.slug || idx}>
                          <div className="flex gap-4 group cursor-pointer border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                            <div className="w-28 h-20 shrink-0 overflow-hidden bg-gray-200 rounded-md">
                              <img 
                                src={story.image} 
                                alt={story.title} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            </div>
                            <div className="flex flex-col justify-between flex-1 py-0.5">
                              <h4 className="font-bold text-gray-800 text-[14px] leading-[1.4] group-hover:text-[#cd0442] transition-colors line-clamp-3 -mt-[3px]">
                                {story.title}
                              </h4>
                              <div className="flex items-center gap-1.5 text-gray-500 text-[11px]">
                                <Clock className="w-3 h-3" />
                                <span>{story.date}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Special (विशेष) Section */}
            {specialStories.length > 0 && (
              <div className="mt-6">
                {/* Header */}
                <div className="flex items-center justify-between bg-gradient-to-r from-[#cd0442] to-[#b10150] text-white px-4 py-3 mb-6 shadow-sm rounded-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-4 bg-white/80" />
                    <h3 className="font-bold text-lg">विशेष</h3>
                  </div>
                  <Link href="/category/special" className="text-sm font-bold text-white hover:text-white/80 flex items-center transition-colors">
                    See All <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Main Feature */}
                  <div className={specialStories.length > 1 ? "md:col-span-7 lg:col-span-7" : "md:col-span-12"}>
                    <Link href={`/article/${specialStories[0].slug}`}>
                      <div className="relative group cursor-pointer flex flex-col">
                        <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-200 mb-4 rounded-lg">
                          <img 
                            src={specialStories[0].image} 
                            alt={specialStories[0].title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          {specialStories[0].tag && (
                            <div className="absolute top-0 right-0 bg-[#cd0442] text-white px-3 py-1 text-sm font-bold shadow-md z-10 rounded-bl-lg">
                              {specialStories[0].tag}
                            </div>
                          )}
                        </div>
                        
                        <h2 className="text-2xl font-bold text-[#090909] leading-snug group-hover:text-[#cd0442] transition-colors mb-2">
                          {specialStories[0].title}
                        </h2>
                        <div className="flex items-center gap-3 text-gray-500 text-xs font-medium mb-3">
                          <span className="text-gray-700">{specialStories[0].author || "Do Reports Desk"}</span>
                          <span className="w-1 h-1 bg-gray-300 rounded-full" />
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{specialStories[0].date}</span>
                          </div>
                        </div>
                        {specialStories[0].snippet && (
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                            {specialStories[0].snippet}
                          </p>
                        )}
                      </div>
                    </Link>
                  </div>

                  {/* Right Side Vertical List */}
                  {specialStories.length > 1 && (
                    <div className="md:col-span-5 lg:col-span-5 flex flex-col gap-5">
                      {specialStories.slice(1).map((story, idx) => (
                        <Link href={`/article/${story.slug}`} key={story.slug || idx}>
                          <div className="flex gap-4 group cursor-pointer border-b border-gray-100 last:border-0 pb-5 last:pb-0">
                            <div className="w-28 h-24 shrink-0 overflow-hidden relative bg-gray-200 rounded-md">
                              <img 
                                src={story.image} 
                                alt={story.title} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              {story.tag && (
                                <div className="absolute top-0 right-0 bg-[#090909] text-white text-[10px] px-1.5 py-0.5 font-bold">
                                  {story.tag}
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col justify-start flex-1 pt-0.5">
                              <h3 className="font-bold text-gray-900 line-clamp-3 group-hover:text-[#cd0442] transition-colors leading-snug text-[15px]">
                                {story.title}
                              </h3>
                              <div className="flex items-center gap-1.5 text-gray-500 text-[11px] mt-1.5">
                                <Clock className="w-3 h-3" />
                                <span>{story.date}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Welfare Section */}
            {webStories.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-[#f72e06] rounded-sm" />
                    <h3 className="font-bold text-2xl text-[#090909]">Welfare</h3>
                  </div>
                  <Link href="/category/welfare" className="bg-gradient-to-r from-[#f72e06] to-[#cd0442] text-white px-4 py-1.5 rounded-sm text-sm font-bold flex items-center hover:from-[#cd0442] hover:to-[#b10150] transition-colors shadow-sm">
                    See All <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {webStories.map((story, idx) => (
                    <Link href={`/article/${story.slug}`} key={story.slug || idx}>
                      <div className="relative group cursor-pointer overflow-hidden rounded-lg aspect-[9/16] bg-gray-200 shadow-sm transition-transform duration-300">
                        <img 
                          src={story.image} 
                          alt={story.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#090909]/95 via-[#090909]/30 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <div className="flex items-center gap-1 text-gray-300 text-[10px] mb-1.5">
                            <Clock className="w-2.5 h-2.5" />
                            <span>{story.date}</span>
                          </div>
                          <h4 className="font-bold text-white text-[13px] leading-tight group-hover:text-[#f72e06] transition-colors line-clamp-3">
                            {story.title}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Education (शिक्षण) Section */}
            {sportsStories.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between bg-gradient-to-r from-[#090909] via-[#b10150] to-[#cd0442] text-white px-4 py-3 mb-6 shadow-sm rounded-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-4 bg-white/70" />
                    <h3 className="font-bold text-lg">शिक्षण</h3>
                  </div>
                  <Link href="/category/education" className="text-sm font-bold text-white hover:text-white/80 flex items-center transition-colors">
                    See All <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {sportsStories.map((story, idx) => (
                    <Link href={`/article/${story.slug}`} key={story.slug || idx}>
                      <div className="flex flex-col group cursor-pointer bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-full aspect-[4/3] relative overflow-hidden bg-gray-200">
                          <img 
                            src={story.image} 
                            alt={story.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute top-0 right-0 bg-[#cd0442] text-white text-[9px] px-2 py-0.5 font-bold rounded-bl-sm">
                            {story.tag || "Do Reports"}
                          </div>
                        </div>
                        <div className="p-3.5">
                          <h4 className="font-bold text-gray-800 text-[14px] leading-snug group-hover:text-[#cd0442] transition-colors line-clamp-3">
                            {story.title}
                          </h4>
                          <div className="flex items-center gap-1.5 text-gray-500 text-[11px] mt-2">
                            <Clock className="w-3 h-3" />
                            <span>{story.date}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Side Sticky Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24 self-start z-10 w-full pl-0 lg:pl-4">
            
            {/* Latest News Widget */}
            <LatestNewsWidget />

          </div>

        </div>
      </div>
    </main>
  );
}
