import { useInfiniteQuery } from "@tanstack/react-query";
import { getArticlesPreviews } from "@/lib/api/article";

export function useInfiniteArticlesPreviews() {
  return useInfiniteQuery({
    queryKey: ["articlesPreviews"],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const res = await getArticlesPreviews(String(pageParam));
      return res.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.length || lastPage.length < 10) return undefined;
      return allPages.length * 10;
    },
  });
}
