"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NextLink from "next/link";

export function HeroSection() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 10, md: 16 } }}>
        <Box sx={{ maxWidth: 900, mx: "auto", textAlign: "center" }}>
          <Chip
            label="Solving how ideas scale"
            sx={{
              mb: 3,
              bgcolor: "secondary.main",
              fontWeight: 500,
              fontSize: "0.875rem",
            }}
          />

          <Typography
            variant="h1"
            sx={{
              mb: 3,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              fontWeight: 700,
            }}
          >
            Your ideas shouldn’t <br /> stop with you.
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mb: 5,
              fontSize: { xs: "1rem", md: "1.125rem" },
              maxWidth: 800,
              mx: "auto",
            }}
          >
            Business ideas live in static content. Without you present, they
            can’t guide decisions or scale beyond your time.
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Button
              LinkComponent={NextLink}
              href="/home"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{ minWidth: 160 }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              LinkComponent={"a"}
              href="https://cal.com/umar-bello-kanwa-jwhzin/30min"
              size="large"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                minWidth: 160,
                borderColor: "divider",
              }}
            >
              Talk to founders
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
