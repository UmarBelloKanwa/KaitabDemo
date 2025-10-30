import { useInfiniteQuery } from "@tanstack/react-query";
import { getAuthorBooks } from "@/actions/author";

export function useInfiniteAuthorBooks(author_handle: string) {
  return useInfiniteQuery({
    queryKey: ["authorBooks", author_handle],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const res = await getAuthorBooks(author_handle, String(pageParam));
      return res.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage?.length || lastPage.length < 10) return undefined;
      return allPages.length * 10;
    },
  });
}
