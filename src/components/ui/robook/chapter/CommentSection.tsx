"use client";

import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import ShareIcon from "@mui/icons-material/Share";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ImageIcon from "@mui/icons-material/Image";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

import type { PostCardProps, Comment } from "@/types";

interface ExpandedPostProps extends PostCardProps {
  onClose: () => void;
}

export default function ExpandedPost({
  timestamp,
  image,
  metrics,
  onClose,
  usersComments,
}: ExpandedPostProps) {
  const [newComment, setNewComment] = React.useState("");
  const [comments, setComments] = React.useState<Comment[]>(usersComments);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + "K";
    }
    return num.toString();
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        user: {
          name: "You",
          username: "you",
          avatar: "/diverse-user-avatars.png",
          verified: false,
        },
        timestamp: "now",
        content: newComment,
        metrics: { replies: 0, likes: 0 },
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  return (
    <Box
      sx={{
        // bgcolor: "background.paper",
        // color: "white",
        p: { xs: 0, sm: 1, md: 2 },
        pb: {md: 0}
      }}
    >
      <Box
        sx={{
          p: 2,
          mb: 0,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
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
                disabled={!newComment.trim()}
                variant="contained"
                sx={{
                  p: 0,
                  m: 0,
                  py: 0.5,
                  borderRadius: "20px",
                }}
              >
                Reply
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 2 }}>
        {comments.map((comment, index) => (
          <Box
            key={comment.id}
            sx={{
              p: 0,
              py: 1,
              // "&:hover": { bgcolor: "rgba(255, 255, 255, 0.03)" },
              // transition: "background-color 0.2s",
            }}
          >
            <Box sx={{ display: "flex", gap: 1.5 }}>
              <Avatar
                src={comment.user.avatar || "/placeholder.svg"}
                sx={{ width: 40, height: 40 }}
              >
                {comment.user.name.charAt(0)}
              </Avatar>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", color: "white" }}
                  >
                    {comment.user.name}
                  </Typography>

                  <Typography variant="body2" sx={{ color: "#6b7280" }}>
                    ·
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#6b7280" }}>
                    {comment.timestamp}
                  </Typography>
                </Box>

                <Typography
                  variant="body1"
                  sx={{
                    color: "rgba(255, 255, 255, 0.9)",
                    fontSize: "14px",
                    my: 1,
                    mb: 1.5,
                    whiteSpace: "pre-line",
                  }}
                >
                  {comment.content}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ opacity: 0.3 }} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
