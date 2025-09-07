"use client";

import React from 'react';
import { Card, CardContent, Box, Avatar, Typography, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
    ChatBubbleOutline,
    Repeat,
    FavoriteBorder,
    BookmarkBorder,
    Share,
    MoreHoriz,
    Verified,
    BarChart,
} from "@mui/icons-material";
import RobookCard from "@ui/RobookCard";


export default function RobookCardContent({ author, robook }: { author: any, robook: any }) {
    const theme = useTheme();

    return (
        <Card
            sx={{
                maxWidth: "100%",
                bgcolor: "background.default",
                color: theme.palette.text.primary,
                // border: `1px solid ${theme.palette.divider}`,
                borderRadius: 0,
                boxShadow: "none",
            }}
            elevation={0}
        >
            <CardContent sx={{ p: { xs: 0, sm: 2 }, }}>
                {/* Header with avatar, name, and more options */}
                <Box sx={{ display: "flex", alignItems: "flex-start", mb: 0 }}>
                    <Avatar src={author.image} sx={{ width: 40, height: 40, mr: 1.5, outline: `2px solid ${theme.palette.divider}` }} />
                    <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <Typography variant="body1" sx={{ fontWeight: 500, color: theme.palette.text.primary }}>
                                {author.name}
                            </Typography>
                            <Verified sx={{ fontSize: 16, color: theme.palette.primary.main }} />
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, ml: 0.5 }}>
                                {author.handle} · {author.time}
                            </Typography>
                        </Box>
                    </Box>
                    <IconButton size="small" sx={{ color: theme.palette.text.secondary }}>
                        <MoreHoriz />
                    </IconButton>
                </Box>

                {/* Tweet content */}
                <Box sx={{ ml: { xs: 4, sm: 6.5 }, mb: 2 }}>
                    {/* <Typography
                        variant="body1"
                        sx={{
                            color: theme.palette.text.primary,
                            lineHeight: 1.3,
                            fontSize: "15px",
                        }}
                    >
                        Apparently people in the SF Bay Area have stopped drinking. I heard about one big social event that made
                        half as much from drinks in 2025 as in 2024.
                    </Typography> */}
                    <RobookCard robook={robook} where='profile' />
                </Box>

                {/* Engagement metrics */}
                <Box
                    sx={{
                        ml: 6.5,
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        mt: 2,
                        pb: 1,
                        borderBottom: "1px solid", borderColor: "divider"
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, }}>
                        <IconButton
                            size="small"
                            sx={{
                                color: theme.palette.text.secondary,
                                "&:hover": { color: theme.palette.primary.main },
                                p: 0.5,
                            }}
                        >
                            <ChatBubbleOutline sx={{ fontSize: 18 }} />
                        </IconButton>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontSize: "13px" }}>
                            200
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <IconButton
                            size="small"
                            sx={{
                                color: theme.palette.text.secondary,
                                "&:hover": { color: theme.palette.success.main },
                                p: 0.5,
                            }}
                        >
                            <Repeat sx={{ fontSize: 18 }} />
                        </IconButton>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontSize: "13px" }}>
                            63
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <IconButton
                            size="small"
                            sx={{
                                color: theme.palette.text.secondary,
                                "&:hover": { color: theme.palette.error.main },
                                p: 0.5,
                            }}
                        >
                            <FavoriteBorder sx={{ fontSize: 18 }} />
                        </IconButton>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontSize: "13px" }}>
                            1.2K
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <IconButton
                            size="small"
                            sx={{
                                color: theme.palette.text.secondary,
                                "&:hover": { color: theme.palette.primary.main },
                                p: 0.5,
                            }}
                        >
                            <BarChart sx={{ fontSize: 18 }} />
                        </IconButton>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontSize: "13px" }}>
                            151K
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: "auto" }}>
                        <IconButton
                            size="small"
                            sx={{
                                color: theme.palette.text.secondary,
                                "&:hover": { color: theme.palette.primary.main },
                                p: 0.5,
                            }}
                        >
                            <BookmarkBorder sx={{ fontSize: 18 }} />
                        </IconButton>
                        <IconButton
                            size="small"
                            sx={{
                                color: theme.palette.text.secondary,
                                "&:hover": { color: theme.palette.primary.main },
                                p: 0.5,
                            }}
                        >
                            <Share sx={{ fontSize: 18 }} />
                        </IconButton>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}
