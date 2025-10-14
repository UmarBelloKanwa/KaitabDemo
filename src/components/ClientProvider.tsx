"use client";

import React from "react";
import { useUserStore } from "@/store/user-store";
import type { User } from "@/types";
import AppLayout from "@ui/AppLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import CssBaseline from "@mui/material/CssBaseline";
import AuthCard from "@ui/auth/AuthCard";
import { useUIStore } from "@/store/ui-store";
import { SWRConfig } from "swr";
import { axiosFetcher } from "@/lib/axios";

interface Props {
  children: React.ReactNode;
  user: User | null;
}

export default function ClientProvider({ children, user }: Props) {
  const setUser = useUserStore((state) => state.setUser);
  const fetchUser = useUserStore((state) => state.fetchUser);
  const displayAuthCard = useUIStore((state) => state.displayAuthCard);
  const setDisplayAuthCard = useUIStore((state) => state.setDisplayAuthCard);


  // ✅ Fix 2: Set or fetch user once when layout mounts
  React.useLayoutEffect(() => {
    if (user) {
      setUser(user);
    } else {
      fetchUser();
    }
  }, [user, setUser, fetchUser]);

  return (
    <SWRConfig
      value={{
        fetcher: axiosFetcher, // ✅ Fix 3: use "fetcher", not "axiosfetcher"
        revalidateOnFocus: false,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppLayout>
          <AuthCard
            displayAuthCard={displayAuthCard}
            setDisplayAuthCard={setDisplayAuthCard}
          />
          {children}
        </AppLayout>
      </ThemeProvider>
    </SWRConfig>
  );
}
