import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchBookPost } from "@/lib/api/book";

export function useInfinitePosts(book_slug: string) {
  return useInfiniteQuery({
    queryKey: ["posts", book_slug],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const res = await fetchBookPost(book_slug, String(pageParam));
      return res.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.length || lastPage.length < 10) return undefined;
      return allPages.length * 10;
    },
  });
}
