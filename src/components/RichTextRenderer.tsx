import React from "react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/image";

interface RichTextRendererProps {
  content?: any;
  rawContent?: string;
  snippet?: string;
  className?: string;
}

/**
 * Portable Text components — maps Sanity's block content to styled HTML.
 * Preserves the exact same visual styling as the old Lexical renderer.
 */
const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[#333333] text-[17px] md:text-[18px] leading-[1.8] md:leading-[1.85] mb-6 font-normal">
        {children}
      </p>
    ),
    h1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-10 mb-4 tracking-tight leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4 tracking-tight leading-snug">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-6 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg md:text-xl font-bold text-gray-900 mt-5 mb-2">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#cd0442] pl-5 pr-4 py-3.5 my-7 italic text-gray-700 bg-gray-50/80 rounded-r-lg font-serif text-lg leading-relaxed shadow-sm">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 text-[#333333] text-[17px] leading-relaxed marker:text-[#cd0442]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2 text-[#333333] text-[17px] leading-relaxed">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => (
      <u className="underline decoration-[#cd0442]/50 decoration-2 underline-offset-2">
        {children}
      </u>
    ),
    "strike-through": ({ children }) => (
      <s className="line-through text-gray-400">{children}</s>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm text-[#cd0442] font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href = value?.href || "#";
      const blank = value?.blank;
      return (
        <Link
          href={href}
          target={blank ? "_blank" : undefined}
          rel={blank ? "noopener noreferrer" : undefined}
          className="text-[#cd0442] font-semibold underline decoration-[#cd0442]/40 hover:text-[#f72e06] hover:decoration-[#f72e06] transition-colors"
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const imageUrl = urlFor(value).width(1200).url();
      const alt = value.alt || "Article image";
      const caption = value.caption;

      return (
        <figure className="my-8 overflow-hidden rounded-xl bg-gray-50 border border-gray-100 shadow-sm">
          <img src={imageUrl} alt={alt} className="w-full h-auto object-cover max-h-[550px]" />
          {caption && (
            <figcaption className="text-center text-xs text-gray-500 py-2.5 px-4 bg-gray-50 border-t border-gray-100 italic">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export function RichTextRenderer({ content, rawContent, snippet, className = "" }: RichTextRendererProps) {
  // 1. If Portable Text (Sanity's array of blocks) is provided
  if (content && Array.isArray(content) && content.length > 0) {
    return (
      <div className={`prose-marathi max-w-none ${className}`}>
        <PortableText value={content} components={portableTextComponents} />
      </div>
    );
  }

  // 2. If Plain Text / Multiline String is provided (rawContent or string content)
  const plainText = typeof rawContent === "string" && rawContent.trim()
    ? rawContent
    : typeof content === "string" && content.trim()
    ? content
    : "";

  if (plainText) {
    const paragraphs = plainText
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    return (
      <div className={`space-y-6 ${className}`}>
        {paragraphs.map((para, idx) => (
          <p key={idx} className="text-[#333333] text-[17px] md:text-[18px] leading-[1.8] md:leading-[1.85] font-normal">
            {para}
          </p>
        ))}
      </div>
    );
  }

  // 3. Fallback: Render snippet if available, or polite Marathi default message
  return (
    <div className={`space-y-6 ${className}`}>
      {snippet ? (
        <p className="text-[#333333] text-[17px] md:text-[18px] leading-[1.8] md:leading-[1.85] font-normal">
          {snippet}
        </p>
      ) : (
        <p className="text-[#333333] text-[17px] md:text-[18px] leading-[1.8] md:leading-[1.85] font-normal">
          ही बातमीची सविस्तर माहिती आहे. या संदर्भातील अधिकृत माहिती लवकरच अद्ययावत केली जाईल.
        </p>
      )}
    </div>
  );
}
