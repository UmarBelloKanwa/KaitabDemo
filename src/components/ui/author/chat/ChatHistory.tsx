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
import type { ChatSessionSummary } from "@/types/cortex";
import { getAllChatsSession } from "@/lib/api/cortex";

export default function RecentsItems({
  authorHandle,
  handleDrawerToggle,
  isMobile,
}: {
  authorHandle: string;
  handleDrawerToggle: () => void;
  isMobile: boolean;
}) {
  const [chats, setChats] = React.useState([]);
  const theme = useTheme();
  const router = useRouter();
  const recentItems = useRecent();

  React.useEffect(() => {
    async function getChats() {
      try {
        const data = await getAllChatsSession(authorHandle);
        setChats(data);
      } catch (err) {
        console.log(err);
      }
    }
    getChats();
  }, []);
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
          {chats.map((item: ChatSessionSummary, index) => (
            <ListItem
              key={index}
              disablePadding
              onClick={() => {
                router.push(`/chat/${item.session_id}`);
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
                  primary={item.last_message}
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
