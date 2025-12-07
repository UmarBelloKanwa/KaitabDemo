"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Box, LinearProgress } from "@mui/material";

export default function RouterLoadingListener() {
  const router = useRouter();
  const pathname = usePathname();

  const loadingRef = useRef(false);
  const originalPushRef = useRef(router.push);
  const originalReplaceRef = useRef(router.replace);
  const safetyTimerRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ STOP loading when route actually changes
  useEffect(() => {
    stop();
  }, [pathname]);

  // ✅ PATCH router ONCE (safe)
  useEffect(() => {
    router.push = (...args: Parameters<typeof router.push>) => {
      const target = getTargetPath(args[0]);

      // ✅ PREVENT stuck loader on same route
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
    };
  }, [router, pathname]);

  // ✅ Extract target path safely
  const getTargetPath = (href: any) => {
    if (typeof href === "string") return href.split("?")[0];
    if (typeof href === "object" && "pathname" in href) return href.pathname;
    return null;
  };

  // ✅ START loader
  const start = () => {
    if (loadingRef.current) return;
    loadingRef.current = true;

    const bar = document.getElementById("top-loader");
    if (bar) bar.style.opacity = "1";

    // ✅ SAFETY: auto-hide after 7s no matter what
    if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    safetyTimerRef.current = setTimeout(() => {
      stop();
    }, 7000);
  };

  // ✅ STOP loader
  const stop = () => {
    loadingRef.current = false;

    const bar = document.getElementById("top-loader");
    if (bar) bar.style.opacity = "0";

    if (safetyTimerRef.current) {
      clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = null;
    }
  };

  return (
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
  );
}
