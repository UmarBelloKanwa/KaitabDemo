"use client";

import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import type { Comment } from "@/types/book";
import { CreateCommentToChapter } from "@/lib/api/book";

export default function CommentInput({
  chapterId,
  setComments,
}: {
  chapterId: string;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}) {
  const [newComment, setNewComment] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    setLoading(true);

    // Optimistic UI update
    const tempComment: Comment = {
      public_id: `temp-${Date.now()}`,
      user: { name: "You", public_id: "temp-user" },
      created_at: new Date().toISOString(),
      comment_text: newComment,
    };
    setComments((prev) => [tempComment, ...prev]);

    try {
      // Send to backend
      const res = await CreateCommentToChapter(chapterId, newComment);

      // Replace temporary comment with the real one
      if (res?.data) {
        setComments((prev) =>
          prev.map((c) =>
            c.public_id === tempComment.public_id ? res.data : c
          )
        );
      }

      setNewComment("");
    } catch (error) {
      console.log("Failed to post comment:", error);
      // Rollback optimistic update if failed
      setComments((prev) =>
        prev.filter((c) => c.public_id !== tempComment.public_id)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 1.5 }}>
      <Avatar
        sx={(theme) => ({
          bgcolor: theme.palette.primary.main,
          width: 37,
          height: 37,
          display: { md: "flex", xs: "none" },
        })}
      >
        U
      </Avatar>
      <Box sx={{ flex: 1 }}>
        <TextField
          multiline
          rows={3}
          placeholder="Post your reply"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          variant="standard"
          fullWidth
          sx={{
            "& .MuiInput-root": {
              "&:before": { display: "none" },
              "&:after": { display: "none" },
            },
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={handleAddComment}
            disabled={!newComment.trim() || loading}
            variant="contained"
            sx={{
              py: 0.5,
              px: 2,
              borderRadius: "20px",
              textTransform: "none",
            }}
          >
            {loading ? "Posting..." : "Reply"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
