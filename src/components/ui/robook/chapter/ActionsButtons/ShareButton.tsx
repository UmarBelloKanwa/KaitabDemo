"use client";

import React from "react";
import Button from "@mui/material/Button";
import ShareIcon from "@mui/icons-material/Share";
import Snackbar from "@mui/material/Snackbar";
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded';

export default function ShareButton() {
  const [open, setOpen] = React.useState(false);

  const handleShare = async () => {
    try {
      // Copy current page URL
      await navigator.clipboard.writeText(window.location.href);
      setOpen(true); // show "Copied!" snackbar
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
        sx={{
          color: "text.secondary",
          textTransform: "none",
        }}
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
