"use client";

import React from "react";
import Sidebar from "@ui/Drawer";
import Box from "@mui/material/Box";
import ThemeProvider from "@/components/theme-provider";
import AppBar from "@mui/material/AppBar";

function LayoutContent({ children }: { children: React.ReactNode }) {

  return (
    <Box sx={{ display: { xs: "block", sm: "flex" }, height: "fit-content" }}>
      <AppBar
        elevation={0}
        position="sticky"
        sx={{ width: { xs: "100%", sm: "fit-content" }, height: "fit-content", bgcolor: "background.default" }}
      >
        <Sidebar />
      </AppBar>
      {children}
    </Box >
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LayoutContent>{children}</LayoutContent>
    </ThemeProvider>
  );
}
