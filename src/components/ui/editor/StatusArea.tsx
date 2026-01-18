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
        mt: 0,
        mx: "auto",
        p: { md: 1.5, xs: 0 },
        px: 2,
        boxShadow: { xs: 0, sm: 0, md: 11 },
        borderRadius: 1.3,
        border: {
          sm: `1px solid ${theme.palette.divider}`,
          md: `1px solid ${theme.palette.divider}`,
          xs: "none",
        },
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
          size="small"
          slotProps={{
            input: {
              readOnly: true,
              sx: {
                border: "none", // removes border
                outline: "none", // removes focus outline
              },
            }, // Also removes underline for standard variant
          }}
          onClick={() => {
            router.push("/publish");
          }}
          sx={{
            bgcolor: { xs: "background.paper", md: "background.default" },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none", // just in case variant changes
            },
            "& .MuiInputBase-input": {
              "&::placeholder": {
                fontSize: { xs: "small", sm: "14px", md: "medium" },
              },
            },
            px: { xs: 0, sm: 1, md: 1 },
            borderRadius: 1.5,
            cursor: "pointer",
          }}
        />

      </Stack>
    </Paper>
  );
}
