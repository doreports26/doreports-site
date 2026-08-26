"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const navLinks = [
  { name: "Latest News", href: "#", bold: true },
  { name: "कल्याण- डोंबिवली", href: "#" },
  { name: "महत्वाचे", href: "#" },
  { name: "विशेष", href: "#" },
  { name: "Welfare", href: "#" },
  { name: "शिक्षण", href: "#" },
];

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  // Handle Escape key & scrolling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSearchOpen(false);
    };
    if (isSearchOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isSearchOpen]);

  return (
    <>
      <header className="w-full bg-white border-t-[4px] border-t-black border-b border-b-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] sticky top-0 z-50 font-sans">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[56px] px-4">
        {/* Logo container */}
        <div className="flex-shrink-0 flex items-center">
          <Link href="/" className="relative flex items-center h-full mr-8 group">
            {/* Logo Graphic */}
            <div className="relative flex items-center h-8">
              <div className="bg-[#004a99] text-white px-4 py-1 transform -skew-x-[20deg] z-10 flex items-center justify-center shadow-sm">
                <span className="transform skew-x-[20deg] block font-bold text-[17px] tracking-wide mt-[1px]">थोडक्यात</span>
              </div>
              {/* Decorative shapes next to logo */}
              <div className="absolute right-[-6px] top-0 bottom-0 w-3 bg-[#f58220] transform -skew-x-[20deg] z-0" />
              <div className="absolute right-[-12px] top-0 bottom-0 w-3 bg-[#ffc20e] transform -skew-x-[20deg] z-[-1]" />
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 flex-1 justify-center">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`text-[15px] hover:text-[#004a99] transition-colors ${
                link.bold ? "font-bold text-black" : "font-semibold text-gray-800"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Search Icon */}
        <div 
          onClick={() => setIsSearchOpen(true)}
          className="flex-shrink-0 flex items-center justify-end w-12 cursor-pointer text-gray-700 hover:text-[#004a99] transition-colors"
        >
          <Search size={20} strokeWidth={2.5} />
        </div>
      </div>
      </header>

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
              <span className="text-sm font-bold text-[#004a99] uppercase tracking-widest mb-4 flex items-center space-x-2">
                <span className="w-6 h-[2px] bg-[#f58220]"></span>
                <span>Search News</span>
              </span>
              
              <div className="relative mb-16 group">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="What are you looking for?"
                  className="w-full bg-transparent border-b-[3px] border-gray-200 text-4xl md:text-5xl lg:text-6xl text-black placeholder-gray-300 py-4 pr-12 focus:outline-none focus:border-[#004a99] transition-colors font-light"
                />
                <Search 
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-300 group-focus-within:text-[#004a99] transition-colors" 
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
                      className="px-6 py-2.5 rounded-full bg-gray-50 border border-gray-200 text-gray-700 text-sm font-medium hover:bg-[#004a99] hover:text-white hover:border-[#004a99] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 block">Quick Categories</span>
                <div className="grid grid-cols-2 gap-4">
                   {["राजकारण", "खेळ", "मनोरंजन", "शेती"].map((cat, idx) => (
                     <div key={idx} className="cursor-pointer group flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#f58220] hover:bg-orange-50/30 transition-colors">
                       <span className="font-semibold text-gray-800 group-hover:text-[#f58220] transition-colors">{cat}</span>
                       <span className="text-gray-300 group-hover:text-[#f58220] transition-colors">→</span>
                     </div>
                   ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Panel - Featured Content (Hidden on mobile) */}
          <div className="hidden lg:flex w-[40%] bg-[#004a99] relative flex-col justify-center p-16 overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/40 to-transparent"></div>
            
            <div className="relative z-10 text-white max-w-md">
              <div className="flex items-center space-x-3 mb-8">
                <div className="relative flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 relative z-10"></div>
                  <div className="absolute w-5 h-5 rounded-full bg-red-500/40 animate-ping"></div>
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-red-200">Live Coverage</span>
              </div>
              
              <h2 className="text-4xl font-bold leading-tight mb-6">
                कल्याण-डोंबिवलीत मुसळधार पाऊस, जनजीवन विस्कळीत
              </h2>
              <p className="text-blue-100 text-lg mb-10 leading-relaxed opacity-90 line-clamp-4">
                हवामान खात्याने दिलेल्या इशाऱ्यानुसार आज सकाळपासूनच कल्याण आणि डोंबिवली परिसरात जोरदार पावसाला सुरुवात झाली आहे. अनेक सखल भागात पाणी साचण्यास सुरुवात झाली असून वाहतुकीवर मोठा परिणाम झाला आहे...
              </p>
              
              <Link href="#" className="inline-flex items-center space-x-3 text-sm font-bold uppercase tracking-widest bg-white text-[#004a99] px-8 py-4 rounded-sm hover:bg-[#f58220] hover:text-white transition-colors duration-300">
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
