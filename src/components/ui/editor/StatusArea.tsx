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

  // if (!user) {
  //   return <></>;
  // }

  const isAuthor = !!user?.author;
  const router = useRouter();

  let name = user?.name.trim().split(" ")[0];
  if (name) name = ", " + name;
  else name = "";

  return (
    <Paper
      elevation={0}
      sx={(theme) => ({
        bgcolor: "background.default",
        mx: "auto",
        p: { md: 1.5, xs: 0 },
        px: 2,
        boxShadow: { xs: 0, sm: 0, md: 11 },
        borderRadius: 1.3,
        border: { sm: `1px solid ${theme.palette.divider}`, md: `1px solid ${theme.palette.divider}`, xs: "none" },
        borderColor: "divider",
        mb: 2,
      })}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        {/* Avatar */}
        <Avatar
          alt="User avatar"
          src={isAuthor ? user?.author?.profile_picture : undefined}
          sx={{
            width: { xs: 41, sm: 41, md: 45 },
            height: { xs: 41, sm: 41, md: 45 },
            flexShrink: 0,
            cursor: "pointer",
          }}
          onClick={() => {
            if (isAuthor) {
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
          placeholder={`What's on your mind${name}?`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          variant="standard"
          size="small"
          slotProps={{
            input: { disableUnderline: true, readOnly: true }, // Also removes underline for standard variant
          }}
          onClick={() => {
            router.push("/publish");
          }}
          sx={{
            bgcolor: { xs: "background.paper", md: "background.default" },
          //  boxShadow: { xs: 11 },
            border: { xs: "1px solid rgba(255, 255, 255, 0.1)", md: "none" },
            borderColor: "divider",
            py: { xs: 0.8 },
            px: { xs: 2, sm: 1, md: 1 },
            borderRadius: 2,
            cursor: "pointer",
            fontSize: "x-small",
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
