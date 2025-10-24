"use client";

import React from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { useTheme, useMediaQuery } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/PeopleOutlineOutlined";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import LocalLibraryIcon from "@mui/icons-material/LocalLibraryOutlined";
import { useRouter } from "next/navigation";
import useAuthCheck from "@/hooks/auth/useAuthCheck";

const drawerWidth = 280;
const collapsedWidth = 64; // Width when collapsed (just icon)

export default function Sidebar() {
  const requireAuth = useAuthCheck();

  const companyName = "Sprem";

  const theme = useTheme();
  const router = useRouter();

  const navItems = [
    { name: "Discover", icon: <HomeIcon />, onClick: () => router.push("/") },
    {
      name: "Authors",
      icon: <PersonIcon />,
      onClick: () => router.push("/authors"),
    },
    {
      name: "Robooks",
      icon: <LocalLibraryIcon />,
      onClick: () => router.push("/robooks"),
    },
  ];

  const recentChats = [
    { name: "Atomic Habits", avatar: "/atomic-habits.jpg" },
    { name: "Hal Elrod", avatar: "/hal-elrod.jpg" },
    { name: "James Clear", avatar: "/james-clear.jpg" },
  ];

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  //console.log("Is mobile", isMobile)
  const drawerVariant = isMobile ? "temporary" : "permanent";
  const open = isMobile ? false : true;

  const [sidebarOpen, setSidebarOpen] = React.useState(open);

  const handleDrawerToggle = () => {
    if (!isMobile) {
      return;
    }
    setSidebarOpen((prev) => !prev);
  };

  React.useEffect(() => {
    setSidebarOpen(!isMobile); // auto-sync with screen size
  }, [isMobile]);

  if (!sidebarOpen) {
    return (
      <Box
        sx={{
          pl: { sm: 2, xs: 2.5 },
          pr: { sm: "unset", xs: 2.5 },
          pt: 1.5,
          pb: { xs: 1, sm: "unset" },
          height: "fit-content",
          display: "flex",
          alignItems: "center",
          gap: { xs: 2, sm: 0 },
          justifyContent: "space-arround",
        }}
      >
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            borderRadius: 2,
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          color="text.primary"
          sx={{ m: 0, cursor: "pointer", display: { xs: "block", sm: "none" } }}
          onClick={() => router.push("/")}
        >
          {companyName}
        </Typography>
      </Box>
    );
  }

  return (
    <Drawer
      variant={drawerVariant}
      open={isMobile ? sidebarOpen : true}
      onClose={handleDrawerToggle}
      sx={{
        width: sidebarOpen ? drawerWidth : 0,
        flexShrink: 0,
        //border: "none",
        "& .MuiDrawer-paper": {
          // border: "none",

          width: drawerWidth,
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
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          px: 3,
          pt: 2.5,
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              color="text.primary"
              sx={{ m: 0 }}
              onClick={() => router.push("/")}
            >
              {companyName}
            </Typography>
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                display: { xs: "block", md: "none" },
                color: theme.palette.text.primary,
              }}
            >
              <ChevronLeft />
            </IconButton>
          </Box>
        </Box>

        {/* Create Button */}
        <Box>
          <Button
            fullWidth
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              textTransform: "none",
              borderRadius: 2,
            }}
            onClick={() => {
              requireAuth(() => {
                router.push("/publish"); // navigate
                if (isMobile) {
                  // only auto-close on mobile
                  handleDrawerToggle();
                }
              });
            }}
          >
            Publish
          </Button>
        </Box>

        {/* Navigation */}
        <Box sx={{ flex: 1, px: 0 }}>
          <List>
            {navItems.map((item, index) => (
              <ListItem
                key={index}
                disablePadding
                onClick={() => {
                  item.onClick(); // navigate
                  if (isMobile) {
                    // only auto-close on mobile
                    handleDrawerToggle();
                  }
                }}
              >
                <ListItemButton
                  sx={{
                    borderRadius: 2,
                    mb: 0.3,
                    "&:hover": { bgcolor: theme.palette.action.hover },
                  }}
                >
                  <ListItemIcon
                    sx={{ color: theme.palette.text.primary, minWidth: 36 }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                    sx={{ color: theme.palette.text.primary }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Typography
            variant="subtitle2"
            sx={{ color: theme.palette.text.secondary, mb: 1, mt: 3 }}
          >
            Recents
          </Typography>
          <List>
            {recentChats.map((chat, index) => (
              <ListItem
                key={index}
                disablePadding
                onClick={() => {
                  router.push(index === 0 ? "/r/atomic-habits" : "/jamesclear");
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
                      src={chat.avatar}
                      sx={{
                        width: 30,
                        height: 30,
                        bgcolor: theme.palette.primary.main,
                        borderRadius: index === 0 ? 0.7 : 2,
                      }}
                    >
                      {chat.name[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={chat.name}
                    sx={{ color: theme.palette.text.primary }}
                    primaryTypographyProps={{ fontSize: "0.875rem" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* User Profile */}
        <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar
              sx={{
                bgcolor: theme.palette.primary.main,
                width: 32,
                height: 32,
              }}
            >
              U
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.primary, fontWeight: 500 }}
              >
                Umar Bello Kanwa
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: theme.palette.text.secondary }}
              >
                @UmarBelloKanwa
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
