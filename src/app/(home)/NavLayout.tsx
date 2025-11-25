"use client";

import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import SectionNav from "@ui/home/SectionNav";

export default function NavLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        color: "text.primary",
        bgcolor: "background.default",
        pt: { xs: 1, sm: 0 },
        width: "100%",
        py: 0,
        px: { xs: 0, md: 0 },
      }}
    >
      <Grid
        container
        spacing={{ sm: 0 }}
        sx={{
          width: "100%",
          m: "auto",
          mt: 2,
          alignContent: "space-evenly",
          alignItems: "flex-start",
          gap: 0,
        }}
      >
        {/* Posts for user to scroll and view */}
        <Grid
          size={{
            xs: 12,
            sm: 12,
            md: 7.5,
          }}
          sx={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {children}
        </Grid>

        <Grid
          size={{ xs: 0, sm: "grow" }}
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
            position: "sticky",
            top: 0,
            minHeight: "100vh",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "transparent",
            p: 0,
          }}
        >
          <SectionNav />
        </Grid>
      </Grid>
    </Container>
  );
}
