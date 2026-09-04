"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { trackShare } from "@/lib/gtag";

interface ArticleShareProps {
  title: string;
  slug: string;
  variant?: "top-compact" | "bottom-bar";
}

export function ArticleShareButtons({ title, slug, variant = "top-compact" }: ArticleShareProps) {
  const [copied, setCopied] = useState(false);
  const baseSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://doreports.in";
  const shareUrl = `${baseSiteUrl}/article/${slug}`;

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%0A%0A${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=doreports26`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
  };

  const handleShareClick = (platform: "whatsapp" | "facebook" | "twitter" | "telegram") => {
    trackShare({
      method: platform,
      content_type: "article",
      item_id: slug,
      item_name: title,
    });
  };

  const handleNativeShareOrCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    const currentUrl = typeof window !== "undefined" ? window.location.href : shareUrl;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text: title,
          url: currentUrl,
        });
        trackShare({
          method: "native_share",
          content_type: "article",
          item_id: slug,
          item_name: title,
        });
        return;
      } catch (err: unknown) {
        // If user cancelled share sheet, do nothing
        if (err instanceof Error && err.name === "AbortError") return;
      }
    }

    // Fallback: Copy to clipboard
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = shareUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      trackShare({
        method: "copy_link",
        content_type: "article",
        item_id: slug,
        item_name: title,
      });
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  if (variant === "top-compact") {
    return (
      <div className="flex items-center gap-2 relative">
        {/* Facebook */}
        <a
          href={shareLinks.facebook}
          onClick={() => handleShareClick("facebook")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
          className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 active:scale-95 transition-all shadow-sm"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.04c-5.5 0-10 4.48-10 10 0 5 3.66 9.15 8.44 9.9v-7h-2.54V12h2.54V9.8c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.9h-2.33v7C18.34 21.15 22 17.04 22 12.04c0-5.52-4.48-10-10-10z" />
          </svg>
        </a>

        {/* X / Twitter */}
        <a
          href={shareLinks.twitter}
          onClick={() => handleShareClick("twitter")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X (Twitter)"
          className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center hover:opacity-90 active:scale-95 transition-all shadow-sm"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>

        {/* WhatsApp */}
        <a
          href={shareLinks.whatsapp}
          onClick={() => handleShareClick("whatsapp")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on WhatsApp"
          className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 active:scale-95 transition-all shadow-sm"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.002 22a9.96 9.96 0 0 1-5.084-1.39l-.364-.216-3.774.99 1.01-3.68-.237-.378A9.966 9.966 0 0 1 2.005 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm0-18.156A8.167 8.167 0 0 0 3.847 12c0 1.343.344 2.656.996 3.816l.161.288-.593 2.16 2.213-.58.277.15A8.164 8.164 0 0 0 12.002 20.156a8.167 8.167 0 0 0 0-16.312z" />
          </svg>
        </a>

        {/* Native Share / Copy */}
        <button
          type="button"
          onClick={handleNativeShareOrCopy}
          aria-label="Share or Copy Link"
          className={`w-9 h-9 rounded-full ${
            copied ? "bg-[#cd0442] text-white" : "bg-[#090909] text-white hover:bg-[#cd0442]"
          } flex items-center justify-center active:scale-95 transition-all shadow-sm`}
          title={copied ? "Link Copied!" : "Share article"}
        >
          {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
        </button>

        {/* Copy Feedback Toast/Badge */}
        {copied && (
          <div className="absolute right-0 -bottom-8 bg-[#090909] text-white text-[11px] font-semibold px-2.5 py-1 rounded shadow-lg animate-in fade-in slide-in-from-top-1 whitespace-nowrap z-30">
            लिंक कॉपी केली! (Link Copied)
          </div>
        )}
      </div>
    );
  }

  // variant === "bottom-bar"
  return (
    <div className="w-full mb-10 relative">
      <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
        <Share2 className="w-3.5 h-3.5 text-[#cd0442]" />
        <span>Share This Article (बातमी शेअर करा):</span>
      </div>

      <div className="flex flex-wrap sm:flex-nowrap w-full gap-2">
        {/* Facebook */}
        <a
          href={shareLinks.facebook}
          onClick={() => handleShareClick("facebook")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
          className="flex-1 min-w-[50px] h-[42px] bg-[#1877F2] text-white flex items-center justify-center gap-2 hover:opacity-90 active:scale-98 transition-all rounded-[3px] shadow-sm text-sm font-semibold"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.04c-5.5 0-10 4.48-10 10 0 5 3.66 9.15 8.44 9.9v-7h-2.54V12h2.54V9.8c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.9h-2.33v7C18.34 21.15 22 17.04 22 12.04c0-5.52-4.48-10-10-10z" />
          </svg>
          <span className="hidden sm:inline">Facebook</span>
        </a>

        {/* X / Twitter */}
        <a
          href={shareLinks.twitter}
          onClick={() => handleShareClick("twitter")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X (Twitter)"
          className="flex-1 min-w-[50px] h-[42px] bg-black text-white flex items-center justify-center gap-2 hover:opacity-90 active:scale-98 transition-all rounded-[3px] shadow-sm text-sm font-semibold"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="hidden sm:inline">X (Twitter)</span>
        </a>

        {/* WhatsApp */}
        <a
          href={shareLinks.whatsapp}
          onClick={() => handleShareClick("whatsapp")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on WhatsApp"
          className="flex-1 min-w-[50px] h-[42px] bg-[#25D366] text-white flex items-center justify-center gap-2 hover:opacity-90 active:scale-98 transition-all rounded-[3px] shadow-sm text-sm font-semibold"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.002 22a9.96 9.96 0 0 1-5.084-1.39l-.364-.216-3.774.99 1.01-3.68-.237-.378A9.966 9.966 0 0 1 2.005 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm0-18.156A8.167 8.167 0 0 0 3.847 12c0 1.343.344 2.656.996 3.816l.161.288-.593 2.16 2.213-.58.277.15A8.164 8.164 0 0 0 12.002 20.156a8.167 8.167 0 0 0 0-16.312z" />
          </svg>
          <span className="hidden sm:inline">WhatsApp</span>
        </a>

        {/* Telegram */}
        <a
          href={shareLinks.telegram}
          onClick={() => handleShareClick("telegram")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Telegram"
          className="flex-1 min-w-[50px] h-[42px] bg-[#0088cc] text-white flex items-center justify-center gap-2 hover:opacity-90 active:scale-98 transition-all rounded-[3px] shadow-sm text-sm font-semibold"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.5 1.201-.82 1.23-.696.065-1.225-.46-1.896-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.892-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
          </svg>
          <span className="hidden sm:inline">Telegram</span>
        </a>

        {/* Native Share / Copy */}
        <button
          type="button"
          onClick={handleNativeShareOrCopy}
          aria-label="Share or Copy Link"
          className={`flex-1 min-w-[50px] h-[42px] ${
            copied ? "bg-[#cd0442]" : "bg-[#090909] hover:bg-[#cd0442]"
          } text-white flex items-center justify-center gap-2 active:scale-98 transition-all rounded-[3px] shadow-sm text-sm font-semibold`}
        >
          {copied ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
          <span className="hidden sm:inline">{copied ? "Copied!" : "Share / Copy"}</span>
        </button>
      </div>

      {copied && (
        <div className="absolute right-0 -bottom-7 bg-[#090909] text-white text-[11px] font-semibold px-3 py-1 rounded shadow-lg animate-in fade-in slide-in-from-top-1 whitespace-nowrap z-20">
          लिंक क्लिपबोर्डवर कॉपी केली! (Link copied to clipboard)
        </div>
      )}
    </div>
  );
}
