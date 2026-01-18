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
import { useRecent } from "@/lib/utils/storeRecent";
import { navigateToSubdomain } from "@/lib/utils/navigate";

export default function RecentsItems({
  handleDrawerToggle,
  isMobile,
}: {
  handleDrawerToggle: () => void;
  isMobile: boolean;
}) {
  const theme = useTheme();
  const recentItems = useRecent();

  return (
    <>
      <Typography
        variant="caption"
        sx={{
          color: theme.palette.text.secondary,
          mb: 0.3,
          mt: 0.5,
          pl: 2,
        }}
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
                navigateToSubdomain(`/${item.handle}`);

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
                    src={item.profile_picture || undefined}
                    sx={{
                      width: 25,
                      height: 25,
                      bgcolor: theme.palette.primary.main,
                      borderRadius: 2,
                    }}
                  >
                    {item.name?.[0]}
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    fontSize: "0.75rem",
                    color: theme.palette.text.primary,
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
