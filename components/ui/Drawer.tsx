"use client";

import React from "react";
import {
    Drawer,
    Box,
    Typography,
    Button,
    Avatar,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListItemAvatar,
    useTheme,
} from "@mui/material";
import { Add, ChevronLeft, Menu } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/PersonOutlineSharp";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import LocalLibraryIcon from "@mui/icons-material/LocalLibraryOutlined";
import { useRouter } from "next/navigation";

const drawerWidth = 280;
const collapsedWidth = 64; // Width when collapsed (just icon)

export default function Sidebar({
    isMobile,
    sidebarOpen,
    handleDrawerToggle,
}: {
    isMobile: boolean;
    sidebarOpen: boolean;
    handleDrawerToggle: () => void;
}) {
    const theme = useTheme();
    const router = useRouter();

    const navItems = [
        { name: "Discover", icon: <HomeIcon />, onClick: () => router.push('/') },
        { name: "Authors", icon: <PersonIcon />, onClick: () => router.push("/authors") },
        { name: "Robooks", icon: <LocalLibraryIcon />, onClick: () => router.push("/robooks") },
    ];

    const recentChats = [
        { name: "Atomic Habits", avatar: "/atomic-habits.jpg", },
        { name: "Hal Elrod", avatar: "/hal-elrod.jpg", },
        { name: "James Clear", avatar: "/james-clear.jpg" },
    ];


    if (!sidebarOpen) {
        if (isMobile) {
            return (
                <Box sx={{ px: 2.5, pt: 1.5, display: "flex", alignItems: "center", gap: 2, justifyContent: "space-arround" }}>
                    <IconButton
                        onClick={handleDrawerToggle}
                        sx={{
                            borderRadius: 1,
                            bgcolor: theme.palette.background.paper,
                            color: theme.palette.text.primary,
                        }}
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" color="text.primary" sx={{ m: 0 }} onClick={() => router.push('/')}>
                        Kaitab
                    </Typography>
                </Box>
            )
        }

        return (
            <Box
                sx={{
                    width: collapsedWidth,
                    height: { xs: "fit-content", sm: "100vh" },
                    bgcolor: theme.palette.background.default,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "start",
                    py: 2.5,
                }}
            >
                <IconButton
                    onClick={handleDrawerToggle}
                    sx={{ color: theme.palette.text.primary }}
                >
                    <Menu />
                </IconButton>
            </Box>
        );
    }

    return (
        <Drawer
            variant={isMobile ? "temporary" : "persistent"}
            open={sidebarOpen}
            onClose={handleDrawerToggle}
            sx={{
                width: sidebarOpen ? drawerWidth : 0,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    bgcolor: "background.default",      // theme key; same result on both variants
                    backgroundImage: "none",            // kill dark-mode overlay
                },
            }}
            elevation={0}
            ModalProps={{
                keepMounted: true, // optional: better mobile performance
            }}

        >
            <Box sx={{ height: "100%", display: "flex", flexDirection: "column", px: 3, pt: 2.5 }}>
                {/* Header */}
                <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography variant="h6" color="text.primary" sx={{ m: 0 }} onClick={() => router.push('/')}>
                            Kaitab
                        </Typography>
                        <IconButton onClick={handleDrawerToggle} sx={{ color: theme.palette.text.primary }}>
                            <ChevronLeft />
                        </IconButton>
                    </Box>
                </Box>

                {/* Create Button */}
                <Box>
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<Add />}
                        sx={{
                            textTransform: "none",
                            borderRadius: 2,
                        }}
                        onClick={() => router.push('/publish')}
                    >
                        Publish
                    </Button>
                </Box>

                {/* Navigation */}
                <Box sx={{ flex: 1, px: 0 }}>
                    <List>
                        {navItems.map((item, index) => (
                            <ListItem key={index} disablePadding onClick={item.onClick}>
                                <ListItemButton
                                    sx={{
                                        borderRadius: 2,
                                        mb: 0.3,
                                        "&:hover": { bgcolor: theme.palette.action.hover },
                                    }}
                                >
                                    <ListItemIcon sx={{ color: theme.palette.text.primary, minWidth: 36 }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.name} sx={{ color: theme.palette.text.primary }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary, mb: 1, mt: 3 }}>
                        Recents
                    </Typography>
                    <List>
                        {recentChats.map((chat, index) => (
                            <ListItem key={index} disablePadding>
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
                                                width: 30, height: 30,
                                                bgcolor: theme.palette.primary.main,
                                                borderRadius: index == 0 ? 0.7 : 2,
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
                        <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 32, height: 32 }}>U</Avatar>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography variant="body2" sx={{ color: theme.palette.text.primary, fontWeight: 500 }}>
                                Umar Bello Kanwa
                            </Typography>
                            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                                @UmarBelloKanwa
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Drawer>
    );
}
