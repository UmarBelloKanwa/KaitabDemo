"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import BackButton from "./ActionsButtons/BackButton";
import { fetchRobook } from "@/actions/robook";
import type { BookResponse } from "@/types/book";

interface Props {
  backTo?: "chapters" | "posts";
  robook: BookResponse
}

export default function ResponsiveAppBar({ robook, backTo }: Props) {
  const robookPhotoUrl = robook.main_photo_url || "";
  const robookName = robook.name;
  const authorName = robook.author?.name || "Unknown";

  return (
    <AppBar
      elevation={0}
      position="sticky"
      sx={(theme) => ({
        bgcolor: "background.default",
        borderBottom: "1px solid grey",
        borderTop: { xs: `1px solid ${theme.palette.divider}` },
        borderColor: "divider",
        px: 0,
        justifyContent: "center",
        alignItems: "baseline",
      })}
    >
      <Toolbar sx={{ my: "auto", p: 0, mx: 0, gap: { xs: 1, md: 1 } }}>
        <BackButton robookSlug={robook.slug} backTo={backTo} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            src={robookPhotoUrl}
            sx={{
              width: { xs: 37, sm: 40 },
              height: { xs: 37, sm: 40 },
              borderRadius: 1,
            }}
          >
            {robookName[0]}
          </Avatar>
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              gap: 0.5,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="body2" sx={{ color: "text.primary" }}>
              {robookName}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              By {authorName}
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
