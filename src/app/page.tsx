"use client";

import { motion } from "framer-motion";
import { ChevronRight, TrendingUp, Zap, Clock } from "lucide-react";

// Mock Data
const mainStory = {
  title: "सोन्याच्या दरात घसरण! जाणून घ्या आजचे दर",
  date: "August 26, 2026",
  image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1470&auto=format&fit=crop",
  tag: "थोडक्यात",
  author: "Sonal.K",
  snippet: "Gold Rate | गेल्या काही दिवसांपासून सोने आणि चांदीच्या किमतीत वाढीचा कल पाहायला मिळत होता. मात्र, 26 ऑगस्ट रोजी जळगावच्या..."
};

const topStories = [
  {
    title: "रक्षाबंधनाला लाडक्या बहिणींना लागली लॉटरी! खात्यात जमा होणार रक्कम; जाणून घ्या नवी अपडेट",
    date: "August 26, 2026",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1469&auto=format&fit=crop"
  },
  {
    title: "पुण्यात घर खरेदीची सर्वात मोठी संधी! म्हाडाची 4,462 घरांची सोडत जाहीर",
    date: "August 25, 2026",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1373&auto=format&fit=crop",
    tag: "म्हाडा"
  },
  {
    title: "आज राज्यात पाऊस हजेरी लावणार; 'या' 11 जिल्ह्यांना यलो अलर्ट जारी",
    date: "August 25, 2026",
    image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=1287&auto=format&fit=crop",
    tag: "हवामान"
  },
  {
    title: "गाडी घेणाऱ्यांसाठी मोठा झटका! 1 सप्टेंबरपासून Hyundai कारच्या किमती वाढणार",
    date: "August 24, 2026",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1470&auto=format&fit=crop"
  }
];

const politicsStories = [
  {
    title: "राहुल गांधींचा पोलिसांवर गंभीर आरोप; थेट पोलीस स्टेशनबाहेरच मांडला ठिय्या!",
    date: "August 21, 2026",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1459&auto=format&fit=crop"
  },
  {
    title: "मराठी माणसाच्या 'त्या' वर्तनावर श्वेता तिवारी भडकली! थेट राज ठाकरेंना केला सवाल",
    date: "August 21, 2026",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1470&auto=format&fit=crop"
  }
];

const entertainmentStories = [
  {
    title: "शूटिंगदरम्यान भीषण अपघात! कार्तिक आर्यन गंभीर जखमी; नेमकं काय घडलं?",
    date: "August 19, 2026",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1325&auto=format&fit=crop"
  },
  {
    title: "धुरंधर फेम अभिनेत्रीचा अवघ्या 23 व्या वर्षी साखरपुडा? पहा कोण आहे तिचा जोडीदार",
    date: "August 19, 2026",
    image: "https://images.unsplash.com/photo-1522856339183-5a70f0e0efc8?q=80&w=1374&auto=format&fit=crop",
    tag: "Exclusive"
  }
];

const webStories = [
  {
    title: `"हनिमूनच्या रात्री नवऱ्याने मला मित्रासोबत झोपायला"; करिश्मा कपूरचा गौप्यस्फोट!`,
    date: "April 12, 2025",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop"
  },
  {
    title: "'या' 5 गोष्टी केल्यानंतर तुम्हाला करिअरमध्ये मिळेल यश!",
    date: "October 17, 2024",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1288&auto=format&fit=crop"
  },
  {
    title: "रात्री झोपण्यापूर्वी नवरा-बायकोने कराव्यात 'या' गोष्टी, कधीच होणार नाही भांडण",
    date: "October 14, 2024",
    image: "https://images.unsplash.com/photo-1606902641753-2705f1df6dc9?q=80&w=1287&auto=format&fit=crop"
  },
  {
    title: "नवरात्रीतील हिरव्या रंगाचं महत्त्व तुम्हाला माहिती आहे का?",
    date: "October 4, 2024",
    image: "https://images.unsplash.com/photo-1596700676451-f7620a8c2789?q=80&w=1287&auto=format&fit=crop"
  }
];

