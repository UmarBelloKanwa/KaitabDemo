"use client";

import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <IconButton
      sx={{
        bgcolor: "background.paper"
      }}
      onClick={() => router.back()}
    >
      <ChevronLeftIcon />
    </IconButton>
  );
}
