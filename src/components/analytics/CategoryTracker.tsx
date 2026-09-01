"use client";

import { useEffect } from "react";
import { trackCategoryView } from "@/lib/gtag";

interface CategoryTrackerProps {
  slug: string;
  title: string;
  currentPage?: number;
  totalArticles?: number;
}

export function CategoryTracker({
  slug,
  title,
  currentPage = 1,
  totalArticles = 0,
}: CategoryTrackerProps) {
  useEffect(() => {
    trackCategoryView({
      category_slug: slug,
      category_name: title,
      page: currentPage,
      total_articles: totalArticles,
    });
  }, [slug, title, currentPage, totalArticles]);

  return null;
}
