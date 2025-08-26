"use client";

import React from "react";
import Sidebar from "@ui/Drawer";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import ThemeProvider from "@/components/theme-provider";
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { sidebarOpen, handleDrawerToggle } = useSidebar();

  return (
    <Box sx={{ display: isMobile ? "block" : "flex", height: "100vh" }}>
      <Sidebar
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      {children}
    </Box>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <LayoutContent>{children}</LayoutContent>
      </SidebarProvider>
    </ThemeProvider>
  );
}
