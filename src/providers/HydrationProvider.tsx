// app/providers/HydrationProvider.tsx
import { ReactNode } from "react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchUser } from "@/actions/user";
import ClientQueryProvider from "./QueryProvider";

export default async function HydrationProvider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  // Prefetch server-side
  await queryClient.prefetchQuery({ queryKey: ["user"], queryFn: fetchUser });

  // Pass dehydrated state to client provider
  const dehydratedState = dehydrate(queryClient);

  return <ClientQueryProvider state={dehydratedState}>{children}</ClientQueryProvider>;
}
