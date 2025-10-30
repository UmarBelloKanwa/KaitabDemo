"use client";

import React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";

export default function ShareButton({
  absolute = false,
  id = "",
}: {
  absolute?: boolean;
  id?: string;
}) {
  const [open, setOpen] = React.useState(false);

  const handleShare = async () => {
    try {
      const origin = window.location.origin;
      const current = window.location.href;

      const url = absolute
        ? `${origin}/${id}`
        : `${current}/${id}`;

      await navigator.clipboard.writeText(url);
      setOpen(true);
    } catch (err) {
      console.log("Failed to copy link:", err);
    }
  };

  return (
    <>
      <Button
        variant="text"
        size="small"
        startIcon={<IosShareRoundedIcon />}
        sx={{ color: "text.secondary", textTransform: "none" }}
        onClick={handleShare}
      >
        Share
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        message="Link copied to clipboard!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
}
