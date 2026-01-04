"use client";

import { Box, LinearProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 9999,
      }}
    >
      <LinearProgress 
        color="inherit"
        sx={{
          // backdropFilter: "blur(1px)",
            height: 2,
            "& .MuiLinearProgress-bar": {
            boxShadow: "0 0 10px rgba(79,70,229,0.7)",
        },
      }} />
    </Box>
  );
}