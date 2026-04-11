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
import ExploreIcon from '@mui/icons-material/Explore';
import { usePathname } from "next/navigation";
import HIDE_DRAWER_ROUTES from "@data/HIDE_DRAWER_ROUTES";
import { navigateToRoot } from "@/lib/utils/navigate";
import { parse } from "tldts";

import "./drawer.css";

const drawerWidth = 280;

export default function Sidebar({ user, host }: { user: any; host: string }) {
  const requireAuth = useAuthCheck();
  const pathname = usePathname();
  const [showMobileNav, setShowMobileNav] = React.useState(true);
  const lastScrollY = React.useRef(0);
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const logoSrc = "/app/logo.png";

  const companyName = "Feedple";

  const router = useRouter();
  const drawerVariant = isMobile ? "temporary" : "permanent";
  const open = isMobile ? false : true;

  const [sidebarOpen, setSidebarOpen] = React.useState(open);

  const navItems = [
    { name: "Discover", icon: ExploreIcon, onClick: () => navigateToRoot("/home") },
    // {
    //   name: "Feeds",
    //   icon: ArticleIcon,
    //   onClick: () => navigateToRoot("/feeds"),
    // },
  ];

  //console.log("Is mobile", isMobile)

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

  const hostname = host.split(":")[0]; // remove port
  const parsed = parse(hostname);
  const isSubdomain = Boolean(parsed.subdomain);
  const isRootDomain = !parsed.subdomain && hostname !== `www.${parsed.domain}`;

  const hideByRoute =
    HIDE_DRAWER_ROUTES.some(
      (route) => pathname === `/${route}` || pathname.startsWith(`/${route}/`),
    ) && isRootDomain; // this is for non subdomain routes

  //console.log("isRootDomain", isRootDomain);
  
  const isRootHome = isRootDomain && pathname === "/";

  const hideDrawer = isRootHome || hideByRoute;

  React.useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        // Always show near top
        setShowMobileNav(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling DOWN
        setShowMobileNav(false);
      } else {
        // Scrolling UP
        setShowMobileNav(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  //  if (!user && pathname === "/") {
  //   return <></>
  // }

  if (hideDrawer) {
    return <></>;
  }

  return (
    <>
      <div
        className="short-nav"
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
          transform: showMobileNav ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s ease",
        }}
      >
        <Box
          sx={{
            // pr: { sm: "unset", xs: 2.5 },
            // pt: 1.5,
            bgcolor: "background.default",
            px: 2,
            pt: 1,
            width: "100%",
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
          <Box
            sx={{
              flex: 1,
            }}
          >
            <Box
              component="img"
              alt="Feedple"
              src={"/app/logo-name.png"}
              onClick={handleDrawerToggle}
              sx={{
                width: "125px",
                height: "100%",
                objectFit: "contain",
                verticalAlign: "text-button",
                mb: -1,
              }}
            />
          </Box>
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
                      width: "50%",
                      height: "70%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Box>
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
                    navigateToRoot("/publish"); // navigate
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
                            color: "rgba(255, 255, 255, 0.7)",
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
              <Box sx={{ display: { xs: "block", sm: "block", md: "noe" } }}>
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
