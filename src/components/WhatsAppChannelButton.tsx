"use client";

import { trackWhatsAppChannelClick } from "@/lib/gtag";

interface WhatsAppChannelButtonProps {
  source?: string;
  className?: string;
  children?: React.ReactNode;
}

export function WhatsAppChannelButton({
  source = "article_banner",
  className,
  children = "Join Channel",
}: WhatsAppChannelButtonProps) {
  return (
    <a
      href="https://whatsapp.com/channel/0029Va9W8X69hXFBzBvM2O3k"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppChannelClick(source)}
      className={
        className ||
        "inline-flex items-center justify-center bg-[#22c55e] text-white px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-[#16a34a] active:scale-95 transition-all w-full sm:w-auto shadow-sm"
      }
    >
      {children}
    </a>
  );
}
