"use client";

import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";



export default function RobookLayout({ children }: { children: React.ReactNode }) {
    return (
        <Box sx={{ minHeight: "100vh", width: "100%", }}>
            {/* Header */}
            <AppBar
                elevation={0}
                position="sticky"
                sx={{
                    bgcolor: "background.default",
                    borderBottom: "1px solid grey",
                    borderColor: "divider",
                    display: { xs: "none", sm: "block" },
                }} >
                <Toolbar>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Avatar src="/atomic-habits.jpg" sx={{ width: 37, height: 37, borderRadius: 1 }}> Atomic Habits </Avatar>
                        <Box sx={{ flex: 1, minWidth: 0, gap: 0.5, display: "flex", flexDirection: "column", }}>
                            <Typography variant="body2" sx={{ color: "text.primary" }}>
                                Atomic Habits
                            </Typography>
                            <Typography variant="caption" sx={{ color: "text.secondary", mt: -1 }}>
                                By @jamesclear
                            </Typography>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
            {children}
        </Box>
    )
}