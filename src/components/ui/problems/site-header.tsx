"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import NextLink from "next/link";

export function SiteHeader() {
  const theme = useTheme();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const toggleDrawer = () => setMobileOpen((prev) => !prev);

  const navLinks = (
    <>
      <Link href="#problems" underline="none" color="text.secondary">
        Problems
      </Link>
      <Link href="#solution" underline="none" color="text.secondary">
        Solution
      </Link>
      <Link href="#cta" underline="none" color="text.secondary">
        Get in touch
      </Link>
    </>
  );

  return (
    <>
      <AppBar
        position="sticky"
        color="default"
        elevation={0}
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "background.default",
          backdropFilter: "blur(8px)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
            {/* Logo */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src="/app/logo-name.png"
                alt="Feedple"
                style={{ width: 120 }}
              />
            </Box>

            {/* Desktop Navigation */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 3,
              }}
            >
              {navLinks}
            </Box>

            {/* Actions */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                className="elevated"
                sx={{ display: { xs: "none", md: "inline-flex" } }}
                onClick={() => router.push("/login")}
              >
                Sign in
              </Button>

              <Button
                variant="contained"
                size="small"
                LinkComponent={NextLink}
                href="/home"
              >
                Get Started
              </Button>

              {/* Mobile menu button */}
              <IconButton
                sx={{ display: { xs: "inline-flex", md: "none" } }}
                onClick={toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: { width: 260, p: 2 },
        }}
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            border: "1px solid",
            borderColor: "divider",
            boxSizing: "border-box",
            bgcolor: "background.default", // theme key; same result on both variants
            backgroundImage: "none", // kill dark-mode overlay
          },
        }}
        elevation={0}
        ModalProps={{
          keepMounted: true, // optional: better mobile performance
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {navLinks}

          <Divider />

          <Button
            variant="outlined"
            fullWidth
            onClick={() => {
              toggleDrawer();
              router.push("/login");
            }}
          >
            Sign in
          </Button>

          <Button
            variant="contained"
            fullWidth
            LinkComponent={NextLink}
            href="/home"
          >
            Get Started
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
