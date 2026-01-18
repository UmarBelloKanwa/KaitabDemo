"use client";

import React from "react";
import { useUserStore } from "@/store/user-store";
import { Author } from "@/types/author";
import { storeRecent } from "@/lib/utils/storeRecent";

export default function StoreItem({ data }: { data: Author }) {
  const user = useUserStore((state) => state.user);

  React.useEffect(() => {
    if (data.public_id === user?.author?.public_id) return;
    storeRecent(data);
  }, [data.public_id, user?.author?.public_id]);

  return null;
}
