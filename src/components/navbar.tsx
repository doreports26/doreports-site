"use client";

import Link from "next/link";
import { Search, X, Menu } from "lucide-react";
import { FiFacebook as Facebook, FiTwitter as Twitter, FiInstagram as Instagram, FiYoutube as Youtube } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";

const navLinks = [
  { name: "Latest News", href: "/category/latest-news", bold: true },
  { name: "कल्याण- डोंबिवली (KDMC)", href: "/category/kalyan-dombivli" },
  { name: "महत्वाचे", href: "/category/important" },
  { name: "विशेष", href: "/category/special" },
  { name: "Welfare", href: "/category/welfare" },
  { name: "शिक्षण", href: "/category/education" },
];


export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  // Handle Escape key & scrolling for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSearchOpen(false);
    };
    if (isSearchOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else if (!isMobileMenuOpen) {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearchOpen, isMobileMenuOpen]);

  // Handle Mobile Drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };
    
    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
      window.addEventListener("resize", handleResize);
      document.body.style.overflow = "hidden";
    } else if (!isSearchOpen) {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileMenuOpen, isSearchOpen]);

  return (
    <>
      <header className="w-full bg-white border-t-[4px] border-t-[#cd0442] border-b border-b-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] sticky top-0 z-50 font-sans">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[60px] md:h-[68px] px-4">
        {/* Logo container */}
        <div className="flex-shrink-0 flex items-center h-full">
          <Link href="/" className="relative flex items-center h-full mr-6 group py-1 transition-transform duration-200 hover:scale-105">
            <img 
              src="/do-reports-logo.png" 
              alt="Do Reports" 
              className="h-12 md:h-14 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 flex-1 justify-center">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`text-[15px] hover:text-[#cd0442] transition-colors flex items-center ${
                link.bold ? "font-bold text-[#090909]" : "font-semibold text-gray-800"
              }`}
            >
              {link.name === "Latest News" && (
                <div className="relative flex items-center justify-center mr-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#f72e06] relative z-10"></div>
                  <div className="absolute w-4 h-4 rounded-full bg-[#f72e06]/40 animate-ping"></div>
                </div>
              )}
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Icons & Desktop Search */}
        <div className="flex items-center gap-5 lg:gap-0">
          <div 
            onClick={() => setIsSearchOpen(true)}
            className="flex-shrink-0 flex items-center justify-end w-auto lg:w-12 cursor-pointer text-gray-700 hover:text-[#cd0442] transition-colors"
          >
            <Search size={20} strokeWidth={2.5} />
          </div>
          <div 
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex lg:hidden flex-shrink-0 items-center justify-center cursor-pointer text-gray-700 hover:text-[#cd0442] transition-colors"
          >
            <Menu size={24} strokeWidth={2} />
          </div>
        </div>
      </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden flex">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px] animate-in fade-in duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Drawer */}
          <div className="w-[85%] max-w-[320px] h-full bg-white relative z-10 flex flex-col shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              {/* Logo in Drawer */}
              <div className="flex items-center ml-2">
                <img 
                  src="/do-reports-logo.png" 
                  alt="Do Reports" 
                  className="h-10 w-auto object-contain"
                />
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 transition-colors rounded-full">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto flex flex-col py-2">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-[17px] py-4 px-5 border-b border-gray-100 hover:text-[#cd0442] transition-colors flex items-center ${
                    link.bold ? "font-bold text-[#090909]" : "font-semibold text-gray-800"
                  }`}
                >
                  {link.name === "Latest News" && (
                    <div className="relative flex items-center justify-center mr-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#f72e06] relative z-10"></div>
                      <div className="absolute w-5 h-5 rounded-full bg-[#f72e06]/30 animate-ping"></div>
                    </div>
                  )}
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-center gap-8">
              <Link href="#" className="text-gray-500 hover:text-[#cd0442] transition-colors"><Facebook size={22} /></Link>
              <Link href="#" className="text-gray-500 hover:text-[#1DA1F2] transition-colors"><Twitter size={22} /></Link>
              <Link href="#" className="text-gray-500 hover:text-[#E1306C] transition-colors"><Instagram size={22} /></Link>
              <Link href="#" className="text-gray-500 hover:text-[#FF0000] transition-colors"><Youtube size={22} /></Link>
            </div>
          </div>
        </div>
      )}

      {/* Full-Screen "News Desk" Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] flex animate-in fade-in zoom-in-95 duration-300">
          
          {/* Left Panel - Search Interface */}
          <div className="w-full lg:w-[60%] bg-white h-full relative p-8 md:p-16 xl:p-24 flex flex-col shadow-2xl z-10 overflow-y-auto">
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-6 right-6 lg:top-8 lg:right-8 p-3 text-gray-400 hover:text-black transition-all rounded-full hover:bg-gray-100 group"
            >
              <X size={32} strokeWidth={1.5} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <div className="flex-1 flex flex-col justify-center w-full max-w-2xl mx-auto mt-12 lg:mt-0">
              <span className="text-sm font-bold text-[#cd0442] uppercase tracking-widest mb-4 flex items-center space-x-2">
                <span className="w-6 h-[2px] bg-[#f72e06]"></span>
                <span>Search News</span>
              </span>
              
              <div className="relative mb-16 group">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="What are you looking for?"
                  className="w-full bg-transparent border-b-[3px] border-gray-200 text-4xl md:text-5xl lg:text-6xl text-[#090909] placeholder-gray-300 py-4 pr-12 focus:outline-none focus:border-[#cd0442] transition-colors font-light"
                />
                <Search 
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-300 group-focus-within:text-[#cd0442] transition-colors" 
                  size={40} 
                  strokeWidth={2}
                />
              </div>

              <div className="mb-12">
                <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 block">Trending Now</span>
                <div className="flex flex-wrap gap-3">
                  {["महाराष्ट्र विधानसभा", "कल्याण विकास", "शैक्षणिक धोरण", "Local Trains", "हवामान अंदाज"].map((tag, i) => (
                    <button 
                      key={i}
                      className="px-6 py-2.5 rounded-full bg-gray-50 border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gradient-to-r hover:from-[#f72e06] hover:to-[#cd0442] hover:text-white hover:border-[#cd0442] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 block">Quick Categories</span>
                  <div className="grid grid-cols-2 gap-4">
                     {[
                       { name: "कल्याण- डोंबिवली (KDMC)", href: "/category/kalyan-dombivli" },
                       { name: "महत्वाचे", href: "/category/important" },
                       { name: "विशेष", href: "/category/special" },
                       { name: "Welfare", href: "/category/welfare" },
                       { name: "शिक्षण", href: "/category/education" },
                     ].map((cat, idx) => (
                       <Link key={idx} href={cat.href} onClick={() => setIsSearchOpen(false)} className="cursor-pointer group flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#cd0442] hover:bg-[#cd0442]/5 transition-colors">
                         <span className="font-semibold text-gray-800 group-hover:text-[#cd0442] transition-colors">{cat.name}</span>
                         <span className="text-gray-300 group-hover:text-[#cd0442] transition-colors">→</span>
                       </Link>
                     ))}
                  </div>
                </div>

                <div>
                  <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 block">Follow Us On</span>
                  <div className="h-[calc(100%-2rem)] flex flex-col justify-center p-6 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                    <p className="text-gray-800 font-semibold mb-6">Get the latest updates directly on your feed.</p>
                    <div className="flex items-center space-x-4">
                      <Link href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#cd0442] hover:border-[#cd0442] hover:shadow-md transition-all duration-300">
                        <Facebook size={18} />
                      </Link>
                      <Link href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#1DA1F2] hover:border-[#1DA1F2] hover:shadow-md transition-all duration-300">
                        <Twitter size={18} />
                      </Link>
                      <Link href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#E1306C] hover:border-[#E1306C] hover:shadow-md transition-all duration-300">
                        <Instagram size={18} />
                      </Link>
                      <Link href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#FF0000] hover:border-[#FF0000] hover:shadow-md transition-all duration-300">
                        <Youtube size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Panel - Featured Content (Hidden on mobile) */}
          <div className="hidden lg:flex w-[40%] bg-gradient-to-br from-[#090909] via-[#b10150] to-[#cd0442] relative flex-col justify-center p-16 overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f72e06] opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>
            
            <div className="relative z-10 text-white max-w-md">
              <div className="flex items-center space-x-3 mb-8">
                <div className="relative flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#f72e06] relative z-10"></div>
                  <div className="absolute w-5 h-5 rounded-full bg-[#f72e06]/60 animate-ping"></div>
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-red-200">Live Coverage</span>
              </div>
              
              <h2 className="text-4xl font-bold leading-tight mb-6">
                कल्याण-डोंबिवलीत मुसळधार पाऊस, जनजीवन विस्कळीत
              </h2>
              <p className="text-white/85 text-lg mb-10 leading-relaxed line-clamp-4">
                हवामान खात्याने दिलेल्या इशाऱ्यानुसार आज सकाळपासूनच कल्याण आणि डोंबिवली परिसरात जोरदार पावसाला सुरुवात झाली आहे. अनेक सखल भागात पाणी साचण्यास सुरुवात झाली असून वाहतुकीवर मोठा परिणाम झाला आहे...
              </p>
              
              <Link href="#" className="inline-flex items-center space-x-3 text-sm font-bold uppercase tracking-widest bg-white text-[#090909] px-8 py-4 rounded-sm hover:bg-[#f72e06] hover:text-white transition-colors duration-300 shadow-xl">
                <span>Read Full Story</span>
                <span className="text-xl leading-none">→</span>
              </Link>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
