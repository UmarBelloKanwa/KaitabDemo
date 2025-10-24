"use client";

import React from "react";
import { useRouter } from "next/navigation";
import IconButton from "@mui/material/IconButton";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

export default function BackButton({ robookSlug, backTo }: { robookSlug: string, backTo?: "chapters" | "posts" }) {
  const router = useRouter();
  let url = `/r/${robookSlug}/`;
  url += backTo ?? "" ;
  return (
    <IconButton onClick={() => router.push(url)}>
      <ArrowBackOutlinedIcon />
    </IconButton>
  );
}
