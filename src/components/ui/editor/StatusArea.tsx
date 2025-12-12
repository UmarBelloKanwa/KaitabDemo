"use client";

import { useState } from "react";
import { Avatar, TextField, IconButton, Paper, Stack } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import type { User } from "@/types";
import { useRouter } from "next/navigation";

export default function StatusInput() {
  const [input, setInput] = useState("");

  const queryClient = useQueryClient();

  const user: User | null = queryClient.getQueryData(["user"]) || null;

  if (!user) {
    return <></>;
  }

  const isAuthor = !!user?.author;
  const router = useRouter();

  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: "background.default",
        mx: "auto",
        p: 1.5,
        px: 2,
        boxShadow: 11,
        borderRadius: 1.3,
        border: "1px solid",
        borderColor: "divider",
        mb: 1,
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        {/* Avatar */}
        <Avatar
          alt="User avatar"
          src={isAuthor ? user?.author?.profile_picture : undefined}
          sx={{
            width: 45, height: 45,
            flexShrink: 0,
             cursor: "pointer"  
          }}
          onClick={() => {
            if (isAuthor){
              router.push(`/${user?.author?.handle}`);
            }
          }}
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
            input: { disableUnderline: true, readOnly: true,} // Also removes underline for standard variant
          }}
          onClick={() => {
            router.push("/publish");
          }}
          sx={{
           // bgcolor: "background.paper",
           // boxShadow: 11,
           // border: "1px solid",
           // borderColor: "rgba(255, 255, 255, 0.03)",
            // py: 1,
             px: 1,
            borderRadius: 2,
            cursor: "pointer",
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
