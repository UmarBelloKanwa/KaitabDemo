"use client";

import { sections } from "@/data/sections";
import { Box, Container, Grid, Typography, Link } from "@mui/material";
import Image from "next/image";

export default function InfoSections() {
  return (
    <Box sx={{ py: 5, px: 3 }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box
          sx={{
            textAlign: "center",
            mb: 10,
          }}
        >
          <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
            <Image
              src="/app/logo.png" // adjust path if needed
              alt="Feedple logo"
              width={56}
              height={56}
            />
          </Box>

          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 400, mb: 2, }}
          >
            Welcome to the Feedple Support Center
          </Typography>

          <Typography
            variant="caption"
            sx={{ maxWidth: 520, mx: "auto", lineHeight: 1.7 }}
          >
            Find information, get help, and learn more about how Feedple works.
          </Typography>
        </Box>

        {/* Sections */}
        <Grid container spacing={8}>
          {sections.map((item) => (
            <Grid key={item.title} size={{ xs: 12, md: 6 }}>
              <Box>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{ fontWeight: 600, mb: 2 }}
                >
                  {item.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ mb: 2, lineHeight: 1.6 }}
                >
                  {item.description}
                </Typography>

                <Link
                  href={item.href}
                  sx={{ fontWeight: 500, fontSize: "1rem" }}
                >
                  {item.linkText}
                </Link>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
