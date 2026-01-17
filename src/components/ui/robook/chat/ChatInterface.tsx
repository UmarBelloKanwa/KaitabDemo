"use client";

import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import Tooltip from "@mui/material/Tooltip";
import CheckIcon from "@mui/icons-material/Check";
import type { Author } from "@/types/author";
import { useQueryClient } from "@tanstack/react-query";

const MessageSection = ({ msg, author }: { msg: any; author: Author }) => {
  const [copied, setCopied] = React.useState(false);
  const resetTimerRef = React.useRef<number | null>(null);

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(msg.content);
      } else {
        // Fallback for older browsers / restricted environments
        const textarea = document.createElement("textarea");
        textarea.value = msg.content;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);

      // Clear any existing timer
      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current);
      }

      // Set new reset timer
      resetTimerRef.current = window.setTimeout(() => {
        setCopied(false);
        resetTimerRef.current = null;
      }, 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);
  return (
    <Box
      key={msg.id}
      sx={{
        display: "flex",
        justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
        alignItems: "flex-start",
        mb: msg.role === "user" ? 3 : 1.5,
      }}
    >
      {/* Message Wrapper */}
      <Box
        sx={{
          textAlign: msg.role === "user" ? "right" : "left",
          mr: msg.role === "user" ? 0 : 1,
        }}
      >
        {/* Header (name + avatar) */}
        {msg.role === "cortex" && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexDirection: msg.role === "user" ? "row-reverse" : "row",
            }}
          >
            <Avatar
              src={msg.role === "cortex" ? author.profile_picture : undefined}
              sx={(theme) => ({
                bgcolor:
                  msg.role === "user"
                    ? theme.palette.primary.main
                    : theme.palette.secondary.main,
                width: 30,
                height: 30,
                fontSize: "0.6rem",
                fontWeight: 600,
                borderRadius: "50%",
              })}
            >
              {msg.role === "user" ? author.name.charAt(0).toUpperCase() : ""}
            </Avatar>
            <Typography
              variant="caption"
              sx={{ color: "text.primary", fontWeight: 500 }}
            >
              {author.name}
            </Typography>
          </Box>
        )}
        {/* Message bubble */}
        <Box
          sx={{
            mt: 0.5,
            display: "flex",
            justifyContent: msg.role === "user" ? "flex-end" : "flex-start", // position bubble
            px: 0, // padding for spacing from edges
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: msg.role === "user" ? "flex-end" : "flex-start",
              width: "fit-content",
              maxWidth:
                msg.role === "user" ? "auto" : { xs: "100%", sm: "70%" }, // prevents too wide bubbles
            }}
          >
            <Paper
              elevation={1}
              sx={{
                bgcolor: "background.default",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                boxShadow: 30,
                fontSize: "13px",
                p: 1.5,
                textAlign: "left",
                maxWidth: msg.role === "user" ? "100%" : "auto",
                wordBreak: "break-word", // ensure long words break nicely
              }}
            >
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ fontSize: "14px" }}
              >
                {msg.content}
              </Typography>
            </Paper>

            <Box sx={{ display: "flex", gap: 0, mt: 0.5 }}>
              {msg.role === "cortex" && (
                <>
                  <Tooltip title="Share">
                    <IconButton size="small">
                      <IosShareOutlinedIcon sx={{ fontSize: "small" }} />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Copy">
                    <IconButton size="small" onClick={handleCopy}>
                      {copied ? (
                        <CheckIcon
                          sx={{ fontSize: "small", color: "success.main" }}
                        />
                      ) : (
                        <ContentCopyOutlinedIcon sx={{ fontSize: "small" }} />
                      )}
                    </IconButton>
                  </Tooltip>
                </>
              )}
              {/* <IconButton size="small">
                      <ThumbDownIcon fontSize="small" />
                    </IconButton> */}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const ChatInterface = ({
  messages,
  authorHandle,
}: {
  messages: any[];
  authorHandle: string;
}) => {
  const queryClient = useQueryClient();
  const author = queryClient.getQueryData<Author>(["author", authorHandle])!;
  return (
    <Paper
      sx={(theme) => ({
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        p: 2,
        px: 0,
        margin: "auto",
        mt: 0,
        width: "100%",
        mb: 3,
      })}
      elevation={0}
    >
      {messages.map((msg, index) => (
        <MessageSection key={index} msg={msg} author={author} />
      ))}
    </Paper>
  );
};

export default ChatInterface;
