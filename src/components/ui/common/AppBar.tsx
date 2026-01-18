"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useRouter } from "next/navigation";

export default function ResponsiveAppBar({ title }: { title?: string }) {
  // Post | Chapter | Book

  const router = useRouter();

  return (
    <AppBar
      elevation={0}
      position="sticky"
      sx={{
        bgcolor: "background.default",
        px: 0,
        height: { xs: "100%", sm: "100%", md: "fit-content" },
        maxWidth: { xs: "100%", sm: "fit-content", md: "fit-content" },
        width: { xs: "100%", sm: "fit-content", md: "fit-content" },
      }}
    >
      <Toolbar
        sx={{
          my: "auto",
          height: { xs: "100%", sm: "100%", md: "fit-content" },
          maxWidth: { xs: "100%", sm: "fit-content", md: "fit-content" },
          mx: 0,
          gap: { xs: 1, md: 0 },
          width: { xs: "100%", sm: "fit-content", md: "fit-content" },
          justifyContent: "center",
        }}
      >
        <IconButton
          sx={{
            bgcolor: "background.paper",
            display: { xs: "none", sm: "block" },
            borderRadius: 1,
            m: 0,
          }}
          onClick={() => router.back()}
        >
          <ChevronLeftIcon />
        </IconButton>

        <IconButton
          sx={{
            display: { xs: "block", sm: "none" },
            borderRadius: 1,
            position: "absolute", // <-- this makes it stay left
            left: 8,
          }}
          onClick={() => router.back()}
        >
          <ArrowBackIcon />
        </IconButton>

        {/* <Box
          sx={{
            alignItems: "center",
            gap: 1,
            flex: 1,
            alignContent: "center",
            justifyContent: "center",
            textAlign: "center"
          }}
        > */}
        <Typography
          variant="body2"
          fontWeight={800}
          sx={{
            display: { xs: "block", sm: "none" },
            color: "text.primary",
            textAlign: "center",
            flexGrow: 1,
          }}
        >
          {title}
        </Typography>
        {/* </Box> */}
      </Toolbar>
    </AppBar>
  );
}
