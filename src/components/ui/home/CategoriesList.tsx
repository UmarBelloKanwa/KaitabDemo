"use client";

import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { useRouter, usePathname } from "next/navigation";

export default function CategoriesList() {
  const router = useRouter();
  const pathname = usePathname();

  const categories = [
    {
      label: "Home",
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Contents",
      href: "/contents", // or "/contents"
      active: pathname.startsWith("/contents"),
    },
  ];

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        mb: 2,
        mt: 1
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1,
          overflowX: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {categories.map((category) => (
          <Chip
            key={category.label}
            label={category.label}
            onClick={() => router.push(category.href)}
            sx={(theme) => ({
              bgcolor: "background.default",
              border: category.active
                ? `1px solid ${theme.palette.divider}`
                : "none",
              fontWeight: category.active ? 600 : 400,
              cursor: "pointer",
            })}
          />
        ))}
      </Box>
    </Box>
  );
}
