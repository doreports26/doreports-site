"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, Menu, ArrowRight } from "lucide-react";
import {
  FiFacebook as Facebook,
  FiTwitter as Twitter,
  FiInstagram as Instagram,
  FiYoutube as Youtube,
} from "react-icons/fi";
import { useState, useEffect, useRef } from "react";

const navLinks = [
  { name: "Latest News", href: "/category/latest-news", bold: true },
  { name: "कल्याण- डोंबिवली (KDMC)", href: "/category/kalyan-dombivli" },
  { name: "महत्वाचे", href: "/category/important" },
  { name: "विशेष", href: "/category/special" },
  { name: "Welfare", href: "/category/welfare" },
  { name: "शिक्षण", href: "/category/education" },
];

const trendingTags = [
  "महाराष्ट्र विधानसभा",
  "कल्याण विकास",
  "शैक्षणिक धोरण",
  "Local Trains",
  "हवामान अंदाज",
  "म्हाडा लॉटरी",
];

const quickCategories = [
  { name: "कल्याण- डोंबिवली (KDMC)", href: "/category/kalyan-dombivli" },
  { name: "महत्वाचे", href: "/category/important" },
  { name: "विशेष", href: "/category/special" },
  { name: "Welfare", href: "/category/welfare" },
  { name: "शिक्षण", href: "/category/education" },
  { name: "Latest News", href: "/category/latest-news" },
];

