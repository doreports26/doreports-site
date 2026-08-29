import React from "react";
import Link from "next/link";

interface RichTextRendererProps {
  content?: any;
  rawContent?: string;
  snippet?: string;
  className?: string;
}

// Bitmask flags for Lexical text format
const IS_BOLD = 1;
const IS_ITALIC = 1 << 1;
const IS_STRIKETHROUGH = 1 << 2;
const IS_UNDERLINE = 1 << 3;
const IS_CODE = 1 << 4;
const IS_SUBSCRIPT = 1 << 5;
const IS_SUPERSCRIPT = 1 << 6;

function renderTextNode(node: any, key: string | number): React.ReactNode {
  if (!node || typeof node.text !== "string") return null;

  let formatted: React.ReactNode = node.text;

  const format = node.format || 0;

  if (format & IS_CODE) {
    formatted = <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm text-[#cd0442] font-mono">{formatted}</code>;
  }
  if (format & IS_BOLD) {
    formatted = <strong className="font-bold text-gray-900">{formatted}</strong>;
  }
  if (format & IS_ITALIC) {
    formatted = <em className="italic">{formatted}</em>;
  }
  if (format & IS_UNDERLINE) {
    formatted = <u className="underline decoration-[#cd0442]/50 decoration-2 underline-offset-2">{formatted}</u>;
  }
  if (format & IS_STRIKETHROUGH) {
    formatted = <s className="line-through text-gray-400">{formatted}</s>;
  }
  if (format & IS_SUBSCRIPT) {
    formatted = <sub>{formatted}</sub>;
  }
  if (format & IS_SUPERSCRIPT) {
    formatted = <sup>{formatted}</sup>;
  }

  return <React.Fragment key={key}>{formatted}</React.Fragment>;
}

function renderLexicalNode(node: any, index: number): React.ReactNode {
  if (!node) return null;

  // Text node
  if (node.type === "text") {
    return renderTextNode(node, index);
  }

  // Linebreak
  if (node.type === "linebreak") {
    return <br key={index} />;
  }

  // Recursive render children
  const children = Array.isArray(node.children)
    ? node.children.map((child: any, i: number) => renderLexicalNode(child, i))
    : null;

  switch (node.type) {
    case "paragraph":
      return (
        <p key={index} className="text-[#333333] text-[17px] md:text-[18px] leading-[1.8] md:leading-[1.85] mb-6 font-normal">
          {children && children.length > 0 ? children : <br />}
        </p>
      );

    case "heading": {
      const headingClasses: Record<string, string> = {
        h1: "text-3xl md:text-4xl font-extrabold text-gray-900 mt-10 mb-4 tracking-tight leading-tight",
        h2: "text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4 tracking-tight leading-snug",
        h3: "text-xl md:text-2xl font-bold text-gray-900 mt-6 mb-3",
        h4: "text-lg md:text-xl font-bold text-gray-900 mt-5 mb-2",
        h5: "text-base md:text-lg font-bold text-gray-900 mt-4 mb-2",
        h6: "text-sm md:text-base font-bold text-gray-900 mt-3 mb-2 uppercase tracking-wide",
      };
      const validTag = (node.tag || "h2").toLowerCase();
      const cls = headingClasses[validTag] || headingClasses.h2;

      switch (validTag) {
        case "h1":
          return <h1 key={index} className={cls}>{children}</h1>;
        case "h3":
          return <h3 key={index} className={cls}>{children}</h3>;
        case "h4":
          return <h4 key={index} className={cls}>{children}</h4>;
        case "h5":
          return <h5 key={index} className={cls}>{children}</h5>;
        case "h6":
          return <h6 key={index} className={cls}>{children}</h6>;
        case "h2":
        default:
          return <h2 key={index} className={cls}>{children}</h2>;
      }
    }

    case "quote":
      return (
        <blockquote
          key={index}
          className="border-l-4 border-[#cd0442] pl-5 pr-4 py-3.5 my-7 italic text-gray-700 bg-gray-50/80 rounded-r-lg font-serif text-lg leading-relaxed shadow-sm"
        >
          {children}
        </blockquote>
      );

    case "list": {
      const isOrdered = node.listType === "number";
      const ListTag = isOrdered ? "ol" : "ul";
      const listClass = isOrdered
        ? "list-decimal pl-6 mb-6 space-y-2 text-[#333333] text-[17px] leading-relaxed"
        : "list-disc pl-6 mb-6 space-y-2 text-[#333333] text-[17px] leading-relaxed marker:text-[#cd0442]";
      return (
        <ListTag key={index} className={listClass}>
          {children}
        </ListTag>
      );
    }

    case "listitem":
      return (
        <li key={index} className="pl-1">
          {children}
        </li>
      );

    case "link": {
      const url = node.fields?.url || node.url || "#";
      const newTab = node.fields?.newTab || node.newTab;
      return (
        <Link
          key={index}
          href={url}
          target={newTab ? "_blank" : undefined}
          rel={newTab ? "noopener noreferrer" : undefined}
          className="text-[#cd0442] font-semibold underline decoration-[#cd0442]/40 hover:text-[#f72e06] hover:decoration-[#f72e06] transition-colors"
        >
          {children}
        </Link>
      );
    }

    case "upload": {
      const media = node.value || node.fields?.media;
      const imageUrl = typeof media === "object" ? media.url : typeof node.url === "string" ? node.url : null;
      const altText = (typeof media === "object" ? media.alt : "") || "Article image";
      const caption = node.fields?.caption;

      if (!imageUrl) return null;

      return (
        <figure key={index} className="my-8 overflow-hidden rounded-xl bg-gray-50 border border-gray-100 shadow-sm">
          <img src={imageUrl} alt={altText} className="w-full h-auto object-cover max-h-[550px]" />
          {caption && (
            <figcaption className="text-center text-xs text-gray-500 py-2.5 px-4 bg-gray-50 border-t border-gray-100 italic">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case "horizontalrule":
      return <hr key={index} className="my-8 border-t border-gray-200" />;

    default:
      // Fallback container for unknown parent node
      if (children && children.length > 0) {
        return <div key={index} className="mb-4">{children}</div>;
      }
      return null;
  }
}

export function RichTextRenderer({ content, rawContent, snippet, className = "" }: RichTextRendererProps) {
  // 1. If Lexical AST is provided ({ root: { children: [...] } })
  if (content && typeof content === "object" && content.root && Array.isArray(content.root.children) && content.root.children.length > 0) {
    return (
      <div className={`prose-marathi max-w-none ${className}`}>
        {content.root.children.map((child: any, idx: number) => renderLexicalNode(child, idx))}
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
