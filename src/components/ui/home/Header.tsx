"use client";

import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import InputAdornment from "@mui/material/InputAdornment";
import { useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationIcon from "@mui/icons-material/NotificationsOutlined";
import IconButton from "@mui/material/IconButton";
import NotificationBox from "@/components/ui/home/NotificationBox";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import useNotifications from "@/hooks/home/useNotification";
import useAuthCheck from "@/hooks/auth/useAuthCheck";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";


export default function Header() {
  const theme = useTheme();
  const requireAuth = useAuthCheck();
  const router = useRouter();

  const notificationActions = useNotifications();
  const [notificationAnchor, setNotificationAnchor] =
    React.useState<HTMLDivElement | null>(null);
  const boxRef = React.useRef<HTMLDivElement | null>(null);

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleNotificationClick = () => {
    requireAuth(() => {
      setNotificationAnchor(boxRef.current);
    });
  };
  const unreadCount = notificationActions.unreadCount;

  return (
    <AppBar
      position="static"
      variant="elevation"
      elevation={0}
      sx={{
        borderRight: "none",
        backgroundColor: "background.default",
        display: { xs: "flex", md: "none" },
      }}
    >
      <Toolbar sx={{
        justifyContent: "space-between", gap: 2, p: 0,
      }}>
        <Box
          ref={boxRef}
          sx={{
            display: { xs: "flex", md: "none" },
            gap: 2,
            width: "100%",
            m: "auto",
            mt: -2,
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            placeholder="Search"
            size="small"
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              disableUnderline: true, // Also removes underline for standard variant
            }}
            sx={(theme) => ({
              width: { xs: "100%", sm: "40%", md: "100%" }, // full width on xs
              boxSizing: "border-box", // ensure padding + border don't exceed width
              bgcolor: "background.paper",
              borderRadius: 2,
              p: 1,
              px: 2,
              m: { xs: "auto" },
              mt: 0,
            })}
          />
          <Badge badgeContent={unreadCount} color="error">
            <Avatar
              sx={{ bgcolor: "background.paper", backdropFilter: "blur(10px)" }}
            >
              <IconButton
                size="large"
                aria-label="show notifications"
                onClick={handleNotificationClick}
              >
                <NotificationIcon />
              </IconButton>
            </Avatar>
          </Badge>
        </Box>
      </Toolbar>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <NotificationBox
          notificationAnchor={notificationAnchor}
          handleNotificationClose={handleNotificationClose}
          notificationActions={notificationActions}
        />
      </Box>
    </AppBar>
  );
}
