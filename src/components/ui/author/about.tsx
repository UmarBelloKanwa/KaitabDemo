"use client";

import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { Author } from "@/types/author";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SocialLinks from "@/components/ui/author/SocialLinks";
import Snackbar from "@mui/material/Snackbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function AboutAuthor({ handle }: { handle: string }) {
  const queryClient = useQueryClient();
  const author: Author | null =
    queryClient.getQueryData(["author", handle]) || null;
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  if (!author) {
    return <></>;
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setSnackbarOpen(true);
    } catch (err) {
      console.log("Failed to copy link:", err);
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        my: 1,
        border: "2px solid",
        borderColor: "divider",
        bgcolor: "background.default",
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography
          variant="body2"
          component="div"
          sx={{ color: "text.secondary", fontSize: "small" }}
        >
          <span> {author.followers_count} followers </span> &nbsp; • &nbsp;
          <span> {author.expertise_area} </span>
        </Typography>

        {author.social_links && <SocialLinks links={author.social_links} />}
        <Typography
          variant="body2"
          component="div"
          onClick={handleShare}
          sx={{ color: "text.secondary", fontSize: "small" }}
        >
          Copy link
        </Typography>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={() => setSnackbarOpen(false)}
          message="Link copied to clipboard!"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </CardContent>
    </Card>
  );
}
