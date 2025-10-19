"use client"

import React from "react";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

// MUI components
import IconButton from "@mui/material/IconButton";

// MUI icons
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PostsIcon from "@mui/icons-material/ChatBubbleOutline";
import ChaptersIcon from "@mui/icons-material/ImportContacts";
import MoreIcon from "@mui/icons-material/MoreHoriz";

import MessageIcon from '@mui/icons-material/Message';
import ButtonBase from "@mui/material/ButtonBase";



export default function SwitchTab() {
  const [contentName, setContentName] = React.useState("chapters");
  const actions = [
    { title: "Posts", icon: <PostsIcon sx={{ fontSize: 16 }} />, onClick: () => setContentName("Posts") },
    { title: "Chapters", icon: <ChaptersIcon sx={{ fontSize: 16 }} />, onClick: () => setContentName("Chapters") },
    { title: "Messages", icon: <MessageIcon sx={{ fontSize: 16 }} />, onClick: () => setContentName("Messages") },
  ];
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={{ xs: 2.5, sm: 1 }}
      sx={{
        p: 0,
        m: { xs: "auto", sm: 0 },
        mt: 1,
        mb: 0,
        width: "fit-content",
        maxWidth: "100%",
      }}
    >
      {actions.map((item, index) => (
        <ButtonBase
          key={index}
          onClick={item.onClick}
          sx={(theme) => ({
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: { xs: 1, sm: 3 },
            px: 1,
            py: 0.5,
            "&:hover": {
              bgcolor: "action.hover",
            },

            gap: { xs: 0, sm: 0.5 },
            // ✅ Active state
            ...(contentName === item.title && {
              backgroundImage: theme.custom.gradient.primary, // same as contained
              color: theme.palette.primary.contrastText, // text/icons turn white
              "&:hover": {
                bgcolor: theme.custom.gradient.primaryHover, // darker on hover
              },
              "& .MuiTypography-root": {
                color: theme.palette.primary.contrastText,
              },
              "& svg": {
                color: theme.palette.primary.contrastText, // icons white too
              },
            }),

            [theme.breakpoints.up("sm")]: {
              border: "1px solid",
              borderColor: "divider",
              flexDirection: "row",
              ...(item.title == "Messages" && {
                display: "none",
              }),
            },
          })}
        >
          {item.icon}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ ml: { sm: 0.5, xs: 0 }, mt: { xs: 0.5, sm: 0 } }}
          >
            {item.title}
          </Typography>
        </ButtonBase>
      ))}
      <IconButton
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          p: 0.5,
        }}
      >
        <MoreIcon sx={{ fontSize: 16, color: "gray" }} />
      </IconButton>
    </Stack>
  );
}
