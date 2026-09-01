"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { pageview, GA_MEASUREMENT_ID } from "@/lib/gtag";

export function AnalyticsRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    const url = searchParams?.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;

    // We skip the first load if GA4 initial config already sent it, or we fire it safely
    if (isFirstRender.current) {
      isFirstRender.current = false;
      pageview(url);
      return;
    }

    // On SPA route transition, fire pageview
    pageview(url);
  }, [pathname, searchParams]);

  return null;
}
