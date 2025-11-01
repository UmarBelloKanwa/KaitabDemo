// app/providers/ClientProvider.tsx
"use client";

import React from "react";
import { useUserStore } from "@/store/user-store";
import { useUIStore } from "@/store/ui-store";
import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import AuthCard from "@ui/auth/AuthCard";
import { SWRConfig } from "swr";
import Box from "@mui/material/Box";
import { axiosFetcher } from "@/lib/axios";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useUserStore((state) => state.setUser);
  const displayAuthCard = useUIStore((state) => state.displayAuthCard);
  const setDisplayAuthCard = useUIStore((state) => state.setDisplayAuthCard);

  const { data: user, isLoading } = useCurrentUser();

  React.useEffect(() => {
    if (!isLoading) setUser(user);
  }, [user, isLoading, setUser]);

  return (
    <SWRConfig value={{ fetcher: axiosFetcher, revalidateOnFocus: false }}>
      <Box component="main" sx={{ flexGrow: 1, width: "100%" }}>
        <AuthCard
          displayAuthCard={displayAuthCard}
          setDisplayAuthCard={setDisplayAuthCard}
        />
        {children}
      </Box>
    </SWRConfig>
  );
}
