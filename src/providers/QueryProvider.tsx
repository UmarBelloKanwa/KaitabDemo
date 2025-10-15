// app/providers/ClientQueryProvider.tsx
"use client";

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { HydrationBoundary } from '@tanstack/react-query';

export default function ClientQueryProvider({
  state,
  children,
}: {
  state: any;
  children: ReactNode;
}) {
  const [client] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: Infinity,
        gcTime: Infinity,
      },
    },
  }));

  return (
    <QueryClientProvider client={client}>
      <HydrationBoundary state={state}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}
