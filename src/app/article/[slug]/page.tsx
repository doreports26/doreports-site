import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleBySlug, topStories } from "@/lib/mockData";
import { LatestNewsWidget } from "@/components/LatestNewsWidget";
import { Zap, Share2, BadgeCheck, Copy } from "lucide-react";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // A basic parser to handle bold headings vs paragraphs from our mock content
  const renderContent = (content: string) => {
    const lines = content.split('\n').filter(line => line.trim() !== '');
    return lines.map((line, idx) => {
      return <p key={idx} className="text-[#333333] text-[17px] leading-[1.8] mb-6 font-medium">{line.trim()}</p>;
    });
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative">
          
          {/* Left Column (Main Content) */}
          <div className="lg:col-span-8 flex flex-col">
            
            {/* Category Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 bg-[#db2b2b] text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider shadow-sm">
                <Zap className="w-3 h-3 fill-current" />
                MARATHI NEWS
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#db2b2b] text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider shadow-sm">
                <Zap className="w-3 h-3 fill-current" />
                {article.tag || "महाराष्ट्र"}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-[32px] md:text-[38px] font-bold text-gray-900 leading-[1.3] mb-8">
              {article.title}
            </h1>

            {/* Author and Social Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 gap-4">
              
              {/* Author Info */}
              <div className="flex items-center gap-3">
                <div className="w-[42px] h-[42px] rounded-full bg-[#0a4a99] text-white flex items-center justify-center font-bold italic text-xl shrink-0 shadow-sm">
                  थो
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-1.5 text-[13px] font-bold text-gray-900 mb-0.5">
                    By {article.author || "Sonal.K"}
                    <BadgeCheck className="w-4 h-4 text-[#1DA1F2] fill-current" />
                  </div>
                  <div className="text-[11px] text-gray-500 font-medium">
                    On: {article.date} 4:16 PM
                  </div>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-2">
                <a href="#" className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.04c-5.5 0-10 4.48-10 10 0 5 3.66 9.15 8.44 9.9v-7h-2.54V12h2.54V9.8c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.9h-2.33v7C18.34 21.15 22 17.04 22 12.04c0-5.52-4.48-10-10-10z" />
                  </svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.002 22a9.96 9.96 0 0 1-5.084-1.39l-.364-.216-3.774.99 1.01-3.68-.237-.378A9.966 9.966 0 0 1 2.005 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm0-18.156A8.167 8.167 0 0 0 3.847 12c0 1.343.344 2.656.996 3.816l.161.288-.593 2.16 2.213-.58.277.15A8.164 8.164 0 0 0 12.002 20.156a8.167 8.167 0 0 0 0-16.312z" />
                  </svg>
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-[#2a2a2a] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-sm">
                  <Share2 className="w-[18px] h-[18px] fill-current" />
                </a>
              </div>

            </div>

            {/* Main Image */}
            <div className="w-full aspect-[16/10] sm:aspect-[1.8/1] relative bg-gray-200 overflow-hidden mb-10 rounded-sm shadow-sm">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content (Article Body) */}
            <div className="max-w-none">
              <p className="text-[#333333] text-[17px] leading-[1.8] mb-8 font-medium">
                {article.snippet || "त्यामुळे 93 रुपये प्रतिलिटर असलेला दर आता 102 रुपयांवर पोहोचणार आहे. हा वाढीव दर 28 फेब्रुवारी 2027 पर्यंत कायम राहणार आहे."}
              </p>

              <h3 className="font-bold text-[20px] text-gray-900 mb-5">
                {article.title.split('!')[0]} 102 रुपयांना :
              </h3>

              {article.content ? (
                renderContent(article.content)
              ) : (
                <p>No content available.</p>
              )}
            </div>

            {/* Added Bottom Sections */}
            
            {/* 1. Tag List */}
            <div className="flex flex-wrap gap-1.5 mb-8 mt-6 border-t border-gray-100 pt-6">
              {['Cattle feed Cost', 'Dairy Farmers', 'milk price hike', 'Mumbai Milk Price', 'Mumbai Milk Rate', 'दूध उत्पादक', 'दूध दरवाढ', 'पशुखाद्य खर्च', 'मुंबई दूध किंमत', 'मुंबई दूध दर'].map((tag, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 bg-[#222222] text-white text-[11px] font-bold px-3 py-1.5 rounded-sm hover:bg-black transition-colors cursor-pointer">
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>
                  {tag}
                </span>
              ))}
            </div>

            {/* 2. Social Media Share Row */}
            <div className="flex w-full gap-2 mb-10">
              <a href="#" className="flex-1 h-[42px] bg-[#3b5998] text-white flex items-center justify-center hover:opacity-90 transition-opacity rounded-[2px] shadow-sm">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-10 4.48-10 10 0 5 3.66 9.15 8.44 9.9v-7h-2.54V12h2.54V9.8c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.9h-2.33v7C18.34 21.15 22 17.04 22 12.04c0-5.52-4.48-10-10-10z" /></svg>
              </a>
              <a href="#" className="flex-1 h-[42px] bg-black text-white flex items-center justify-center hover:opacity-90 transition-opacity rounded-[2px] shadow-sm">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="#" className="flex-1 h-[42px] bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-opacity rounded-[2px] shadow-sm">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.002 22a9.96 9.96 0 0 1-5.084-1.39l-.364-.216-3.774.99 1.01-3.68-.237-.378A9.966 9.966 0 0 1 2.005 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm0-18.156A8.167 8.167 0 0 0 3.847 12c0 1.343.344 2.656.996 3.816l.161.288-.593 2.16 2.213-.58.277.15A8.164 8.164 0 0 0 12.002 20.156a8.167 8.167 0 0 0 0-16.312z" /></svg>
              </a>
              <a href="#" className="flex-1 h-[42px] bg-[#0088cc] text-white flex items-center justify-center hover:opacity-90 transition-opacity rounded-[2px] shadow-sm">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.5 1.201-.82 1.23-.696.065-1.225-.46-1.896-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.892-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              </a>
              <a href="#" className="flex-1 h-[42px] bg-[#111111] text-white flex items-center justify-center hover:opacity-90 transition-opacity rounded-[2px] shadow-sm">
                <Share2 className="w-5 h-5" />
              </a>
            </div>

            {/* 3. Author Box */}
            <div className="border border-dashed border-gray-400 p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10 rounded-sm">
              <div className="w-[85px] h-[85px] rounded-full overflow-hidden flex items-center justify-center shrink-0 border border-gray-100">
                <div className="w-full h-full rounded-full bg-white text-[#0a4a99] flex items-center justify-center font-bold italic text-[45px] relative">
                  <span className="absolute z-10" style={{ transform: 'translateY(-2px)' }}>थो</span>
                  {/* Subtle outer rings for the logo */}
                  <div className="absolute inset-0 border-[3px] border-l-[#ffc20e] border-t-transparent border-r-[#0a4a99] border-b-transparent rounded-full" style={{transform: 'rotate(-45deg)'}}></div>
                </div>
              </div>
              <div className="flex flex-col items-center sm:items-start mt-2">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <h3 className="text-[22px] font-bold text-gray-900 leading-none">{article.author || "Sonal.K"}</h3>
                  <BadgeCheck className="w-5 h-5 text-[#1DA1F2] fill-current" />
                </div>
                <p className="text-gray-600 text-sm font-medium">Sonal Kothimbire</p>
              </div>
            </div>

            {/* 4. WhatsApp Group Banner */}
            <div className="flex flex-col sm:flex-row items-center justify-between bg-[#f0fdf4] border border-[#bbf7d0] p-4 mb-10 rounded-sm shadow-sm gap-4">
              <div className="flex items-center gap-2 text-gray-800">
                <svg className="w-[22px] h-[22px] text-[#25D366] fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.002 22a9.96 9.96 0 0 1-5.084-1.39l-.364-.216-3.774.99 1.01-3.68-.237-.378A9.966 9.966 0 0 1 2.005 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm0-18.156A8.167 8.167 0 0 0 3.847 12c0 1.343.344 2.656.996 3.816l.161.288-.593 2.16 2.213-.58.277.15A8.164 8.164 0 0 0 12.002 20.156a8.167 8.167 0 0 0 0-16.312z" />
                </svg>
                <span className="font-medium text-[16px]">Join WhatsApp Group</span>
              </div>
              <button className="bg-[#22c55e] text-white px-8 py-2 rounded-sm font-bold text-sm hover:bg-[#16a34a] transition-colors w-full sm:w-auto">
                Join Now
              </button>
            </div>

            {/* 5. Latest Stories Grid */}
            <div className="flex flex-col mb-8 pt-4">
              <div className="flex items-center gap-2 mb-6">
                <Copy className="w-5 h-5 text-gray-800" />
                <h3 className="text-[22px] font-bold text-gray-900">Latest Stories</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {topStories.slice(0, 3).map((story, idx) => (
                  <Link href={`/article/${story.slug}`} key={idx}>
                    <div className="flex flex-col group cursor-pointer gap-3">
                      <div className="w-full aspect-[16/10] bg-gray-200 overflow-hidden relative rounded-sm">
                        <img 
                          src={story.image} 
                          alt="thumbnail" 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-0 right-0 bg-[#0B4A99] text-white text-[10px] px-2 py-0.5 font-bold rounded-bl-sm">
                          थोडक्यात
                        </div>
                      </div>
                      <h4 className="font-bold text-gray-900 text-[14px] leading-[1.4] group-hover:text-[#0B4A99] transition-colors line-clamp-3">
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
            <div className="w-full aspect-square bg-[#f5f5f5] flex flex-col items-center pt-3 border border-gray-100">
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
