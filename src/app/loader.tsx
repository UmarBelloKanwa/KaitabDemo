"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Box, LinearProgress } from "@mui/material";

export default function RouterLoadingListener() {
  const router = useRouter();
  const pathname = usePathname();

  const loadingRef = useRef(false);
  const originalPushRef = useRef(router.push);
  const originalBackRef = useRef(router.back);
  const originalReplaceRef = useRef(router.replace);
  const safetyTimerRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ STOP loading when route changes
  useEffect(() => {
    stop();
  }, [pathname]);

  // ✅ PATCH router
  useEffect(() => {
    // patch back
    router.back = (...args: Parameters<typeof router.back>) => {
      const target = args.length > 0 && args[0] ? getTargetPath(args[0]) : "";
      if (target === pathname) return originalBackRef.current(...args);
      start();
      return originalBackRef.current(...args);
    };

    router.push = (...args: Parameters<typeof router.push>) => {
      const target = getTargetPath(args[0]);
      if (target === pathname) return originalPushRef.current(...args);
      start();
      return originalPushRef.current(...args);
    };

    router.replace = (...args: Parameters<typeof router.replace>) => {
      const target = getTargetPath(args[0]);
      if (target === pathname) return originalReplaceRef.current(...args);
      start();
      return originalReplaceRef.current(...args);
    };

    return () => {
      router.push = originalPushRef.current;
      router.replace = originalReplaceRef.current;
      router.back = originalBackRef.current; // ✅ restore back
    };
  }, [router, pathname]);

  const getTargetPath = (target: any) => {
    // implement your logic to get target path
    if (typeof target === "string") return target;
    if (typeof target === "object" && target.pathname) return target.pathname;
    return "";
  };

  const start = () => {
    if (loadingRef.current) return;
    loadingRef.current = true;

    const bar = document.getElementById("top-loader");
    const overlay = document.getElementById("top-loader-overlay");

    if (bar) bar.style.opacity = "1";
    if (overlay) overlay.style.opacity = "0.4";

    // Prevent all clicks/interactions
    if (overlay) overlay.style.pointerEvents = "auto";

    if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    safetyTimerRef.current = setTimeout(() => stop(), 30000);
  };

  const stop = () => {
    loadingRef.current = false;

    const bar = document.getElementById("top-loader");
    const overlay = document.getElementById("top-loader-overlay");

    if (bar) bar.style.opacity = "0";
    if (overlay) {
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";
    }

    if (safetyTimerRef.current) {
      clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = null;
    }
  };

  return (
    <>
      {/* Overlay to freeze body */}
      <Box
        id="top-loader-overlay"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.4)",
          opacity: 0,
          pointerEvents: "none",
          transition: "opacity 0.2s ease",
          zIndex: 9998,
        }}
      />

      {/* Top loader bar */}
      <Box
        id="top-loader"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 9999,
          opacity: 0,
          transition: "opacity 0.2s ease",
        }}
      >
        <LinearProgress
          sx={{
            height: 2,
            "& .MuiLinearProgress-bar": {
              boxShadow: "0 0 10px rgba(79,70,229,0.7)",
            },
          }}
        />
      </Box>
    </>
  );
}
