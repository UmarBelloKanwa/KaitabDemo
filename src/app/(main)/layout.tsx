"use server";

import React from "react";
import Header from "@/components/ui/home/Header";
import Box from "@mui/material/Box";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        px: { xs: 1 },
      }}
    >
      <Box
        sx={{
          m: "auto",
          mt: { md: 2},
          width: { sm: "97%", xs: "95%", md: "97%" },
        }}
      >
        <Header />
      </Box>
      <Box
        sx={{
          m: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
