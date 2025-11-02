import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchBooksPosts } from "@/actions/robook";


export function useInfinitePosts() {
  return useInfiniteQuery({
    queryKey: ["booksPosts"],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const res = await fetchBooksPosts(pageParam);
      return res.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.length || lastPage.length < 10) return undefined;
      return allPages.length * 10;
    },
  });
}
