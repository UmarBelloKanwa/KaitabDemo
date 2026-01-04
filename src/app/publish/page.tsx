"use client";

import { useQueryClient } from "@tanstack/react-query";
import { navigateToSubdomain } from "@/lib/utils/navigate";

export default function Page() {
  const queryClient = useQueryClient();
  const user: any = queryClient.getQueryData(["user"])!;
  const isAuthor = !!user?.author;
  const author = user?.author;

  if (isAuthor) { 
    navigateToSubdomain(author.handle, '/publish');
  }

  return <></>
}
