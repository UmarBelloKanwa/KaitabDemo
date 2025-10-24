"use client";

import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import type { Comment } from "@/types/book";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import CommentInput from "@/components/ui/robook/chapter/CommentInput";

export default function CommentSection({
  usersComments,
  createComment,
}: {
  usersComments: Comment[];
  createComment: (txt: string) => Promise<any>
}) {
  const [comments, setComments] = React.useState<Comment[]>(usersComments);

  dayjs.extend(relativeTime);

  return (
    <Box
      sx={{
        p: { xs: 0, sm: 1, md: 2 },
        pb: { md: 0 },
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
        <CommentInput createComment={createComment} setComments={setComments} />
      </Box>

      <Box sx={{ mt: 2 }}>
        {!comments ||
          (comments.length <= 0 && (
            <Typography variant="caption"> Be the first to comment </Typography>
          ))}
        {comments.length > 0 &&
          comments.map((comment, index) => (
            <Box
              key={index}
              sx={{
                p: 0,
                py: 1,
                // "&:hover": { bgcolor: "rgba(255, 255, 255, 0.03)" },
                // transition: "background-color 0.2s",
              }}
            >
              <Box sx={{ display: "flex", gap: 1.5 }}>
                <Avatar src={undefined} sx={{ width: 40, height: 40 }}>
                  {comment.user.name.charAt(0).toUpperCase()}
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
                      {dayjs(comment.created_at).fromNow()}
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
                    {comment.comment_text}
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
