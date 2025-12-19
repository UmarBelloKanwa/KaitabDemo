"use server";

import React from "react";
import Header from "@/components/ui/home/Header";
import Box from "@mui/material/Box";
import StatusArea from "@/components/ui/editor/StatusArea";
import CategoriesList from "@/components/ui/home/CategoriesList";

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
          mt: { xs: -2 },
          width: "97%",
        }}
      >
        <Header />
      </Box>
      <Box
        sx={{
          m: "auto",
          width: { xs: "99%", sm: "81%" },
        }}
      >
        <Box
          sx={{
            m: "auto",
            width: { xs: "97%" },
          }}
        >
          <StatusArea />
          <CategoriesList />
        </Box>

        {children}
      </Box>
    </Box>
  );
}
