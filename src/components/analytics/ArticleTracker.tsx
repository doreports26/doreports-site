"use client";

import { useEffect, useRef } from "react";
import {
  trackArticleView,
  trackArticleReadTime,
  trackArticleScroll,
  trackArticleCompleted,
} from "@/lib/gtag";

interface ArticleTrackerProps {
  slug: string;
  title: string;
  category?: string;
  author?: string;
  date?: string;
  tags?: string[];
  wordCount?: number;
}

export function ArticleTracker({
  slug,
  title,
  category = "ताज्या घडामोडी",
  author = "Do Reports Desk",
  date,
  tags = [],
  wordCount = 0,
}: ArticleTrackerProps) {
  const activeSecondsRef = useRef(0);
  const lastActiveTimestampRef = useRef(Date.now());
  const isUserActiveRef = useRef(true);
  const maxScrollPercentRef = useRef(0);
  const scrollMilestonesRef = useRef<Set<number>>(new Set());
  const timeMilestonesRef = useRef<Set<number>>(new Set());
  const articleCompletedRef = useRef(false);

  // 1. Initial Article View Event
  useEffect(() => {
    trackArticleView({
      article_id: slug,
      article_title: title,
      article_category: category,
      article_author: author,
      publish_date: date,
      tags,
      word_count: wordCount,
    });
  }, [slug, title, category, author, date, tags, wordCount]);

  // 2. Scroll Depth & Completion Tracking
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight - windowHeight;
      if (docHeight <= 0) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const currentScrollPercent = Math.min(
        100,
        Math.max(0, Math.round((scrollTop / docHeight) * 100))
      );

      if (currentScrollPercent > maxScrollPercentRef.current) {
        maxScrollPercentRef.current = currentScrollPercent;
      }

      // Track 25%, 50%, 75%, 90%, 100%
      const milestones = [25, 50, 75, 90, 100];
      for (const m of milestones) {
        if (
          currentScrollPercent >= m &&
          !scrollMilestonesRef.current.has(m)
        ) {
          scrollMilestonesRef.current.add(m);
          trackArticleScroll(
            { id: slug, title, category },
            m
          );
        }
      }

      // Check article completion: > 85% scroll & at least 15 active reading seconds
      if (
        currentScrollPercent >= 85 &&
        activeSecondsRef.current >= 15 &&
        !articleCompletedRef.current
      ) {
        articleCompletedRef.current = true;
        trackArticleCompleted(
          { id: slug, title, category, author },
          activeSecondsRef.current
        );
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug, title, category, author]);

  // 3. True Active Engaged Time Tracking
  useEffect(() => {
    // Reset state for new article
    activeSecondsRef.current = 0;
    lastActiveTimestampRef.current = Date.now();
    isUserActiveRef.current = true;
    maxScrollPercentRef.current = 0;
    scrollMilestonesRef.current.clear();
    timeMilestonesRef.current.clear();
    articleCompletedRef.current = false;

    let idleTimeout: NodeJS.Timeout | null = null;

    const recordUserActivity = () => {
      isUserActiveRef.current = true;
      lastActiveTimestampRef.current = Date.now();

      if (idleTimeout) clearTimeout(idleTimeout);
      // If no activity for 30 seconds, mark as idle
      idleTimeout = setTimeout(() => {
        isUserActiveRef.current = false;
      }, 30000);
    };

    const activityEvents = ["mousemove", "keydown", "scroll", "touchstart", "click"];
    activityEvents.forEach((ev) =>
      window.addEventListener(ev, recordUserActivity, { passive: true })
    );

    // 1-second active heartbeat
    const timerInterval = setInterval(() => {
      const isVisible =
        typeof document !== "undefined" &&
        document.visibilityState === "visible" &&
        document.hasFocus();

      if (isVisible && isUserActiveRef.current) {
        activeSecondsRef.current += 1;
        const currentSecs = activeSecondsRef.current;

        // Check time milestones: 15s, 30s, 60s, 120s, 180s, 300s
        const timeMilestones = [15, 30, 60, 120, 180, 300];
        for (const tm of timeMilestones) {
          if (currentSecs === tm && !timeMilestonesRef.current.has(tm)) {
            timeMilestonesRef.current.add(tm);
            trackArticleReadTime({
              article_id: slug,
              article_title: title,
              article_category: category,
              article_author: author,
              publish_date: date,
              tags,
              word_count: wordCount,
              seconds_elapsed: tm,
              milestone: `${tm}s`,
              scroll_percentage: maxScrollPercentRef.current,
              is_completed: articleCompletedRef.current,
            });

            // Check if completing article after hitting scroll depth earlier
            if (
              maxScrollPercentRef.current >= 85 &&
              !articleCompletedRef.current
            ) {
              articleCompletedRef.current = true;
              trackArticleCompleted(
                { id: slug, title, category, author },
                currentSecs
              );
            }
          }
        }
      }
    }, 1000);

    // Send final read summary on exit / unmount / visibilitychange to hidden
    const sendFinalReadSummary = () => {
      if (activeSecondsRef.current > 3) {
        trackArticleReadTime({
          article_id: slug,
          article_title: title,
          article_category: category,
          article_author: author,
          publish_date: date,
          tags,
          word_count: wordCount,
          seconds_elapsed: activeSecondsRef.current,
          milestone: "exit_summary",
          scroll_percentage: maxScrollPercentRef.current,
          is_completed: articleCompletedRef.current,
        });
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        sendFinalReadSummary();
      }
    };

    const handlePageHide = () => {
      sendFinalReadSummary();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      sendFinalReadSummary();
      clearInterval(timerInterval);
      if (idleTimeout) clearTimeout(idleTimeout);
      activityEvents.forEach((ev) =>
        window.removeEventListener(ev, recordUserActivity)
      );
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [slug, title, category, author, date, tags, wordCount]);

  return null;
}
