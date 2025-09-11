"use client";

import React from "react";
import Sidebar from "@ui/Drawer";
import Box from "@mui/material/Box";
import ThemeProvider from "@/components/theme-provider";
import AppBar from "@mui/material/AppBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  // Un conditional display: "fex" , and it also soleve the
  return (
    <ThemeProvider>
      <Box sx={{ display: { xs: "block", sm: "fex" }, height: "fit-content" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, width: "100%" }}>
          {children}
        </Box>
      </Box >
    </ThemeProvider>
  );
}