import Link from "next/link";
import { ChevronRight, TrendingUp, Zap, Clock } from "lucide-react";
import { 
  getMainStory, 
  getTopStories, 
  getStoriesBySection 
} from "@/lib/api";

export default async function Home() {
  const mainStory = await getMainStory();
  const topStories = await getTopStories(4);
  const politicsStories = await getStoriesBySection('politics', 2);
  const entertainmentStories = await getStoriesBySection('important', 2);
  const specialStories = await getStoriesBySection('special', 4);
  const webStories = await getStoriesBySection('welfare', 4);
  const sportsStories = await getStoriesBySection('education', 3);

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
              <div className="md:col-span-7 lg:col-span-7">
                <Link href={`/article/${mainStory.slug}`}>
                  <div className="relative group overflow-hidden cursor-pointer h-full transition-transform duration-300">
                    <div className="aspect-[4/3] lg:aspect-auto lg:h-full relative w-full overflow-hidden bg-gray-200">
                      <img 
                        src={mainStory.image} 
                        alt={mainStory.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* Tag */}
                      {mainStory.tag && (
                        <div className="absolute top-4 right-4 bg-primary-800 text-white px-2 py-0.5 text-xs font-bold shadow-md rounded-sm z-10">
                          {mainStory.tag}
                        </div>
                      )}
                      
                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent pt-12">
                        <div className="flex items-center gap-1.5 text-gray-300 text-xs mb-2">
                          <Clock className="w-3 h-3" />
                          <span>{mainStory.date}</span>
                        </div>
                        <h1 className="text-xl md:text-2xl font-bold text-white leading-tight group-hover:text-primary-300 transition-colors">
                          {mainStory.title}
                        </h1>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Top Stories List */}
              <div className="md:col-span-5 lg:col-span-5 flex flex-col gap-4">
                {topStories.map((story, idx) => (
                  <Link href={`/article/${story.slug}`} key={idx}>
                    <div className="flex gap-4 group cursor-pointer bg-white transition-shadow border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                      <div className="w-28 h-20 shrink-0 overflow-hidden bg-gray-200 relative">
                        <img 
                          src={story.image} 
                          alt={story.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {story.tag && (
                          <div className="absolute top-0 right-0 bg-primary-800 text-white text-[9px] px-1.5 py-0.5 font-bold">
                            {story.tag}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col justify-start flex-1 pt-0.5">
                        <h3 className="font-bold text-gray-900 line-clamp-3 group-hover:text-primary-600 transition-colors leading-snug text-[14px]">
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

            </div>

            {/* Bottom Categories Grid (Politics & Entertainment) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mt-4">
              {/* Politics Section */}
              <div className="col-span-1">
                <div className="flex items-center justify-between bg-[#090909] text-white px-4 py-2.5 mb-4 border-l-4 border-l-[#cd0442]">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-[#f72e06]" />
                    <h3 className="font-bold text-base">कल्याण- डोंबिवली (KDMC)</h3>
                  </div>
                  <Link href="/category/kalyan-dombivli" className="text-xs font-medium text-gray-300 hover:text-[#f72e06] flex items-center transition-colors">
                    See All <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
                
                <div className="flex flex-col gap-4 bg-white p-2 border border-gray-100 shadow-sm">
                  {politicsStories.map((story, idx) => (
                    <Link href={`/article/${story.slug}`} key={idx}>
                      <div className="flex gap-4 group cursor-pointer border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                        <div className="w-28 h-20 shrink-0 overflow-hidden bg-gray-200 rounded-sm">
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

              {/* Entertainment / Important Section */}
              <div className="col-span-1">
                <div className="flex items-center justify-between bg-[#090909] text-white px-4 py-2.5 mb-4 border-l-4 border-l-[#f72e06]">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-[#cd0442]" />
                    <h3 className="font-bold text-base">महत्वाचे</h3>
                  </div>
                  <Link href="/category/important" className="text-xs font-medium text-gray-300 hover:text-[#f72e06] flex items-center transition-colors">
                    See All <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
                
                <div className="flex flex-col gap-4 bg-white p-2 border border-gray-100 shadow-sm">
                  {entertainmentStories.map((story, idx) => (
                    <Link href={`/article/${story.slug}`} key={idx}>
                      <div className="flex gap-4 group cursor-pointer border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                        <div className="w-28 h-20 shrink-0 overflow-hidden bg-gray-200 rounded-sm">
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
            </div>

            {/* Special (विशेष) Section */}
            <div className="mt-6">
              {/* Header */}
              <div className="flex items-center justify-between bg-gradient-to-r from-[#cd0442] to-[#b10150] text-white px-4 py-3 mb-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-4 bg-white/80" />
                  <h3 className="font-bold text-lg">विशेष</h3>
                </div>
                <Link href="/category/special" className="text-sm font-bold text-white hover:text-white/80 flex items-center transition-colors">
                  See All <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              {/* Grid Layout matching reference image */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Main Feature with snippet */}
                <div className="md:col-span-7 lg:col-span-7">
                  <Link href={`/article/${mainStory.slug}`}>
                    <div className="relative group cursor-pointer flex flex-col">
                      <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-200 mb-4 rounded-sm">
                        <img 
                          src={mainStory.image} 
                          alt={mainStory.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {mainStory.tag && (
                          <div className="absolute top-0 right-0 bg-[#cd0442] text-white px-3 py-1 text-sm font-bold shadow-md z-10 rounded-bl-lg">
                            {mainStory.tag}
                          </div>
                        )}
                      </div>
                      
                      <h2 className="text-2xl font-bold text-[#090909] leading-snug group-hover:text-[#cd0442] transition-colors mb-2">
                        {mainStory.title}
                      </h2>
                      <div className="flex items-center gap-3 text-gray-500 text-xs font-medium mb-3">
                        <span className="text-gray-700">{mainStory.author}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full" />
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{mainStory.date}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                        {mainStory.snippet}
                      </p>
                    </div>
                  </Link>
                </div>

                {/* Right Side Vertical List */}
                <div className="md:col-span-5 lg:col-span-5 flex flex-col gap-5">
                  {specialStories.map((story, idx) => (
                    <Link href={`/article/${story.slug}`} key={idx}>
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
              </div>
            </div>

            {/* Web Stories / Welfare Section */}
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
                  <Link href={`/article/${story.slug}`} key={idx}>
                    <div className="relative group cursor-pointer overflow-hidden rounded-md aspect-[9/16] bg-gray-200 shadow-sm transition-transform duration-300">
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

            {/* Sports / Education Section */}
            <div className="mt-8">
              <div className="flex items-center justify-between bg-gradient-to-r from-[#090909] via-[#b10150] to-[#cd0442] text-white px-4 py-3 mb-6 shadow-sm">
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
                  <Link href={`/article/${story.slug}`} key={idx}>
                    <div className="flex flex-col group cursor-pointer bg-white rounded-md overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-full aspect-[4/3] relative overflow-hidden bg-gray-200">
                        <img 
                          src={story.image} 
                          alt={story.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-0 right-0 bg-[#cd0442] text-white text-[9px] px-2 py-0.5 font-bold rounded-bl-sm">
                          Do Reports
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="font-bold text-gray-800 text-[14px] leading-snug group-hover:text-[#cd0442] transition-colors line-clamp-3">
                          {story.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* Right Side Stories (Sticky Sidebar) */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24 self-start z-10 w-full pl-0 lg:pl-4">
            
            {/* Latest News Section */}
            <div className="flex flex-col mt-4">
              <div className="bg-gradient-to-r from-[#f72e06] to-[#cd0442] text-white rounded-full px-6 py-2 inline-flex items-center self-start gap-2 font-bold mb-4 shadow-md">
                <Zap className="w-4 h-4 fill-current" />
                LATEST NEWS
              </div>
              
              {/* Main Feature Card in Sidebar */}
              <Link href={`/article/${mainStory.slug}`}>
                <div className="relative group cursor-pointer overflow-hidden bg-white mb-6 shadow-sm border border-gray-100">
                  <div className="w-full h-[220px] overflow-hidden relative bg-gray-200">
                    <img 
                      src={mainStory.image} 
                      alt={mainStory.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090909]/90 via-[#090909]/40 to-transparent" />
                    <div className="absolute top-0 right-0 bg-[#cd0442] text-white px-3 py-1 text-[11px] font-bold shadow-md rounded-bl-lg">
                      Do Reports
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-1.5 text-gray-300 text-[11px] mb-2">
                        <Clock className="w-3 h-3" />
                        <span>{mainStory.date}</span>
                      </div>
                      <h3 className="font-bold text-white text-[17px] leading-snug group-hover:text-[#f72e06] transition-colors line-clamp-3">
                        {mainStory.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>

              {/* List of smaller news items under Latest News in Sidebar */}
              <div className="flex flex-col gap-4">
                {topStories.map((story, idx) => (
                  <Link href={`/article/${story.slug}`} key={idx}>
                    <div className="flex gap-4 group cursor-pointer bg-white transition-shadow border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                      <div className="flex flex-col justify-start flex-1 pt-0.5">
                        <h3 className="font-bold text-gray-900 line-clamp-3 group-hover:text-[#cd0442] transition-colors leading-snug text-[13px]">
                          {story.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-gray-500 text-[11px] mt-1.5">
                          <Clock className="w-3 h-3" />
                          <span>{story.date}</span>
                        </div>
                      </div>
                      <div className="w-24 h-[68px] shrink-0 overflow-hidden bg-gray-200 relative rounded-sm">
                        <img 
                          src={story.image} 
                          alt={story.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {story.tag && (
                          <div className="absolute top-0 right-0 bg-[#090909] text-white text-[8px] px-1 py-0.5 font-bold">
                            {story.tag}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}
