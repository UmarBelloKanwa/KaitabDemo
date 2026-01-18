"use client";

import React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { useRecent } from "@/lib/utils/storeRecent";
import type { ChatSessionSummary } from "@/types/cortex";
import { getAllChatsSession } from "@/lib/api/cortex";
import { useQuery } from "@tanstack/react-query";

export default function RecentsItems({
  authorHandle,
  handleDrawerToggle,
  isMobile,
}: {
  authorHandle: string;
  handleDrawerToggle: () => void;
  isMobile: boolean;
}) {
  const theme = useTheme();
  const router = useRouter();
  const recentItems = useRecent();

  const { data: chats = [], isLoading } = useQuery({
    queryKey: ["chatSessions", authorHandle],
    queryFn: () => getAllChatsSession(authorHandle),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return (
    <>
      <Typography
        variant="caption"
        sx={{ color: theme.palette.text.secondary, mt: 0.5, pl: 2 }}
      >
        Your chats
      </Typography>
      {isLoading ? (
        <Typography variant="body2" sx={{ opacity: 0.6, pl: 2, py: 1 }}>
          Loading...
        </Typography>
      ) : chats.length === 0 ? (
        <Typography variant="body2" sx={{ opacity: 0.6, pl: 2, py: 1 }}>
          Nothing here yet.
        </Typography>
      ) : (
        <List
          sx={{
            maxHeight: 320,
            overflowY: "auto",
            padding: 0,
          }}
        >
          {chats.map((item: ChatSessionSummary, index: number) => (
            <ListItem
              key={item.session_id} // ✅ use stable key
              disablePadding
              onClick={() => {
                router.push(`/chat/${item.session_id}`);
                if (isMobile) handleDrawerToggle();
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
