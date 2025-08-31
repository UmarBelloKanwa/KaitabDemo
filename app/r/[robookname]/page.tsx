"use client"

import {
    Typography,
    Avatar,
    Box,
    Grid,
    Divider,
} from "@mui/material";
import AskInput from "@ui/AskInput";
import ChatInterface from "@ui/ChatInterface";
import RobookProfile from "@ui/RobookProfile";


export default function ProfilePage() {
    return (
        <Grid container sx={{ width: "100%", minHeight: "89.5vh", }}>

            {/* Profile Content */}
            <Grid size={{ xs: 12, md: "grow" }}>
                <RobookProfile />
            </Grid>

            {/* Right Sidebar */}
            <Divider
                orientation="vertical"
                flexItem
            />

            {/* Chat Content */}
            <Grid
                size={{ xs: 12, md: 5.5 }}
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100%",
                    position: "relative"
                }}>
                <Box sx={{ width: "100%", }}>

                    {/* Profile Section */}
                    <Box>
                        {/* Profile Info */}
                        <Box sx={{ px: 2, pb: 2 }}>
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
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ flex: 1, overflowY: "auto", p: 1, pt: 0, pb: 2, }}>
                    <ChatInterface />
                </Box>
                <Box sx={{ px: 2, py: 1, position: "sticky", bottom: 0, bgcolor: "background.default", }}>
                    <AskInput borderRadius={1.5} />
                </Box>
            </Grid>

        </Grid>
    )
}
