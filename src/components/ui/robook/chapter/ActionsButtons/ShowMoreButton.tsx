"use client";

import React from "react";
import Button from "@mui/material/Button";
import useAuthCheck from "@/hooks/auth/useAuthCheck";
import { useRouter } from "next/navigation";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";


 const ShowMoreButton = ({
  robookSlug,
  chapterPublicId,
}: {
  robookSlug: string;
  chapterPublicId: string;
}) => {
  const requireAuth = useAuthCheck();
  const router = useRouter();
  return (
    <Button
      fullWidth
      onClick={() => {
        requireAuth(() => router.push(`/r/${robookSlug}/${chapterPublicId}`));
      }}
      endIcon={
        <KeyboardArrowDownIcon
          sx={{
            transform: "rotate(0deg)",
            transition: "transform 0.3s",
          }}
        />
      }
      sx={{
        bgcolor: "rgba(255, 255, 255, 0.05)",
        color: "text.primary",
        textTransform: "none",
        "&:hover": {
          bgcolor: "rgba(255, 255, 255, 0.08)",
        },
      }}
    >
      Show more
    </Button>
  );
};

export default ShowMoreButton;