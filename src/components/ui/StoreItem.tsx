"use client";

import React from "react";
import { useUserStore } from "@/store/user-store";
import { Author } from "@/types/author";
import { BookResponse as Book } from "@/types/book";
import { storeRecent } from "@/lib/utils/storeRecent";

export default function StoreItem({type, data}: {type: "book" | "author", data: Author | Book}) {
  const user = useUserStore((state) => state.user);

  React.useEffect(() => {
    if (type == "author" && (data as Author).public_id === user?.author?.public_id) { 
      return; // don't store self
    }
    storeRecent(type, data);
  }, []);

  return <></>
}