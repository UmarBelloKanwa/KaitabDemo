"use client"

import React from "react";
import {
    Typography,
    Avatar,
    Box,
} from "@mui/material";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";



export default function ProfileInfo({ contentName, setContentName }: { contentName: string, setContentName: (str: string) => void }) {
    return (
        <Box sx={{ width: "100%", }}>
            {/* Profile Section */}
            <Box>
                {/* Profile Info */}
                <Box sx={{ px: 2, pb: 0 }}>
                    <Box
                        sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", m: "auto", mt: 1, mb: 2 }}
                    >
                        <Avatar
                            src="/atomic-habits.jpg"
                            sx={{
                                width: 107,
                                height: 100,
                                border: "2px solid black",
                                borderColor: "background.default",
                                borderRadius: 2,
                                m: "auto",
                            }}
                        >
                            Atomic
                        </Avatar>

                        <Box sx={{ width: "fit-content", m: "auto", textAlign: "center" }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5 }}>
                                Atomic Habits
                            </Typography>

                            <Typography variant="subtitle2" > Learn to change habits </Typography>
                            <Typography component="div" variant="caption" color="text.secondary" > By @jamesclear </Typography>
                            <Typography component="div" variant="caption" color="text.secondary" > Personal Development · 751K Followers </Typography>
                        </Box>
                        <Box sx={{ width: "fit-content", ml: 2, display: "flex", gap: 1, my: 1.5 }}>
                            <Button
                                variant={contentName == "Posts" ? "contained" : "outlined"}
                                size="small"
                                onClick={() => setContentName("Posts")}
                                sx={{
                                    px: 1.5,
                                    py: 0.5,
                                    fontSize: "0.75rem",
                                    borderRadius: 2
                                }}>
                                Posts
                            </Button>
                            <Button
                                variant={contentName == "Chapters" ? "contained" : "outlined"}
                                size="small"
                                onClick={() => setContentName("Chapters")}
                                sx={{
                                    px: 1.5,
                                    py: 0.5,
                                    fontSize: "0.75rem",
                                    borderRadius: 2

                                }}>
                                Chapters
                            </Button>
                            <Button
                                variant={contentName == "Messages" ? "contained" : "outlined"}
                                size="small"
                                onClick={() => setContentName("Messages")}
                                sx={{
                                    px: 1.5,
                                    py: 0.5,
                                    fontSize: "0.75rem",
                                    borderRadius: 2
                                }}>
                                Messages
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}