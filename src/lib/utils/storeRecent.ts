"use client";

import React from "react";
import { Author } from "@/types/author";
import { BookResponse as Book } from "@/types/book";

export const storeRecent = (type: "book" | "author", data: Author | Book) => {
  const storageKey = "recent";

  let recents: Array<
    | {
        type: "book";
        name: string;
        slug: string;
        cover_photo_url?: string | null;
      }
    | {
        type: "author";
        name: string;
        handle: string;
        profile_picture?: string | null;
      }
  > = JSON.parse(localStorage.getItem(storageKey) || "[]");

  // Normalize structure
  const record =
    type === "book"
      ? {
          type: "book" as const,
          name: (data as Book).name,
          slug: (data as Book).slug,
          cover_photo_url: (data as Book).cover_photo_url,
        }
      : {
          type: "author" as const,
          name: (data as Author).name,
          handle: (data as Author).handle,
          profile_picture: (data as Author).profile_picture,
        };

  // Unique key (slug or handle)
  const key = type === "book" ? record.slug : record.handle;

  // Remove if it already exists
  recents = recents.filter((item) =>
    item.type === "book"
      ? (item as any).slug !== key
      : (item as any).handle !== key
  );

  // Add newest at the front, keep only **3**
  recents = [record, ...recents].slice(0, 3);

  // Save
  localStorage.setItem(storageKey, JSON.stringify(recents));

  // Notify listeners
  window.dispatchEvent(new Event("recent-updated"));
};

export const useRecent = () => {
  const [recent, setRecent] = React.useState<any[]>([]);

  React.useEffect(() => {
    const load = () => {
      const stored = JSON.parse(localStorage.getItem("recent") || "[]");
      setRecent(stored); // no slice needed anymore
    };

    load();
    window.addEventListener("recent-updated", load);
    return () => window.removeEventListener("recent-updated", load);
  }, []);

  return recent;
};
