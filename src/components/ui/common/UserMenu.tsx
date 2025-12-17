"use client";

import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popover,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import {
  ExpandMore,
} from "@mui/icons-material";
import { WarningAmber } from "@mui/icons-material";
import { useState, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { logout } from "@/lib/api/auth";
import { useQueryClient } from "@tanstack/react-query";
import Settings from '@mui/icons-material/SettingsOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import Logout from '@mui/icons-material/LogoutOutlined';
interface UserMenuPopupProps {
  user: any;
}

export default function UserMenuPopup({ user }: UserMenuPopupProps) {
  const isAuthor = !!user?.author;
  const queryClient = useQueryClient();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openDialog, setOpenDialog] = useState(false); // For logout confirmation

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const router = useRouter();

  const confirmLogout = async () => {
    try {
      await logout();
      queryClient.clear();
      localStorage.clear();
      sessionStorage.clear();
      if (window.indexedDB && indexedDB.databases) {
        const databases = await indexedDB.databases();
        for (const db of databases) {
          if (db.name) indexedDB.deleteDatabase(db.name);
        }
      }
      router.refresh();
    } catch (err) {
      console.error(err);
    }
    setOpenDialog(false);
  };

  const menuItems = [
    ...(isAuthor
      ? [
          {
            label: "Settings",
            icon: Settings,
            onClick: () => {
              router.push("/settings");
            },
          },
        ]
      : []),
    {
      label: "Support",
      icon: ContactSupportOutlinedIcon,
      onClick: () => {
        router.push("/support");
      },
    },
    {
      label: "Logout",
      icon: Logout,
      onClick: () => setOpenDialog(true),
    },
    {
      label: "Feedback",
      icon: FeedbackOutlinedIcon,
      onClick: () => {
        router.push("/feedback");
      },
    },
  ];

  return (
    <Box>
      {/* Trigger Button */}
      <IconButton
        onClick={handleClick}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1.5,
          p: 0,
          borderRadius: 2,
          "&:hover": {
            bgcolor: "action.hover",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            minWidth: 0,
            flex: 1,
          }}
        >
          <Avatar
            src={isAuthor ? user?.author?.profile_picture : undefined}
            sx={(theme) => ({
              bgcolor: theme.palette.primary.main,
              borderRadius: 2,
              width: 41,
              height: 41,
            })}
          >
            {isAuthor
              ? user?.author?.name.charAt(0).toUpperCase()
              : user?.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              minWidth: 0,
            }}
          >
            <Typography
              variant="body2"
              fontWeight={600}
              sx={{
                color: "text.primary",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "100%",
              }}
            >
              {isAuthor ? user?.author?.name : user?.name}
            </Typography>
            {isAuthor && (
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  width: "100%",
                }}
              >
                @{user?.author?.handle}
              </Typography>
            )}
          </Box>
        </Box>
        <ExpandMore
          sx={{
            transition: "transform 0.2s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            color: "text.secondary",
          }}
        />
      </IconButton>

      {/* Popup Menu */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            sx: {
              width: anchorEl?.offsetWidth || 250,
              mt: -1.5,
            },
          },
        }}
      >
        <Paper variant="outlined" elevation={0}>
          <List sx={{ p: 0.5 }}>
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <ListItemButton
                  LinkComponent={Link}
                  key={index}
                  onClick={() => {
                    item.onClick?.();
                    handleClose();
                  }}
                  sx={{
                    borderTop: item.label == "Support" ? "1px solid" : "none",
                    borderColor: "divider",
                    px: 1.5,
                    py: 1,
                    "&:hover": {
                      borderRadius: 1.3,
                    },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      variant: "caption",
                    }}
                  />
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <Icon sx={{ fontSize: 15, color: "text.secondary" }} />
                  </ListItemIcon>
                </ListItemButton>
              );
            })}
          </List>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              p: 1,
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            {[
              { name: "About", link: "/about" },
              { name: "Policies", link: "/terms" },
              { name: "Privacy", link: "/privacy" },
            ].map((prop, index) => (
              <Typography
                component={Link}
                href={prop.link}
                variant="caption"
                key={index}
                fontSize="x-small"
                color="grey"
              >
                {prop.name}
              </Typography>
            ))}
          </Box>
        </Paper>
      </Popover>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="xs"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              border: "1px solid red",
              borderColor: "grey.800",
              borderRadius: 2, // optional: rounded corners
              p: { xs: 0, md: 1 },
            },
            elevation: 0,
          },
        }}
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={1}>
            <WarningAmber sx={{ color: "warning.main" }} />
            <Typography color="warning.main">Warning</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out? This will{" "}
            <strong>clear your session and all local data</strong>.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button color="warning" variant="contained" onClick={confirmLogout}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
