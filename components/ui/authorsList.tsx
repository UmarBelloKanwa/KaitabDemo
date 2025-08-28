"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import Button from "@mui/material/Button";


export default function RobooksLists() {

    const whoToFollow = [
        {
            name: "James Clear",
            handle: "@jamesclear",
            avatar: "/james-clear.jpg",
            isVerified: true,
        },
        { name: "Hal Elrod", handle: "@halelrod", avatar: "/hal-elrod.jpg", isVerified: true },
        { name: "Stephen King", handle: "@stephenking", avatar: "/stephen-king.jpg", isVerified: true },
        {
            name: "Brian Tracy",
            handle: "@briantracy",
            avatar: "/brian-tracy.jpg",
            isVerified: true,
        },
        { name: "Joanne Rowling", handle: "@joannerowling", avatar: "/joanne-rowling.jpg", isVerified: true },
        { name: "Ernest Hemingway.", handle: "@ernesthemingway", avatar: "/ernest-hemingway.jpg", isVerified: true },

    ]

    return (
        <Box
            sx={(theme) => ({
                borderLeft: `2px solid ${theme.palette.divider}`,
                height: 500, mt: 2, boxShadow: 1, p: 2, pt: 0,
                scrollbarWidth: "none", // Firefox
                "&::-webkit-scrollbar": { display: "none" }, // Chrome/Safari
                overflowY: "auto"
            })}>
            <Typography variant="h6" sx={{ mb: 1 }}>
                Who to Follow
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, }}>
                {whoToFollow.map((user, index) => (
                    <Card key={index} elevation={0} sx={{ p: 1.5, borderRadius: 2, bgcolor: "background.paper", boxShadow: 1, }}>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 0 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                <Avatar
                                    sx={{ width: 50, height: 50 }}
                                    src={user.avatar}
                                />
                                <Box sx={{ display: "flex", flexDirection: "column", gap: -1 }}>
                                    <Typography variant="subtitle1" sx={{ fontSize: "0.95rem", display: "flex", alignItems: "center" }}>
                                        {user.name} {user.isVerified && <CheckCircleIcon sx={{ fontSize: "0.9rem", color: "primary.main", ml: 0.5 }} />}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" sx={{ mt: -0.5 }}>
                                        {user.handle}
                                    </Typography>
                                </Box>
                            </Box>
                            <Button
                                variant="contained"
                                size="small"
                                sx={{
                                    px: 1.5,
                                    py: 0.5, fontSize: "0.75rem", textTransform: "none", borderRadius: "20px",
                                }}
                            >
                                Follow
                            </Button>
                        </Box>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}
