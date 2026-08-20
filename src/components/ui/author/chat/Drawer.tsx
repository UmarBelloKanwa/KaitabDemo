"use client";

import React from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled, useTheme, useMediaQuery } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useRouter } from "next/navigation";
import ArticleIcon from "@mui/icons-material/ArticleOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MoreVertIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import ChatHistory from "./ChatHistory";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import type { Author } from "@/types/author";
import Avatar from "@mui/material/Avatar";
import UserDisplay from "./UserDisplay";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { getAuthorPath } from "@/lib/utils/navigate";

const drawerWidth = 280;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  //gap: 1,
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const navItems = [
  {
    name: "New chat",
    icon: ChatBubbleOutlineIcon,
    link: "/chat",
  },

  {
    name: "Library",
    icon: ArticleIcon,
    link: "/library",
  },

  {
    name: "About",
    icon: InfoOutlinedIcon,
    link: "/about",
  },
];

const HIDE_DRAWER_ROUTES = ["subscribe"];

export default function ChatSidebar({ author, handle }: { author: Author, handle: string }) {
  const pathname = usePathname();
  const theme = useTheme();
  const queryClient = useQueryClient();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const user = queryClient.getQueryData(["user"]);

  const handleDrawerToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  const hideDrawer = HIDE_DRAWER_ROUTES.some(
    (route) => pathname === `/${route}` || pathname.startsWith(`/${route}/`)
  );

  if (hideDrawer) {
    return <></>;
  }

  if (!sidebarOpen) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: { md: 5, xs: 50 },
          left: { md: drawerWidth, xs: 0 },
          right: 0,
          zIndex: 1200,
        }}
      >
        <Box
          sx={{
            px: 1.5,
            width: "fit-content",
            height: "fit-content",
          }}
        >
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              borderRadius: 2,
              width: "fit-content",
              height: "fit-content",
              bgcolor: theme.palette.background.paper,
              p: 0.9,
              color: theme.palette.text.primary,
            }}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>
    );
  }


  return (
    <Drawer
      variant={"persistent"}
      open={sidebarOpen}
      onClose={handleDrawerToggle}
      sx={{
        width: sidebarOpen ? drawerWidth : 0,
        flexShrink: 0,
        bgcolor: "transparent",
        //left: { md: drawerWidth },
        "& .MuiDrawer-paper": {
          //  border: "none",
          width: drawerWidth,
          left: { md: drawerWidth },
          boxSizing: "border-box",
          bgcolor: "background.default", // theme key; same result on both variants
          backgroundImage: "none", // kill dark-mode overlay
        },
      }}
      elevation={0}
      ModalProps={{
        keepMounted: true, // optional: better mobile performance
      }}
    >
      <ClickAwayListener
        onClickAway={() => {
          setSidebarOpen(false);
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            px: 0.7,
            height: "100%",
          }}
        >
          <DrawerHeader>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Avatar
                src={author?.profile_picture}
                sx={{
                  width: 40,
                  height: 40,
                  objectFit: "cover",
                }}
              />
              <Box>
                <Typography variant="h6" fontSize="small">
                  Cortex
                </Typography>
                <Typography variant="caption" color="grey" fontSize="x-small">
                  A Safe Personalized AI Companion
                </Typography>
              </Box>
            </Box>
            <Box sx={{ flex: 1 }}></Box>
            <IconButton
              size="small"
              onClick={() => setSidebarOpen(false)}
              sx={{
                border: "2px solid",
                borderColor: "divider",
                p: 0,
              }}
            >
              <ChevronLeftIcon fontSize="small" />
            </IconButton>
          </DrawerHeader>
          <Divider />

          {/* Navigation */}
          <Box sx={{ flex: 1, px: 0 }}>
            <List>
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <ListItem
                    key={index}
                    disablePadding
                    onClick={() => {
                      router.push(getAuthorPath(author.handle, item.link, pathname));
                      if (isMobile) {
                        // only auto-close on mobile
                        handleDrawerToggle();
                      }
                    }}
                  >
                    <ListItemButton
                      sx={{
                        borderRadius: 2,
                        mb: 0,
                        "&:hover": { bgcolor: theme.palette.action.hover },
                        gap: 0,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: theme.palette.text.primary,
                          minWidth: 36,
                          "& svg": {
                            fontSize: 18, // reduce icon size
                          },
                        }}
                      >
                        <Icon />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        primaryTypographyProps={{
                          fontSize: 14, // smaller font size
                          fontWeight: 500, // optional: adjust weight
                        }}
                        sx={{ color: theme.palette.text.primary, ml: -1 }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
            <Box>
              <ChatHistory
                authorHandle={author.handle}
                handleDrawerToggle={handleDrawerToggle}
                isMobile={isMobile}
              />
            </Box>
          </Box>
          <Box>
            {/* User Profile */}
            <UserDisplay
              user={user}
              handle={handle}
              handleDrawerToggle={() => {
                // only auto-close on mobile
                handleDrawerToggle();
              }}
            />
          </Box>
        </Box>
      </ClickAwayListener>
    </Drawer>
  );
}
