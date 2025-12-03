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
        sx={{ color: theme.palette.text.secondary, mb: 0.3, mt: 0.5 }}
      >
        Recents
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
                  borderRadius: 2,
                  "&:hover": { bgcolor: theme.palette.action.hover },
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    src={
                      item.type === "book"
                        ? item.main_photo_url || undefined
                        : item.profile_picture || undefined
                    }
                    sx={{
                      width: 25,
                      height: 25,
                      objectFit: "fill",
                      bgcolor: theme.palette.primary.main,
                      borderRadius: item.type === "book" ? 0.7 : 2,
                    }}
                  >
                    {item.name[0]}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  sx={{ color: theme.palette.text.primary }}
                  primaryTypographyProps={{ fontSize: "0.75rem", color: "grey" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}
