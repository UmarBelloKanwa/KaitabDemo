"use client"

import React from "react";
import RobookChat from "@/components/ui/robook/chat/RobookChat";
import ProfilePosts from "@/components/ui/robook/post/ProfilePosts";
import Container from "@mui/material/Container";
import Chapters from "@/components/ui/robook/chapter/Chapters";
import ProfileInfo from "@ui/robook/profileInfo";

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';



export default function ProfilePage() {
    const [contentName, setContentName] = React.useState("Posts");
    return (
        <Box
            sx={{
                width: "100%",  // full width container
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}
        >
            <Container
                maxWidth="md" // keeps md width on large screens
                disableGutters
                sx={{
                    width: "100%", // ensures full width on mobile
                }}
            >

                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid size={8}>
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    position: "relative",
                                }}
                            >
                                <ProfileInfo
                                    contentName={contentName}
                                    setContentName={setContentName}
                                />
                                {contentName == "Posts" && <ProfilePosts />}
                                {contentName == "Messages" && <RobookChat />}
                                {contentName == "Chapters" && <Chapters />}
                            </Box>
                        </Grid>
                        <Grid size={4}>
<RobookChat />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}
