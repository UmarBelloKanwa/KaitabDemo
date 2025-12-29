"use client";

import React from "react";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { useRecent } from "@/lib/utils/storeRecent";

export default function RecentsItems({
  handleDrawerToggle,
  isMobile,
}: {
  handleDrawerToggle: () => void;
  isMobile: boolean;
}) {
  const theme = useTheme();
  const router = useRouter();
  const recentItems = useRecent();
  return (
    <>
      <Typography
        variant="caption"
        sx={{ color: theme.palette.text.secondary, mt: 0.5, pl: 2 }}
      >
        Your chats
      </Typography>

      {recentItems.length === 0 ? (
        <Typography variant="body2" sx={{ opacity: 0.6, pl: 2, py: 1 }}>
          Nothing here yet.
        </Typography>
      ) : (
        <List>
          {recentItems.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              onClick={() => {
                router.push(
                  item.type === "book" ? `/r/${item.slug}` : `/${item.handle}`
                );
                if (isMobile) {
                  handleDrawerToggle();
                }
              }}
            >
              <ListItemButton
                sx={{
                  borderRadius: 1,
                  "&:hover": { bgcolor: theme.palette.action.hover },
                }}
              >
                <ListItemText
                  primary={
                    item.name + "Title of text that can be used for one line"
                  }
                  sx={{
                    color: theme.palette.text.primary,
                    whiteSpace: "nowrap", // prevent wrapping
                    overflow: "hidden", // hide overflow
                    textOverflow: "ellipsis", // show "..." when text overflows
                  }}
                  primaryTypographyProps={{
                    fontSize: 14,
                    noWrap: true,
                   }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}
