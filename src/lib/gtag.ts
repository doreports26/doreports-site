// Google Analytics 4 (GA4) helper library for Next.js App Router
// Configured for News & Editorial metrics: Dwell Time, Scroll Depth, Category Views, Sharing, Search

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-PYM7XY0XP1";

// Global Window interface definition for gtag & dataLayer
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (
      command: "config" | "event" | "js" | "set" | "consent",
      targetIdOrAction: string | Date,
      configOrParams?: Record<string, any>
    ) => void;
  }
}

/**
 * Log standard SPA Pageviews
 */
export const pageview = (url: string, title?: string) => {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
    page_location: window.location.href,
    page_title: title || document.title,
  });
};

/**
 * Generic event logger
 */
export const event = (
  action: string,
  params: Record<string, any> = {}
) => {
  if (typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", action, {
    send_to: GA_MEASUREMENT_ID,
    ...params,
  });
};

/**
 * News Specific: Article View Event
 */
export interface ArticleTrackingPayload {
  article_id: string;
  article_title: string;
  article_category?: string;
  article_author?: string;
  publish_date?: string;
  tags?: string[];
  word_count?: number;
}

export const trackArticleView = (payload: ArticleTrackingPayload) => {
  event("article_view", {
    content_type: "article",
    item_id: payload.article_id,
    item_name: payload.article_title,
    article_category: payload.article_category || "Uncategorized",
    article_author: payload.article_author || "Editorial Desk",
    publish_date: payload.publish_date,
    article_tags: payload.tags?.join(", ") || "",
    word_count: payload.word_count || 0,
  });
};

/**
 * News Specific: Active Reading / Dwell Time Milestone & Summary
 */
export interface ArticleReadTimePayload extends ArticleTrackingPayload {
  seconds_elapsed: number;
  milestone?: string; // e.g., '15s', '30s', '60s', '120s', '180s', '300s', 'final'
  scroll_percentage?: number;
  is_completed?: boolean;
}

export const trackArticleReadTime = (payload: ArticleReadTimePayload) => {
  event("article_reading_time", {
    article_id: payload.article_id,
    article_title: payload.article_title,
    article_category: payload.article_category,
    article_author: payload.article_author,
    duration_seconds: payload.seconds_elapsed,
    read_milestone: payload.milestone || `${payload.seconds_elapsed}s`,
    scroll_depth: payload.scroll_percentage || 0,
    is_completed: payload.is_completed || false,
  });
};

/**
 * News Specific: Article Scroll Depth (25%, 50%, 75%, 90%, 100%)
 */
export const trackArticleScroll = (
  article: { id: string; title: string; category?: string },
  percentage: number
) => {
  event("article_scroll_depth", {
    article_id: article.id,
    article_title: article.title,
    article_category: article.category,
    percent_scrolled: percentage,
  });
};

/**
 * News Specific: Reading Completion
 */
export const trackArticleCompleted = (
  article: { id: string; title: string; category?: string; author?: string },
  timeSpentSeconds: number
) => {
  event("article_completed", {
    article_id: article.id,
    article_title: article.title,
    article_category: article.category,
    article_author: article.author,
    reading_time_seconds: timeSpentSeconds,
  });
};

/**
 * News Specific: Category Page View
 */
export const trackCategoryView = (payload: {
  category_slug: string;
  category_name: string;
  page?: number;
  total_articles?: number;
}) => {
  event("category_view", {
    category_slug: payload.category_slug,
    category_name: payload.category_name,
    page_number: payload.page || 1,
    total_articles: payload.total_articles || 0,
  });
};

/**
 * News Specific: Internal Search Tracking
 */
export const trackSearch = (query: string, resultsCount: number) => {
  event("search", {
    search_term: query,
    results_count: resultsCount,
    has_results: resultsCount > 0,
  });
};

/**
 * News Specific: Article Social Share
 */
export const trackShare = (payload: {
  method: "whatsapp" | "facebook" | "twitter" | "telegram" | "native_share" | "copy_link";
  content_type: "article";
  item_id: string;
  item_name: string;
}) => {
  event("share", {
    method: payload.method,
    content_type: payload.content_type,
    item_id: payload.item_id,
    item_name: payload.item_name,
  });
};

/**
 * News Specific: WhatsApp Channel Join Click
 */
export const trackWhatsAppChannelClick = (source: string = "article_banner") => {
  event("whatsapp_channel_join_click", {
    source,
    link_destination: "whatsapp_channel",
  });
};

/**
 * News Specific: Recirculation / Related Article Click
 */
export const trackRecirculationClick = (payload: {
  source_article: string;
  destination_article: string;
  widget_name: "latest_stories" | "latest_news_widget" | "trending_widget";
}) => {
  event("article_recirculation_click", {
    from_article: payload.source_article,
    to_article: payload.destination_article,
    widget: payload.widget_name,
  });
};
