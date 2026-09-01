"use client";

import { useEffect } from "react";
import { trackSearch } from "@/lib/gtag";

interface SearchTrackerProps {
  query: string;
  totalDocs: number;
}

export function SearchTracker({ query, totalDocs }: SearchTrackerProps) {
  useEffect(() => {
    if (query && query.trim().length > 0) {
      trackSearch(query.trim(), totalDocs);
    }
  }, [query, totalDocs]);

  return null;
}
