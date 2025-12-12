import { useInfiniteQuery } from "@tanstack/react-query";
import { getAuthorArticles } from "@/actions/author";

export function useInfiniteAuthorArticlesPreviews(author_handle: string) {
  return useInfiniteQuery({
    queryKey: ["authorArticlesPreviews", author_handle],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const res = await getAuthorArticles(author_handle, String(pageParam));
      return res.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.length || lastPage.length < 10) return undefined;
      return allPages.length * 10;
    },
  });
}
