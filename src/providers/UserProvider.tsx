"use server";

// app/providers/HydrationProvider.tsx
import { ReactNode } from "react";
import {
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchUser } from "@/actions/user";
import ThemeProvider from "@/providers/ThemeProvider";
import Box from "@mui/material/Box";
import Sidebar from "@ui/Drawer";
import getQueryClient from "@/lib/get-query-client";

import ClientProvider from "@/providers/ClientProvider";

export default async function UserProvider({
  children,
}: {
  children: ReactNode;
}) {
  const queryClient = getQueryClient();

  // Prefetch server-side
  await queryClient.prefetchQuery({ queryKey: ["user"], queryFn: fetchUser });
  const user: any = queryClient.getQueryData(["user"]);
  
  if (user?.author) {
    queryClient.setQueryData(["author", user?.author?.handle], user?.author);
    queryClient.setQueryData(["currentAuthor"], user?.author);

    //if (user?.author?.is_owner) {
      queryClient.setQueryData(["cortex"], user?.author?.cortex);
    //}
  }

  // Pass dehydrated state to client provider
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ThemeProvider>
        <Box
          sx={{ display: { xs: "block", sm: "fex" }, height: "fit-content" }}
        >
          <Sidebar user={user} />
          <ClientProvider>{children}</ClientProvider>
        </Box>
      </ThemeProvider>
    </HydrationBoundary>
  );
}
