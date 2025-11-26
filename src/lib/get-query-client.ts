import { QueryClient } from "@tanstack/query-core";
import { cache } from "react";

const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          // With SSR, we usually want to set some default staleTime
          // above 0 to avoid refetching immediately on the client
          // staleTime: 60 * 1000,
          refetchOnMount: false,
          refetchOnWindowFocus: false,
          retry: false,
          staleTime: Infinity,
          gcTime: Infinity,
        },
      },
    })
);

export default getQueryClient;
