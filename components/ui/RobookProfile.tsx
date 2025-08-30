"use client";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function RobookProfile() {
    return (
        <Box sx={{ width: "100%", }}>
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
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, width: "fit-content", m: "auto", }}>
                    <Button variant="contained" sx={{p: 1, fontSize: "small"}}> Post </Button>
                    <Button variant="contained" sx={{p: 1, fontSize: "small"}}> Chat </Button>
                </Box>
            </Box>
        </Box>
    )
}