"use server";

import React from "react";

import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

// MUI components
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";

// MUI icons
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PostsIcon from "@mui/icons-material/ChatBubbleOutline";
import ChaptersIcon from "@mui/icons-material/ImportContacts";
import MoreIcon from "@mui/icons-material/MoreHoriz";

import MessageIcon from "@mui/icons-material/Message";
import ButtonBase from "@mui/material/ButtonBase";

export default async function RobokkProfileInfo({ robook }: { robook: any }) {
  return (
    <Box sx={{ width: "100%", m: "auto" }}>
      <Card
        sx={{
          borderRadius: 1.5,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          overflow: "hidden",
          position: "relative",
          width: { xs: "100%", sm: "98%" },
          border: "1px solid",
          borderColor: "divider",
          m: "auto",
          mb: 2,
        }}
        elevation={0}
      >
        <Box
          sx={{
            height: 120,
            backgroundImage: `url(${robook.cover_photo_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Box>
        {/* <CardContent
          sx={{
            pt: 0,
            pb: 0,
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}>
            
            <Avatar
              src={robook.main_photo_url}
              sx={(theme) => ({
                width: 107,
                height: 100,
                border: `2px solid ${theme.palette.background.paper}`,
                borderRadius: 2,
                mt: -6.3,
                mr: 2,
              })}
            />
          </Box>
        </CardContent> */}
      </Card>
    </Box>
  );
}
