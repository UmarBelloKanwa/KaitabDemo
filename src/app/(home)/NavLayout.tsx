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
        py: 3,
        px: { xs: 0, md: 1 },
      }}
    >
      <Grid
        container
        spacing={{ sm: 2 }}
        sx={{
          width: "100%",
          m: "auto",
          mt: 2,
          alignContent: "space-evenly",
          alignItems: "flex-start",
        }}
      >
        {/* Posts for user to scroll and view */}
        <Grid size={{ xs: 12, sm: 7.5 }}>{children}</Grid>
        
        <Grid
          size={{ xs: 0, sm: "grow" }}
          sx={{
            display: { xs: "none", sm: "block" },
            position: "sticky",
            top: 0,
            height: "100vh",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SectionNav />
        </Grid>
      </Grid>
    </Container>
  );
}
