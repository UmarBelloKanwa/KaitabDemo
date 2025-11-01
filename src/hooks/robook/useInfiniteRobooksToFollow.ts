import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchBooks } from "@/actions/robook";

export function useInfiniteBooksTofollow() {
  return useInfiniteQuery({
    queryKey: ["robooks"],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const res = await fetchBooks(String(pageParam));
      return res.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.length || lastPage.length < 10) return undefined;
      return allPages.length * 10;
    },
  });
}