const sportsStories = [
  {
    title: "कुलदीप यादव तब्बल 'इतक्या' विकेट्स घेणार; 'या' पाकिस्तानी खेळाडूच भाकीत",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=1467&auto=format&fit=crop"
  },
  {
    title: "रोहित शर्माच्या चाहत्यांसाठी दिलासादायक बातमी!",
    image: "https://images.unsplash.com/photo-1593766827228-8737b4534aa6?q=80&w=1374&auto=format&fit=crop"
  },
  {
    title: "दिल्ली कॅपिटल्सच्या स्टार खेळाडूला अटक! जाणून घ्या नेमकं प्रकरण काय?",
    image: "https://images.unsplash.com/photo-1624526267942-ab0f0bcecb26?q=80&w=1470&auto=format&fit=crop"
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-start relative">
          
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
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative group overflow-hidden cursor-pointer h-full"
                >
                  <div className="aspect-[4/3] lg:aspect-auto lg:h-full relative w-full overflow-hidden bg-gray-200">
                    <img 
                      src={mainStory.image} 
                      alt="Main story" 
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
                </motion.div>
              </div>

              {/* Top Stories List */}
              <div className="md:col-span-5 lg:col-span-5 flex flex-col gap-4">
                {topStories.map((story, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-4 group cursor-pointer bg-white transition-shadow border-b border-gray-100 last:border-0 pb-4 last:pb-0"
                  >
                    <div className="w-28 h-20 shrink-0 overflow-hidden bg-gray-200 relative">
                      <img 
                        src={story.image} 
                        alt="thumbnail" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {story.tag && (
                        <div className="absolute top-0 right-0 bg-primary-800 text-white text-[9px] px-1.5 py-0.5 font-bold">
                          {story.tag}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="font-bold text-gray-900 line-clamp-3 group-hover:text-primary-600 transition-colors leading-tight text-sm">
                        {story.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-gray-500 text-[11px] mt-1.5">
                        <Clock className="w-3 h-3" />
                        <span>{story.date}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>

            {/* Bottom Categories Grid (Politics & Entertainment) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {/* Politics Section */}
              <div className="col-span-1">
                <div className="flex items-center justify-between bg-primary-800 text-white px-4 py-2.5 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-white" />
                    <h3 className="font-bold text-base">राजकारण</h3>
                  </div>
                  <button className="text-xs font-medium text-primary-200 hover:text-white flex items-center transition-colors">
                    See All <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
                
                <div className="flex flex-col gap-4 bg-white p-2 border border-gray-100">
                  {politicsStories.map((story, idx) => (
                    <div key={idx} className="flex gap-4 group cursor-pointer border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                      <div className="w-32 h-20 shrink-0 overflow-hidden bg-gray-200">
                        <img 
                          src={story.image} 
                          alt="Politics" 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="font-bold text-gray-800 text-sm leading-snug group-hover:text-primary-600 transition-colors">
                          {story.title}
                        </h4>
                        <span className="text-gray-500 text-[11px] mt-1 block">{story.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Entertainment Section */}
              <div className="col-span-1">
                <div className="flex items-center justify-between bg-primary-800 text-white px-4 py-2.5 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-white" />
                    <h3 className="font-bold text-base">मनोरंजन</h3>
                  </div>
                  <button className="text-xs font-medium text-primary-200 hover:text-white flex items-center transition-colors">
                    See All <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
                
                <div className="flex flex-col gap-4 bg-white p-2 border border-gray-100">
                  {entertainmentStories.map((story, idx) => (
                    <div key={idx} className="flex gap-4 group cursor-pointer border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                      <div className="w-32 h-20 shrink-0 overflow-hidden bg-gray-200">
                        <img 
                          src={story.image} 
                          alt="Entertainment" 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="font-bold text-gray-800 text-sm leading-snug group-hover:text-primary-600 transition-colors line-clamp-3">
                          {story.title}
                        </h4>
                        <span className="text-gray-500 text-[11px] mt-1">{story.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Maharashtra Section (Added after Politics/Entertainment) */}
            <div className="mt-6">
              {/* Header */}
              <div className="flex items-center justify-between bg-[#0B4A99] text-white px-4 py-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-4 bg-white/70" />
                  <h3 className="font-bold text-lg">महाराष्ट्र</h3>
                </div>
                <button className="text-sm font-bold text-white hover:text-gray-200 flex items-center transition-colors">
                  See All <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              {/* Grid Layout matching reference image */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Main Feature with snippet */}
                <div className="md:col-span-7 lg:col-span-7">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative group cursor-pointer flex flex-col"
                  >
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-200 mb-4">
                      <img 
                        src={mainStory.image} 
                        alt="Maharashtra story" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {mainStory.tag && (
                        <div className="absolute top-0 right-0 bg-[#0B4A99] text-white px-3 py-1 text-sm font-bold shadow-md z-10 rounded-bl-lg">
                          {mainStory.tag}
                        </div>
                      )}
                    </div>
                    
                    <h2 className="text-2xl font-bold text-gray-900 leading-snug group-hover:text-[#0B4A99] transition-colors mb-2">
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
                  </motion.div>
                </div>

                {/* Right Side Vertical List */}
                <div className="md:col-span-5 lg:col-span-5 flex flex-col gap-5">
                  {topStories.map((story, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex gap-4 group cursor-pointer border-b border-gray-100 last:border-0 pb-5 last:pb-0"
                    >
                      <div className="w-32 h-24 shrink-0 overflow-hidden relative bg-gray-200 rounded-md">
                        <img 
                          src={story.image} 
                          alt="thumbnail" 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {story.tag && (
                          <div className="absolute top-0 right-0 bg-[#0B4A99] text-white text-[10px] px-1.5 py-0.5 font-bold">
                            {story.tag}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col justify-center">
                        <h3 className="font-bold text-gray-900 line-clamp-3 group-hover:text-[#0B4A99] transition-colors leading-snug text-[15px]">
                          {story.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-gray-500 text-xs mt-2">
                          <Clock className="w-3 h-3" />
                          <span>{story.date}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Web Stories Section */}
            <div className="mt-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-black rounded-sm" />
                  <h3 className="font-bold text-2xl text-gray-900">Web Stories</h3>
                </div>
                <button className="bg-[#0B4A99] text-white px-4 py-1.5 rounded-sm text-sm font-bold flex items-center hover:bg-blue-800 transition-colors">
                  See All <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              {/* Web Stories Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {webStories.map((story, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative group cursor-pointer overflow-hidden rounded-md aspect-[9/16] bg-gray-200 shadow-sm"
                  >
                    <img 
                      src={story.image} 
                      alt="Web story" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <div className="flex items-center gap-1 text-gray-300 text-[10px] mb-1.5">
                        <Clock className="w-2.5 h-2.5" />
                        <span>{story.date}</span>
                      </div>
                      <h4 className="font-bold text-white text-[13px] leading-tight group-hover:text-gray-200 transition-colors line-clamp-3">
                        {story.title}
                      </h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sports (खेळ) Section */}
            <div className="mt-8">
              {/* Header */}
              <div className="flex items-center justify-between bg-[#0B4A99] text-white px-4 py-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-4 bg-white/70" />
                  <h3 className="font-bold text-lg">खेळ</h3>
                </div>
                <button className="text-sm font-bold text-white hover:text-gray-200 flex items-center transition-colors">
                  See All <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              {/* Sports Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {sportsStories.map((story, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex flex-col group cursor-pointer bg-white rounded-md overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-full aspect-[4/3] relative overflow-hidden bg-gray-200">
                      <img 
                        src={story.image} 
                        alt="Sports" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-0 right-0 bg-[#0B4A99] text-white text-[9px] px-2 py-0.5 font-bold rounded-bl-sm">
                        थोडक्यात
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="font-bold text-gray-800 text-[14px] leading-snug group-hover:text-[#0B4A99] transition-colors line-clamp-3">
                        {story.title}
                      </h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Side Stories (Sticky Sidebar) */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24 self-start z-10 w-full pl-0 lg:pl-4">
            
            {/* Latest News Section */}
            <div className="flex flex-col mt-4">
              <div className="bg-[#0B4A99] text-white rounded-full px-6 py-2 inline-flex items-center self-start gap-2 font-bold mb-4 shadow-sm">
                <Zap className="w-4 h-4 fill-current" />
                LATEST NEWS
              </div>
              
              {/* Main Feature Card in Sidebar */}
              <div className="relative group cursor-pointer overflow-hidden bg-white mb-6 shadow-sm border border-gray-100">
                <div className="w-full h-[220px] overflow-hidden relative bg-gray-200">
                  <img 
                    src={mainStory.image} 
                    alt="Latest News" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute top-0 right-0 bg-[#0B4A99] text-white px-3 py-1 text-[11px] font-bold shadow-md rounded-bl-lg">
                    थोडक्यात
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-1.5 text-gray-300 text-[11px] mb-2">
                      <Clock className="w-3 h-3" />
                      <span>{mainStory.date}</span>
                    </div>
                    <h3 className="font-bold text-white text-[17px] leading-snug group-hover:text-blue-200 transition-colors line-clamp-3">
                      {mainStory.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Added List of smaller news items under Latest News in Sidebar */}
              <div className="flex flex-col gap-4">
                {topStories.map((story, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-4 group cursor-pointer bg-white transition-shadow border-b border-gray-100 last:border-0 pb-4 last:pb-0"
                  >
                    {/* Text on Left (To match screenshot) */}
                    <div className="flex flex-col justify-center flex-1">
                      <h3 className="font-bold text-gray-900 line-clamp-3 group-hover:text-[#0B4A99] transition-colors leading-tight text-sm">
                        {story.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-gray-500 text-[11px] mt-1.5">
                        <Clock className="w-3 h-3" />
                        <span>{story.date}</span>
                      </div>
                    </div>
                    {/* Image on Right (To match screenshot) */}
                    <div className="w-24 h-[68px] shrink-0 overflow-hidden bg-gray-200 relative rounded-sm">
                      <img 
                        src={story.image} 
                        alt="thumbnail" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {story.tag && (
                        <div className="absolute top-0 right-0 bg-[#0B4A99] text-white text-[8px] px-1 py-0.5 font-bold">
                          {story.tag}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}
