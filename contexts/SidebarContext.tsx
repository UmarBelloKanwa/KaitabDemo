"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

import { useTheme, useMediaQuery } from "@mui/material";

type SidebarContextType = {
  sidebarOpen: boolean;
  handleDrawerToggle: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  //console.log("isMobile", typeof isMobile, isMobile);
  const [sidebarOpen, setSidebarOpen] = useState(isMobile == false);

  const handleDrawerToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ sidebarOpen, handleDrawerToggle }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
