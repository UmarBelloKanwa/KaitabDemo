"use server";

// app/providers/HydrationProvider.tsx
import { ReactNode } from "react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchUser } from "@/actions/user";
import QueryProvider from "./QueryProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import Box from "@mui/material/Box";
import Sidebar from "@ui/Drawer";

export default async function HydrationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const queryClient = new QueryClient();

  // Prefetch server-side
  await queryClient.prefetchQuery({ queryKey: ["user"], queryFn: fetchUser });
  const user = queryClient.getQueryData(["user"]);

  // Pass dehydrated state to client provider
  const dehydratedState = dehydrate(queryClient);

  return (
    <QueryProvider state={dehydratedState}>
      <ThemeProvider>
        <Box sx={{ display: { xs: "block", sm: "fex" }, height: "fit-content" }}>
          <Sidebar user={user} />
          {children}
        </Box>
      </ThemeProvider>
    </QueryProvider>
  );
}
