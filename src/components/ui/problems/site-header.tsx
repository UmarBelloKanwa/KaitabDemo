"use client"

import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Link from "@mui/material/Link"
import { useTheme } from "@mui/material/styles"

export function SiteHeader() {
  const theme = useTheme()

  return (
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 3 }}>
            <Link
              href="#problems"
              underline="none"
              color="text.secondary"
              sx={{
                fontSize: "0.875rem",
                fontWeight: 500,
                "&:hover": { color: "text.primary" },
                transition: "color 0.2s",
              }}
            >
              Problems
            </Link>
            <Link
              href="#solution"
              underline="none"
              color="text.secondary"
              sx={{
                fontSize: "0.875rem",
                fontWeight: 500,
                "&:hover": { color: "text.primary" },
                transition: "color 0.2s",
              }}
            >
              Solution
            </Link>
            <Link
              href="#pricing"
              underline="none"
              color="text.secondary"
              sx={{
                fontSize: "0.875rem",
                fontWeight: 500,
                "&:hover": { color: "text.primary" },
                transition: "color 0.2s",
              }}
            >
              Pricing
            </Link>
            <Link
              href="#about"
              underline="none"
              color="text.secondary"
              sx={{
                fontSize: "0.875rem",
                fontWeight: 500,
                "&:hover": { color: "text.primary" },
                transition: "color 0.2s",
              }}
            >
              About
            </Link>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button variant="text" size="small" sx={{ display: { xs: "none", md: "inline-flex" } }}>
              Log in
            </Button>
            <Button variant="contained" size="small">
              Get Started
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
