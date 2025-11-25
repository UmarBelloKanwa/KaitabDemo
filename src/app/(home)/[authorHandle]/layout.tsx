"use server";

import React from "react";
import BackButton from "@/components/ui/common/AppBar";
import Box from "@mui/material/Box";

export default async function BookLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ authorHandle: string }>;
}) {
  const p = await params;
  const handle = p.authorHandle;
 
  return (
    <>
      <Box
        sx={{
          mt: 0,
          display: "flex",
          p: 0,
          flexDirection: { xs: "column", sm: "column", md: "row" }, // correct
          gap: 0,
          mx: "auto", // simpler than m: "auto"
          alignItems: { xs: "center", md: "start" },
          justifyContent: { xs: "center", md: "start" },
          width: "100%",
        }}
      >
        <BackButton title="Book" />
        <Box
          sx={{
            flex: 1,
            p: { xs: 1, sm: 1, md: 0 },
            mx: "auto", // centers it horizontally inside parent
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
}
