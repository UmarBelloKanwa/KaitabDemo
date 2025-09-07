"use client";

import { Card, CardContent, Button, Avatar, Typography, Box, IconButton, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { MenuBook, LinkedIn, MoreHoriz } from "@mui/icons-material";

export default function ProfileCard() {
    const theme = useTheme();

    return (
        <Card
            sx={{
                width: "100%",
                maxWidth: "100%",
                mx: "auto",
                bgcolor: theme.palette.background.default,
                //border: `1px solid ${theme.palette.divider}`,
                color: theme.palette.text.primary,
                overflow: "hidden",
            }}
            elevation={0}
        >
            {/* Background Header */}
            <Box
                sx={{
                    height: 200,
                    borderRadius: 1,
                    backgroundImage: `url('/cover.jpg')`,
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    position: "relative",
                }}
            >
                {/* Profile Avatar positioned over the background */}
                <Avatar
                    src="/james-clear.jpg"
                    alt="James Clear"
                    sx={{
                        position: "absolute",
                        bottom: -50,
                        right: 16,
                        width: 109,
                        height: 109,
                        border: `1px solid ${theme.palette.divider}`,
                        bgcolor: theme.palette.grey[700],
                        color: theme.palette.text.primary,
                    }}
                >
                    James Clear
                </Avatar>
            </Box>

            <CardContent sx={{ p: 2, pt: 1 }}>
                {/* Name and Username */}
                <Box sx={{ mb: 1.5 }}>
                    <Typography variant="h6" component="h2" sx={{ color: theme.palette.text.primary, fontWeight: "bold" }}>
                        James Clear
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        @jamesclear
                    </Typography>
                </Box>

                {/* Bio */}
                <Typography
                    variant="body2"
                    sx={{
                        color: theme.palette.text.disabled,
                        mb: 2,
                        lineHeight: 1.6,
                    }}
                >
                    Author of Atomic Habits, writing about habits, decision-making, and continuous improvement. Helping millions build better systems for work and life.
                </Typography>

                {/* Links */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            color: theme.palette.text.disabled,
                            cursor: "pointer",
                            "&:hover": { color: theme.palette.text.primary },
                        }}
                    >
                        <MenuBook sx={{ fontSize: 16 }} />
                        <Typography variant="body2"> Atomic Habits </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            color: theme.palette.text.disabled,
                            cursor: "pointer",
                            "&:hover": { color: theme.palette.text.primary },
                        }}
                    >
                        <LinkedIn sx={{ fontSize: 16 }} />
                        <Typography variant="body2">LinkedIn</Typography>
                    </Box>
                </Box>

                {/* Subscriber Count */}
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
                    9.9K+ subscribers
                </Typography>

                {/* Action Buttons */}
                <Box sx={{ display: "flex", gap: 1.5, mb: 2 }}>
                    <Button
                        variant="contained"
                        sx={{
                            flex: 1,
                        }}
                    >
                        Subscribe
                    </Button>
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: theme.palette.divider,
                            color: theme.palette.text.disabled,
                            "&:hover": {
                                bgcolor: theme.palette.action.hover,
                                color: theme.palette.text.primary,
                                borderColor: theme.palette.divider,
                            },
                        }}
                    >
                        Message
                    </Button>
                    <IconButton
                        sx={{
                            color: theme.palette.text.secondary,
                            "&:hover": {
                                color: theme.palette.text.primary,
                                bgcolor: theme.palette.action.hover,
                            },
                        }}
                    >
                        <MoreHoriz />
                    </IconButton>
                </Box>
                <Divider sx={{ borderColor: theme.palette.divider, mb: 0 }} />
                {/* Bottom Navigation */}
                {/* <Box>
                    <Divider sx={{ borderColor: theme.palette.divider, mb: 1.5 }} />
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="body2" sx={{ color: theme.palette.text.primary, fontWeight: 500 }}>
                                Robooks
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                Posts
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                Likes
                            </Typography>
                        </Box>

                    </Box> 
            </Box> */}
            </CardContent>
        </Card >
    );
}