export function Navbar() {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [drawerSearchQuery, setDrawerSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input when modal opens
  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  // Lock body scroll when search or mobile drawer is open
  useEffect(() => {
    if (isSearchOpen || isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "unset";
    };
  }, [isSearchOpen, isMobileMenuOpen]);

  // Perform search navigation
  const handlePerformSearch = (queryToSearch: string) => {
    const trimmed = queryToSearch.trim();
    if (!trimmed) return;
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
    setSearchQuery("");
    setDrawerSearchQuery("");
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const handleModalSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handlePerformSearch(searchQuery);
  };

  const handleDrawerSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handlePerformSearch(drawerSearchQuery);
  };

  return (
    <>
      <header className="w-full bg-white border-t-[4px] border-t-[#cd0442] border-b border-b-gray-200 shadow-[0_2px_4px_rgba(0,0,0,0.02)] sticky top-0 z-50 font-sans">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[60px] md:h-[68px] px-4">
          {/* Logo container */}
          <div className="flex-shrink-0 flex items-center h-full">
            <Link
              href="/"
              className="relative flex items-center h-full mr-4 sm:mr-6 group py-1 transition-transform duration-200 hover:scale-105"
            >
              <img
                src="/do-reports-logo.png"
                alt="Do Reports"
                className="h-10 sm:h-12 md:h-14 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
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

          {/* Action Icons (Search & Mobile Menu) */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Trigger Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search articles"
              className="flex items-center justify-center w-10 h-10 rounded-full text-gray-700 hover:text-[#cd0442] hover:bg-gray-100 active:scale-95 transition-all"
            >
              <Search size={22} strokeWidth={2.2} />
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile menu"
              className="flex lg:hidden items-center justify-center w-10 h-10 rounded-full text-gray-700 hover:text-[#cd0442] hover:bg-gray-100 active:scale-95 transition-all"
            >
              <Menu size={24} strokeWidth={2.2} />
            </button>
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

          {/* Drawer Panel */}
          <div className="w-[85%] max-w-[340px] h-full bg-white relative z-10 flex flex-col shadow-2xl animate-in slide-in-from-left duration-300">
            {/* Drawer Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center ml-2">
                <img
                  src="/do-reports-logo.png"
                  alt="Do Reports"
                  className="h-9 w-auto object-contain"
                />
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
                className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 transition-colors rounded-full"
              >
                <X size={22} />
              </button>
            </div>

            {/* Drawer Quick Search */}
            <div className="p-4 border-b border-gray-100 bg-gray-50/70">
              <form onSubmit={handleDrawerSearchSubmit} className="relative flex items-center">
                <input
                  type="text"
                  value={drawerSearchQuery}
                  onChange={(e) => setDrawerSearchQuery(e.target.value)}
                  placeholder="बातमी शोधा (Search)..."
                  className="w-full bg-white border border-gray-200 text-sm rounded-lg pl-3 pr-10 py-2.5 focus:outline-none focus:border-[#cd0442] focus:ring-1 focus:ring-[#cd0442] text-gray-900"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute right-1 text-gray-400 hover:text-[#cd0442] p-1.5 transition-colors"
                >
                  <Search size={18} />
                </button>
              </form>
            </div>

            {/* Drawer Navigation Links */}
            <div className="flex-1 overflow-y-auto flex flex-col py-2">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-[16px] py-3.5 px-5 border-b border-gray-50 hover:bg-gray-50 hover:text-[#cd0442] transition-colors flex items-center justify-between ${
                    link.bold ? "font-bold text-[#090909]" : "font-semibold text-gray-800"
                  }`}
                >
                  <div className="flex items-center">
                    {link.name === "Latest News" && (
                      <div className="relative flex items-center justify-center mr-2.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#f72e06] relative z-10"></div>
                        <div className="absolute w-5 h-5 rounded-full bg-[#f72e06]/30 animate-ping"></div>
                      </div>
                    )}
                    <span>{link.name}</span>
                  </div>
                  <ArrowRight size={14} className="text-gray-300" />
                </Link>
              ))}
            </div>

            {/* Drawer Footer Socials */}
            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-center gap-6">
              <Link href="#" className="text-gray-500 hover:text-[#cd0442] transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-[#1DA1F2] transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-[#E1306C] transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-[#FF0000] transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Full-Screen Responsive Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] flex animate-in fade-in duration-200">
          {/* Mobile/Desktop Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setIsSearchOpen(false)}
          />

          {/* Left Panel - Search Interface */}
          <div className="w-full lg:w-[60%] bg-white h-full relative p-5 sm:p-8 md:p-14 xl:p-20 flex flex-col shadow-2xl z-10 overflow-y-auto">
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              aria-label="Close search"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 p-2.5 sm:p-3 text-gray-400 hover:text-black transition-all rounded-full hover:bg-gray-100 active:scale-95 group z-20"
            >
              <X size={26} strokeWidth={2} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <div className="flex-1 flex flex-col justify-start lg:justify-center w-full max-w-2xl mx-auto pt-8 sm:pt-12 lg:pt-0">
              {/* Badge */}
              <div className="text-xs sm:text-sm font-bold text-[#cd0442] uppercase tracking-widest mb-3 sm:mb-4 flex items-center space-x-2">
                <span className="w-5 sm:w-6 h-[2px] bg-[#f72e06]"></span>
                <span>Search News / बातमी शोधा</span>
              </div>

              {/* Main Search Input Form */}
              <form onSubmit={handleModalSearchSubmit} className="relative mb-8 sm:mb-12 group">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="बातमी किंवा विषय टाइप करा..."
                  className="w-full bg-transparent border-b-2 sm:border-b-[3px] border-gray-300 text-2xl sm:text-4xl md:text-5xl text-[#090909] placeholder-gray-300 py-3 sm:py-4 pr-20 focus:outline-none focus:border-[#cd0442] transition-colors font-normal"
                />

                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label="Clear input"
                    >
                      <X size={18} />
                    </button>
                  )}
                  <button
                    type="submit"
                    aria-label="Submit search"
                    className="p-2 sm:p-3 bg-[#cd0442] text-white rounded-full hover:bg-[#b10150] active:scale-95 transition-all shadow-md"
                  >
                    <Search size={20} strokeWidth={2.5} />
                  </button>
                </div>
              </form>

              {/* Trending Tags */}
              <div className="mb-8 sm:mb-12">
                <span className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 sm:mb-4 block">
                  Trending Now (ट्रेंडिंग विषय)
                </span>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {trendingTags.map((tag, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handlePerformSearch(tag)}
                      className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gray-50 border border-gray-200 text-gray-700 text-xs sm:text-sm font-medium hover:bg-gradient-to-r hover:from-[#f72e06] hover:to-[#cd0442] hover:text-white hover:border-[#cd0442] hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Categories & Socials */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 pb-8">
                <div>
                  <span className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 sm:mb-4 block">
                    Quick Categories (श्रेणी)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {quickCategories.map((cat, idx) => (
                      <Link
                        key={idx}
                        href={cat.href}
                        onClick={() => setIsSearchOpen(false)}
                        className="cursor-pointer group flex items-center justify-between p-3 sm:p-3.5 rounded-xl border border-gray-100 hover:border-[#cd0442] hover:bg-[#cd0442]/5 transition-colors"
                      >
                        <span className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-[#cd0442] transition-colors truncate">
                          {cat.name}
                        </span>
                        <span className="text-gray-300 group-hover:text-[#cd0442] transition-colors ml-2">→</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 sm:mb-4 block">
                    Follow Us On (सोशल मीडिया)
                  </span>
                  <div className="flex flex-col justify-center p-5 rounded-xl border border-gray-100 bg-gray-50/60">
                    <p className="text-gray-800 text-xs sm:text-sm font-medium mb-4">
                      Get the latest updates directly on your feed.
                    </p>
                    <div className="flex items-center space-x-3">
                      <Link
                        href="#"
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#cd0442] hover:border-[#cd0442] hover:shadow-md transition-all duration-200"
                        aria-label="Facebook"
                      >
                        <Facebook size={18} />
                      </Link>
                      <Link
                        href="#"
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#1DA1F2] hover:border-[#1DA1F2] hover:shadow-md transition-all duration-200"
                        aria-label="Twitter"
                      >
                        <Twitter size={18} />
                      </Link>
                      <Link
                        href="#"
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#E1306C] hover:border-[#E1306C] hover:shadow-md transition-all duration-200"
                        aria-label="Instagram"
                      >
                        <Instagram size={18} />
                      </Link>
                      <Link
                        href="#"
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#FF0000] hover:border-[#FF0000] hover:shadow-md transition-all duration-200"
                        aria-label="YouTube"
                      >
                        <Youtube size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Featured Content (Hidden on Mobile/Tablet, visible on lg screens) */}
          <div className="hidden lg:flex w-[40%] bg-gradient-to-br from-[#090909] via-[#b10150] to-[#cd0442] relative flex-col justify-center p-16 overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f72e06] opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>

            <div className="relative z-10 text-white max-w-md">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#f72e06] relative z-10"></div>
                  <div className="absolute w-5 h-5 rounded-full bg-[#f72e06]/60 animate-ping"></div>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-red-200">Live Coverage</span>
              </div>

              <h2 className="text-3xl xl:text-4xl font-bold leading-tight mb-4">
                Do Reports — आवाज महाराष्ट्राचा
              </h2>
              <p className="text-white/85 text-sm xl:text-base mb-8 leading-relaxed line-clamp-4">
                कल्याण-डोंबिवली, ठाणे आणि संपूर्ण महाराष्ट्रातील ताज्या, निष्पक्ष आणि विश्वासार्ह बातम्यांचे एकमेव व्यासपीठ. सत्य आणि पारदर्शक पत्रकारिता.
              </p>

              <Link
                href="/category/latest-news"
                onClick={() => setIsSearchOpen(false)}
                className="inline-flex items-center space-x-3 text-xs font-bold uppercase tracking-widest bg-white text-[#090909] px-6 py-3.5 rounded-sm hover:bg-[#f72e06] hover:text-white transition-colors duration-300 shadow-xl"
              >
                <span>सर्व ताज्या बातम्या पहा</span>
                <span className="text-lg leading-none">→</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
