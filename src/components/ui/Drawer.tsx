"use client";

import React from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useTheme, useMediaQuery } from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import { useRouter } from "next/navigation";
import useAuthCheck from "@/hooks/auth/useAuthCheck";
import RecentItems from "./RecentItems";
import UserDisplay from "./UserDisplay";
import ArticleIcon from "@mui/icons-material/ArticleOutlined";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import { usePathname } from "next/navigation";
import "./drawer.css";

const drawerWidth = 280;

export default function Sidebar({ user }: { user: any }) {
  const requireAuth = useAuthCheck();
  const pathname = usePathname();

  const logoSrc = "/app/logo-name.png";
  const companyName = "Feedple";

  const theme = useTheme();
  const router = useRouter();

  const navItems = [
    { name: "Home", icon: HomeIcon, onClick: () => router.push("/") },
    {
      name: "Creators",
      icon: RecordVoiceOverOutlinedIcon,
      onClick: () => router.push("/creators"),
    },
    {
      name: "Contents",
      icon: ArticleIcon,
      onClick: () => router.push("/contents"),
    },
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
    if (isMobile) {
      document.querySelector(".nav-box")?.classList.add("show");
    }
  }, [isMobile]);

  const hideDrawer =
    pathname.startsWith("/publish") || pathname.startsWith("/upgrade");

  if (hideDrawer) {
    return <></>;
  }

  // React.useEffect(() => {
  //   if (sidebarOpen) {
  //     document.querySelector(".short-nav")?.classList.add("show");
  //   } else {
  //     document.querySelector(".short-nav")?.classList.remove("show");
  //   }
  // }, [sidebarOpen]);

  return (
    <>
      <div className="short-nav">
        <Box
          sx={{
            pl: { sm: 2, xs: 2.5 },
            pr: { sm: "unset", xs: 2.5 },
            pt: 1.5,
            pb: { xs: 1, sm: "unset" },
            height: "fit-content",
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            justifyItems: "centre",
            gap: { xs: 1.5, sm: 0 },
            justifyContent: "space-arround",
          }}
        >
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              borderRadius: 2,
              bgcolor: theme.palette.background.paper,
              p: 0.9,
              color: theme.palette.text.primary,
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              width: "38%",
              height: "100%",
              mb: -1,
            }}
          >
            <img
              src={logoSrc}
              alt="App Logo"
              onClick={handleDrawerToggle}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>

          {/* <Typography
          variant="h6"
          color="text.primary"
          sx={{ m: 0, cursor: "pointer", display: { xs: "block", sm: "none" } }}
          onClick={() => router.push("/")}
        >
          {companyName}
        </Typography> */}
        </Box>
      </div>

      <div className="nav-box">
        <Drawer
          variant={drawerVariant}
          open={isMobile ? sidebarOpen : true}
          onClose={handleDrawerToggle}
          sx={{
            width: sidebarOpen ? drawerWidth : 0,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
            //  border: "none",
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
            <Box sx={{ mb: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.2,
                  width: "fit-content",
                  my: 1,
                }}
              >
                <Box
                  sx={{
                    width: { xs: "53%", sm: "53%", md: "50%" },
                    height: "100%",
                  }}
                >
                  <img
                    src={logoSrc}
                    alt="App Logo"
                    onClick={() => router.push("/")}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Box>

              {/* <Box
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
          </Box> */}
            </Box>

            {/* Create Button */}
            <Box>
              <Button
                fullWidth
                variant="contained"
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
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
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
                          mb: 0,
                          "&:hover": { bgcolor: theme.palette.action.hover },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            color: theme.palette.text.primary,
                            minWidth: 36,
                          }}
                        >
                          <Icon />
                        </ListItemIcon>
                        <ListItemText
                          primary={item.name}
                          sx={{ color: theme.palette.text.primary }}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
              <Box sx={{ display: { xs: "block", sm: "block", md: "none" } }}>
                <RecentItems
                  handleDrawerToggle={handleDrawerToggle}
                  isMobile={isMobile}
                />
              </Box>
            </Box>

            {/* User Profile */}
            <UserDisplay
              user={user}
              handleDrawerToggle={() => {
                if (isMobile) {
                  // only auto-close on mobile
                  handleDrawerToggle();
                }
              }}
            />
          </Box>
        </Drawer>
      </div>
    </>
  );
}
