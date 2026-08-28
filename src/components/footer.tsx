import Link from "next/link";
import { Rss, ArrowRight } from "lucide-react";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14-3.443 0-5.643 2.15-5.643 5.92V9.5H6.5v4h2.5v10.5h5V13.5z" />
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.031 0C5.405 0 0 5.405 0 12.031c0 2.128.556 4.195 1.611 6.012L.373 24l6.115-1.602a11.96 11.96 0 0 0 5.543 1.353h.005c6.623 0 12.029-5.406 12.029-12.031C24.065 5.405 18.654 0 12.031 0Zm0 21.737h-.003a9.927 9.927 0 0 1-5.06-1.378l-.363-.215-3.766.987.997-3.67-.236-.376a9.92 9.92 0 0 1-1.522-5.321c0-5.485 4.463-9.948 9.954-9.948 5.488 0 9.949 4.463 9.949 9.948 0 5.487-4.461 9.948-9.95 9.948Zm5.46-7.48c-.299-.151-1.771-.875-2.046-.975-.274-.1-.474-.151-.674.151-.2.301-.773.975-.948 1.176-.174.201-.349.225-.648.075-.299-.151-1.264-.466-2.408-1.488-.89-.794-1.492-1.775-1.666-2.076-.174-.301-.019-.464.131-.614.135-.135.299-.35.449-.525.15-.175.2-.301.299-.5.1-.201.05-.375-.025-.525-.075-.151-.674-1.625-.923-2.225-.241-.582-.487-.503-.674-.513-.174-.008-.374-.008-.574-.008a1.1 1.1 0 0 0-.799.375c-.299.301-1.148 1.125-1.148 2.744s1.173 3.181 1.336 3.4c.162.226 2.316 3.535 5.611 4.958 2.65 1.145 3.447 1.05 4.07 1.05.733 0 2.369-.968 2.706-1.905.337-.937.337-1.743.237-1.918-.1-.175-.374-.275-.673-.425Z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#090909] via-[#14030a] to-[#090909] text-white pt-20 pb-6 font-sans overflow-hidden border-t border-[#cd0442]/20">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] rounded-full bg-[#cd0442] opacity-[0.05] blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[50%] rounded-full bg-[#f72e06] opacity-[0.04] blur-[140px]" />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mt-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-6 mb-12">
          
          {/* Column 1: Brand & Description (Wider) */}
          <div className="flex flex-col lg:col-span-4 pr-0 lg:pr-8">
            <Link href="/" className="inline-block mb-4 relative w-max group transition-transform duration-200 hover:scale-105">
              <img 
                src="/do-reports-logo.png" 
                alt="Do Reports" 
                className="h-16 md:h-20 w-auto object-contain max-h-[80px]"
              />
            </Link>
            
            <p className="text-[14px] leading-relaxed text-gray-400 mb-6">
              Do Reports is your trusted source for concise, accurate, and impactful news, delivered quickly & efficiently. We are the leading destination for staying informed about the latest happenings in Maharashtra, India.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider w-full mb-1">Trending Now:</span>
              {['Assembly Elections', 'Mumbai Rains', 'Gold Rates', 'Mhada Lottery'].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300 hover:bg-[#cd0442] hover:text-white hover:border-[#cd0442] transition-colors cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Column 2: Categories */}
          <div className="lg:col-span-2 xl:col-start-5 xl:col-span-2">
            <h3 className="text-white font-bold text-[17px] mb-6 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#f72e06]" /> Categories
            </h3>
            <ul className="flex flex-col gap-4 text-[14px] font-medium text-gray-400">
              {[
                { name: 'कल्याण- डोंबिवली (KDMC)', href: '/category/kalyan-dombivli' },
                { name: 'महत्वाचे', href: '/category/important' },
                { name: 'विशेष', href: '/category/special' },
                { name: 'Welfare', href: '/category/welfare' },
                { name: 'शिक्षण', href: '/category/education' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="group flex items-center gap-2 hover:text-[#f72e06] transition-colors">
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#f72e06]" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-[17px] mb-6 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#cd0442]" /> Quick Links
            </h3>
            <ul className="flex flex-col gap-4 text-[14px] font-medium text-gray-400">
              {[
                { name: 'About Us', href: '#' },
                { name: 'Contact Us', href: '#' },
                { name: 'Disclaimer', href: '/disclaimer' },
                { name: 'Privacy Policy', href: '/privacy-policy' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="group flex items-center gap-2 hover:text-[#cd0442] transition-colors">
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#cd0442]" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Follow Us On (Glassmorphism Card) */}
          <div className="lg:col-span-4">
            <h3 className="text-white font-bold text-[17px] mb-6 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#b10150]" /> Follow Us On
            </h3>
            
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#f72e06] via-[#cd0442] to-[#b10150] rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-[#111116]/90 backdrop-blur-md border border-white/10 rounded-xl p-6 flex flex-col gap-6 shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex flex-col pb-1">
                  <span className="text-[13px] text-gray-300 font-medium leading-relaxed">Get the latest updates directly on your feed.</span>
                </div>

                <div className="flex items-center justify-between gap-2 border-t border-white/5 pt-5">
                  <a href="#" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-lg bg-[#1877F2]/10 border border-[#1877F2]/20 flex items-center justify-center hover:bg-[#1877F2] group/icon transition-all shadow-sm">
                    <FacebookIcon className="w-5 h-5 text-[#1877F2] group-hover/icon:text-white transition-colors" />
                  </a>
                  <a href="https://x.com/doreports26" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-black group/icon transition-all shadow-sm">
                    <XIcon className="w-5 h-5 text-gray-300 group-hover/icon:text-white transition-colors" />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-lg bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center hover:bg-[#25D366] group/icon transition-all shadow-sm">
                    <WhatsappIcon className="w-6 h-6 text-[#25D366] group-hover/icon:text-white transition-colors" />
                  </a>
                  <a href="https://www.instagram.com/doreportsnews?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600 group/icon transition-all shadow-sm">
                    <InstagramIcon className="w-5 h-5 text-pink-500 group-hover/icon:text-white transition-colors" />
                  </a>
                  <a href="https://www.youtube.com/@doreports-i1z" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-lg bg-[#FF0000]/10 border border-[#FF0000]/20 flex items-center justify-center hover:bg-[#FF0000] group/icon transition-all shadow-sm">
                    <YoutubeIcon className="w-5 h-5 text-[#FF0000] group-hover/icon:text-white transition-colors" />
                  </a>
                </div>
              </div>
            </div>
            
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-4 border-t border-white/10 flex items-center justify-center text-[13px] text-gray-400">
          <p>© {new Date().getFullYear()} <span className="font-semibold text-white">Do Reports</span> | All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
