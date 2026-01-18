"use client";

import { Author } from "@/types/author";
import React from "react";

const COOKIE_KEY = "recent";

function setCookie(name: string, value: string, days = 30) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();

  const isLocalhost =
    location.hostname === "localhost" ||
    location.hostname === "127.0.0.1";

  const domain = isLocalhost
    ? ""
    : location.hostname.endsWith("lvh.me")
    ? "domain=.lvh.me;"
    : "domain=.feedple.com;";

  document.cookie = `
    ${name}=${encodeURIComponent(value)};
    expires=${expires};
    path=/;
    ${domain}
    SameSite=Lax
  `;
}


function getCookie(name: string) {
  return document.cookie
    .split("; ")
    .find(row => row.startsWith(name + "="))
    ?.split("=")[1];
}


export type RecentAuthor = {
  type: "author";
  name: string;
  handle: string;
  profile_picture?: string | null;
};

export const storeRecent = (data: Author) => {
  let recents: RecentAuthor[] = JSON.parse(
    decodeURIComponent(getCookie("recent") || "[]")
  );

  const record: RecentAuthor = {
    type: "author",
    name: data.name,
    handle: data.handle,
    profile_picture: data.profile_picture,
  };

  // Remove existing entry with same handle
  recents = recents.filter(
    (item) => item.handle !== record.handle
  );

  // Add newest at the front, keep only 3
  recents = [record, ...recents].slice(0, 3);

  setCookie("recent", JSON.stringify(recents));

  // Notify listeners (same-tab + cross-components)
  window.dispatchEvent(new Event("recent-updated"));
};

export const useRecent = () => {
  const [recent, setRecent] = React.useState<RecentAuthor[]>([]);

  React.useEffect(() => {
    const load = () => {
      const stored = JSON.parse(
        decodeURIComponent(getCookie("recent") || "[]")
      );
      console.log(getCookie("recent"));
      setRecent(stored);
    };

    load();
    window.addEventListener("recent-updated", load);
    return () => window.removeEventListener("recent-updated", load);
  }, []);

  return recent;
};
