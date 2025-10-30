import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchAuthors } from "@/lib/api/author";

export function useInfiniteAuthors() {
  return useInfiniteQuery({
    queryKey: ["authors"],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const res = await fetchAuthors(String(pageParam));
      return res.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.length || lastPage.length < 10) return undefined;
      return allPages.length * 10;
    },
  });
}
