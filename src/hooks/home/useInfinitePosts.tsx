import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchAuthorsPosts } from "@/actions/author";


export function useInfinitePosts() {
  return useInfiniteQuery({
    queryKey: ["authorsPosts"],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const res = await fetchAuthorsPosts(pageParam);
      return res.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.length || lastPage.length < 10) return undefined;
      return allPages.length * 10;
    },
  });
}
