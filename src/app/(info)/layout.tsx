"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Link,
  Menu,
  IconButton,
  MenuItem,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import Footer from "@ui/common/Footer";

const navItems = [
  // { name: "Get Started", link: "/home" },
  { name: "About", link: "/about" },
  { name: "Support", link: "/support" },
  { name: "Contact", link: "/contact" },
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
    (route) => pathname === `/${route}` || pathname.startsWith(`/${route}/`)
  );

  if (hideDrawer) {
    return <>{children}</>;
  }

  const isActive = (link: string) => {
    if (link === "/") return pathname === "/";
    return pathname === link || pathname.startsWith(`${link}/`);
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
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
                objectFit: "contain",
              }}
            />
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3, alignItems: "center" }}>
            <Button
              variant="contained"
              component={NextLink}
              href="/home"
            >
              Home
            </Button>
            {navItems.map((item) => {
              const active = isActive(item.link);

              return (
                <Link
                  component={NextLink}
                  key={item.link}
                  href={item.link}
                  underline="none"
                  sx={(theme) => ({
                    color: active ? "primary.main" : "text.primary",
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    borderBottom: active
                      ? `3px solid ${theme.palette.primary.main}`
                      : "3px solid transparent",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      color: "primary.main",
                    },
                  })}
                >
                  {item.name}
                </Link>
              );
            })}
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
              {navItems.map((item) => {
                const active = isActive(item.link);

                return (
                  <MenuItem
                    key={item.link}
                    component={NextLink}
                    href={item.link}
                    selected={active}
                    onClick={handleClose}
                  >
                    {item.name}
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Offset for fixed AppBar */}
      <Toolbar />

      {children}

      <Footer />
    </Box>
  );
}
