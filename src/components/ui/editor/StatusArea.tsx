"use client";

import { useState } from "react";
import { Avatar, TextField, IconButton, Paper, Stack } from "@mui/material";
import { VideoCall, Image, Share } from "@mui/icons-material";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { useQueryClient } from "@tanstack/react-query";
import type { User } from "@/types";

export default function StatusInput() {
  const [input, setInput] = useState("");

  const queryClient = useQueryClient();

  const user: User | null = queryClient.getQueryData(["user"]) || null;

  if (!user) {
    return <></>;
  }
  const isAuthor = !!user?.author;

  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: "background.default",
        mx: "auto",
        px: 1,
        // boxShadow: 11,
        borderRadius: 2,
        // border: "1px solid",
        borderColor: "rgba(255, 255, 255, 0.07)",
        mb: 2,
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        {/* Avatar */}
        <Avatar
          alt="User avatar"
          src={isAuthor ? user?.author?.profile_picture : undefined}
          sx={{ width: 47, height: 47, flexShrink: 0 }}
        >
          {isAuthor
            ? user?.author?.name.charAt(0).toUpperCase()
            : user?.name.charAt(0).toUpperCase()}
        </Avatar>

        {/* Input Field */}
        <TextField
          fullWidth
          placeholder={`What's on your mind, ${user?.name.trim().split(" ")[0]}?`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          variant="standard"
          size="small"
          slotProps={{
            input: { disableUnderline: true, } // Also removes underline for standard variant
          }}
          sx={{
            bgcolor: "background.paper",
            boxShadow: 11,
            border: "1px solid",
            borderColor: "rgba(255, 255, 255, 0.03)",
            py: 1,
            px: 2,
            borderRadius: 2,
            fontSize: "small",
          }}
        />

        {/* Action Buttons */}
        {/* <Stack direction="row" sx={{ flexShrink: 0 }}>
          <IconButton
            size="small"
            aria-label="Image"
          >
            <FileUploadOutlinedIcon fontSize="medium" />
          </IconButton>
        </Stack> */}
      </Stack>
    </Paper>
  );
}
