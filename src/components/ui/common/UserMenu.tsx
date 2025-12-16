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
} from "@mui/material";
import {
  Person,
  Settings,
  Description,
  Logout,
  ExpandMore,
} from "@mui/icons-material";
import { useState, type MouseEvent } from "react";
import useAuthCheck from "@/hooks/auth/useAuthCheck";
import FeedbackIcon from "@mui/icons-material/Feedback";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UserMenuPopupProps {
  user: any;
}

export default function UserMenuPopup({ user }: UserMenuPopupProps) {
  const isAuthor = !!user?.author;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const requireAuth = useAuthCheck();

  const router = useRouter();

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
      icon: FeedbackIcon,
      onClick: () => {
        router.push("/support");
      },
    },
    {
      label: "Logout",
      icon: Logout,
      onClick: () => {},
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
    </Box>
  );
}
