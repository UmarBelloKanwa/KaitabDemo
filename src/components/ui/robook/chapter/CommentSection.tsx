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
import CircularProgress from "@mui/material/CircularProgress";
dayjs.extend(relativeTime);

export default function CommentSection({
  fetchComments,
  createComment,
}: {
  fetchComments: () => Promise<Comment[]>; // should be async
  createComment: (txt: string) => Promise<any>;
}) {
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const data = await fetchComments();
        if (isMounted) {
          setComments(data);
          setLoading(false);
        }
      } catch (err: any) {
        if (isMounted) {
          setError("Failed to load comments");
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, [fetchComments]);

  return (
    <Box sx={{ p: { xs: 0, sm: 1, md: 2 }, pb: { md: 0 } }}>
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
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
            <CircularProgress size={22} />
          </Box>
        )}

        {error && (
          <Typography variant="caption" sx={{ color: "red" }}>
            {error}
          </Typography>
        )}

        {!loading && comments.length === 0 && (
          <Typography variant="caption">Be the first to comment</Typography>
        )}

        {!loading &&
          comments.length > 0 &&
          comments.map((comment, index) => (
            <Box key={index} sx={{ p: 0, py: 1 }}>
              <Box sx={{ display: "flex", gap: 1.5 }}>
                <Avatar sx={{ width: 40, height: 40 }}>
                  {comment.user.name.charAt(0).toUpperCase()}
                </Avatar>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
                      {dayjs().diff(dayjs(comment.created_at), "minute") < 1
                        ? "just now"
                        : dayjs(comment.created_at).fromNow()}
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
