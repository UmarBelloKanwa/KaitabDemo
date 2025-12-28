"use client";

import React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded';
import IconButton from "@mui/material/IconButton";

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
      let current = window.location.href;
      current = current.replace(/\/home|feeds$/, "");

      const raw = absolute ? `${origin}/${id}` : `${current}/${id}`;
      let url = new URL(raw);

      // Normalize pathname (remove duplicate slashes)
      url.pathname = url.pathname.replace(/\/{2,}/g, "/");
      await navigator.clipboard.writeText(url.toString());
      setOpen(true);
    } catch (err) {
      console.log("Failed to copy link:", err);
    }
  };

  return (
    <>
      <IconButton
        size="small"
        sx={{ color: "text.secondary" }}
        onClick={(e) => {
          e.stopPropagation(); // <- Prevent parent click
          handleShare();
        }}
      >
        <IosShareRoundedIcon
          fontSize="small"
        />
      </IconButton>

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
