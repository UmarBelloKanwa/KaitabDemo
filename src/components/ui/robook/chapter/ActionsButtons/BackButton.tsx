"use client";

import React from "react";
import { useRouter } from "next/navigation";
import IconButton from "@mui/material/IconButton";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

export default function BackButton() {
  const router = useRouter();
  return (
    <IconButton onClick={() => router.back()}>
      <ArrowBackOutlinedIcon />
    </IconButton>
  );
}
