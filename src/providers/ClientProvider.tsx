// app/providers/ClientProvider.tsx
"use client";

import React from "react";
import { useUserStore } from "@/store/user-store";
import { useUIStore } from "@/store/ui-store";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import AppLayout from "@ui/AppLayout";
import AuthCard from "@ui/auth/AuthCard";
import { SWRConfig } from "swr";
import { axiosFetcher } from "@/lib/axios";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme";

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  const setUser = useUserStore((state) => state.setUser);
  const displayAuthCard = useUIStore((state) => state.displayAuthCard);
  const setDisplayAuthCard = useUIStore((state) => state.setDisplayAuthCard);

  const { data: user, isLoading } = useCurrentUser();

  React.useEffect(() => {
    if (!isLoading) setUser(user);
  }, [user, isLoading, setUser]);

  return (
    <SWRConfig value={{ fetcher: axiosFetcher, revalidateOnFocus: false }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppLayout>
          <AuthCard displayAuthCard={displayAuthCard} setDisplayAuthCard={setDisplayAuthCard} />
          {children}
        </AppLayout>
      </ThemeProvider>
    </SWRConfig>
  );
}
