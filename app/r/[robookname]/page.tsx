"use client"

import React from "react";
import RobookChat from "@/components/ui/robook/chat/RobookChat";
import ProfilePosts from "@/components/ui/robook/post/ProfilePosts";
import Container from "@mui/material/Container";
import Chapters from "@/components/ui/robook/chapter/Chapters";
import ProfileInfo from "@ui/robook/ProfileInfo";
import Box from '@mui/material/Box';
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
                maxWidth="lg" // keeps md width on large screens
                disableGutters
                sx={{
                    width: "100%", // ensures full width on mobile
                }}
            >

                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={1}>
                        <Grid size={{ xs: 12, sm: 7 }} sx={{
                            height: "100vh",
                            overflowY: "auto",
                        }}>
                            <Box
                                sx={(theme) => ({
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    maxWidth: { xs: "100%", sm: "100%" },
                                })}
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

                        <Grid size="grow" sx={{
                            height: "90vh",
                            overflowY: "auto",
                            display: { xs: "none", sm: "block", }
                        }}>
                            <RobookChat />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}
