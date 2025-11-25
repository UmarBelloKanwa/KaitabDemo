import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchAuthorPost } from "@/lib/api/author";

export function useInfinitePosts(author_handle: string) {
  return useInfiniteQuery({
    queryKey: ["posts", author_handle],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const res = await fetchAuthorPost(author_handle, String(pageParam));
      return res.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.length || lastPage.length < 10) return undefined;
      return allPages.length * 10;
    },
  });
}
