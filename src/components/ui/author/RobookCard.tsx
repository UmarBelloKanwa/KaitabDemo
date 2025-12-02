"use client";

import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import type { BookResponse } from "@/types/book";
import { useRouter } from "next/navigation";
export default function RobookCard({
  robook,
  where,
}: {
  robook: BookResponse;
  where: string;
}) {
  const router = useRouter();

  return (
    <Card
      sx={(theme) => ({
        minWidth: where == "home" ? 300 : "100%",
        flexShrink: 0, // Prevent shrinking in flex layouts
        flexGrow: 0, // Prevent growing in flex layouts
        height: where == "home" ? 130 : 150,
        cursor: "pointer",
        border: `1px solid`,
        borderColor: "rgba(175, 157, 157, 0.2)",
        "&:hover": { transform: "translateY(-2px)" },
        transition: "transform 0.2s",
        overflow: "hidden",
        borderRadius: 1.5,
        position: "relative",
        p: { xs: 1, md: 1.1 },
        pt: 0,
        backgroundColor: theme.palette.background.default,
        boxShadow: 11,
        //  background: theme.custom.gradient.primary,
      })}
      onClick={() => router.push(`/r/${robook.slug}`)}
      elevation={0}
    >
      <Box sx={{ display: "flex", height: "100%", width: "100%" }}>
        <Box
          sx={{
            width: { xs: 120, md: 150 },
            height: "100%",
            flexShrink: 0,
            borderRadius: "12px 0 0 12px",
            overflow: "hidden",
            p: 0.5,
            pl: 0.5,
          }}
        >
          <Box
            component="img"
            src={robook.main_photo_url}
            alt={robook.name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "fill",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 0.8,
            }}
          />
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            p: 1,
            width: "100%",
            minWidth: 0,
            height: "100%",
          }}
        >
          <Box sx={{ flex: 1, minHeight: 0, pb: 1 }}>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
            >
              <Typography
                variant="subtitle1"
                component="div"
                sx={{
                  fontSize: "0.97rem",
                  lineHeight: 1.2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "wrap",
                }}
              >
                {robook.name}
              </Typography>
            </Box>
            {where != "home" && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 0.7,
                  fontSize: "0.8rem",
                  display: "-webkit-box",
                  WebkitLineClamp: where == "home" ? 1 : 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {robook.description}
              </Typography>
            )}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 0.7,
                fontSize: "0.71rem",
              }}
            >
              {[...(robook.topics ?? []), ...(robook.custom_topics ?? [])]
                .slice(0, where == "home" ? 2 : 3)
                .join(" • ")}
            </Typography>
          </Box>
          {/* {where != "home" && <FollowButton />} */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-arround",
              alignItems: "center",
              height: 20,
              gap: 1.5,
              color: "text.secondary",
              flexShrink: 0,
              mt: "auto",
            }}
          >
            {/* {where != "home" && ( */}
            <Button
              variant="outlined"
              sx={(theme) => ({
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                border: "1px solid " + theme.palette.divider,
                borderRadius: 0.6,
                boxShadow: theme.shadows[1],   // elevation
                px: 1,
                py: 0.5,
                fontSize: "0.75rem",
                textTransform: "none",
                "&:hover": {
                  boxShadow: theme.shadows[8],
                  backgroundColor: theme.palette.background.paper,
                },
              })}
            >
              Read
            </Button>
            {/* )} */}
            {/* {where == "home" && <FollowButton />} */}
            {/* Interactions */}
            {/* <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>

              <Typography variant="caption" color="text.secondary">
                {robook.followers_count}
              </Typography>
            </Box> */}
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
