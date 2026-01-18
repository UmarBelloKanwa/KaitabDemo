"use client";

import { Author } from "@/types/author";
import React from "react";

const COOKIE_KEY = "recent";

function getCookie(name: string) {
  const match = document.cookie.match(new RegExp("(^|; )" + name + "=([^;]*)"));
  return match ? match[2] : undefined;
}

function setCookie(name: string, value: string, days = 30) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();

  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";

  const domain = isLocalhost
    ? ""
    : hostname.endsWith("lvh.me")
      ? "domain=.lvh.me;"
      : "domain=.feedple.com;";

  // IMPORTANT: No line breaks
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; ${domain} SameSite=Lax`;
}

export type RecentAuthor = {
  type: "author";
  name: string;
  handle: string;
  profile_picture?: string | null;
};

export const storeRecent = (data: Author) => {
  let recents: RecentAuthor[] = JSON.parse(
    decodeURIComponent(getCookie(COOKIE_KEY) || "[]"),
  );

  const record: RecentAuthor = {
    type: "author",
    name: data.name,
    handle: data.handle,
    profile_picture: data.profile_picture,
  };

  recents = recents.filter((item) => item.handle !== record.handle);
  recents = [record, ...recents].slice(0, 3);

  setCookie(COOKIE_KEY, JSON.stringify(recents));

  window.dispatchEvent(new Event("recent-updated"));
};

export const useRecent = () => {
  const [recent, setRecent] = React.useState<RecentAuthor[]>([]);

  React.useEffect(() => {
    const load = () => {
      const stored = JSON.parse(
        decodeURIComponent(getCookie(COOKIE_KEY) || "[]"),
      );
      setRecent(stored);
    };

    load();
    window.addEventListener("recent-updated", load);
    return () => window.removeEventListener("recent-updated", load);
  }, []);

  return recent;
};
