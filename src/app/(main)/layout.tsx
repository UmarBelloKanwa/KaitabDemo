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
        mt: 2,
        px: { xs: 1 },
      }}
    >
      <Box
        sx={{
          m: "auto",
         // mt: { xs: -2 },
          width: "97%",
        }}
      >
        <Header />
      </Box>
      <Box
        sx={{
          m: "auto",
          mt: 3,
        //  width: { xs: "99%", sm: "93%" },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
