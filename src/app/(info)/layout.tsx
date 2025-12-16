"use client";

import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Link,
  Menu,
  IconButton,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  "About",
  "Get started",
  "Support",
  // "Privacy Policy",
  // "Terms of Service",
  // "FAQ",
  "Contact",
];

const HIDE_DRAWER_ROUTES = ["feedback", "privacy", "terms"];

export default function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const pathname = usePathname();

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const hideDrawer = HIDE_DRAWER_ROUTES.some(
    route =>
      pathname === `/${route}` || pathname.startsWith(`/${route}/`)
  );
  
    if (hideDrawer) {
      return <>{children}</>;
    }
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Header/Navigation */}
      <AppBar
        position="static"
        elevation={0}
        variant="outlined"
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "background.default",
        }}
      >
        <Toolbar>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src="/app/logo-name.png"
              alt="Feedple"
              style={{
                width: "125px",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop navigation */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 3,
            }}
          >
            {navItems.map((item, index) => (
              <Link
                key={item}
                href="#"
                underline="none"
                sx={(theme) => ({
                  color: "text.primary",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  borderBottom:
                    index === 0
                      ? `3px solid ${theme.palette.primary.main}`
                      : "3px solid transparent",
                  "&:hover": {
                    color: "primary.main",
                  },
                })}
              >
                {item}
              </Link>
            ))}
          </Box>

          {/* Mobile menu */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={handleOpen}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {navItems.map((item) => (
                <MenuItem key={item} onClick={handleClose}>
                  {item}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      {children}
    </Box>
  );
}
