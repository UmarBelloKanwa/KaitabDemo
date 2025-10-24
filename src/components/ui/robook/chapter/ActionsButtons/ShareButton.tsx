"use client";

import React from "react";
import Button from "@mui/material/Button";
import ShareIcon from "@mui/icons-material/Share";
import Snackbar from "@mui/material/Snackbar";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";

export default function ShareButton({ id = "" }: { id?: string }) {
  const [open, setOpen] = React.useState(false);

  const handleShare = async () => {
    try {
      // Copy current page URL
      let url = window.location.href;
      url += "/" + id;
      await navigator.clipboard.writeText(url);
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
