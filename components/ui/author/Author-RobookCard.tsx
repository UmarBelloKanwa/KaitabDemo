"use client";

import React from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VerifiedIcon from "@mui/icons-material/Verified";
import BarChartIcon from "@mui/icons-material/BarChart";
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
                            <VerifiedIcon sx={{ fontSize: 16, color: theme.palette.primary.main }} />
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, ml: 0.5 }}>
                                {author.handle} · {author.time}
                            </Typography>
                        </Box>
                    </Box>
                    <IconButton size="small" sx={{ color: theme.palette.text.secondary }}>
                        <MoreHorizIcon />
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
                        gap: { xs: 1, sm: 4 },
                        mt: 2,
                        pb: 1,
                        borderBottom: "1px solid", borderColor: "divider",
                        maxWidth: "100%"
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0, sm: 1 } }}>
                        <IconButton
                            size="small"
                            sx={{
                                color: theme.palette.text.secondary,
                                "&:hover": { color: theme.palette.primary.main },
                                p: 0.5,
                            }}
                        >
                            <ChatBubbleOutlineIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, }}>
                            200
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0, sm: 1 } }}>
                        <IconButton
                            size="small"
                            sx={{
                                color: theme.palette.text.secondary,
                                "&:hover": { color: theme.palette.success.main },
                                p: 0.5,
                            }}
                        >
                            <RepeatIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, }}>
                            63
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0, sm: 1 } }}>
                        <IconButton
                            size="small"
                            sx={{
                                color: theme.palette.text.secondary,
                                "&:hover": { color: theme.palette.error.main },
                                p: 0.5,
                            }}
                        >
                            <FavoriteBorderIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, }}>
                            1.2K
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0, sm: 1 } }}>
                        <IconButton
                            size="small"
                            sx={{
                                color: theme.palette.text.secondary,
                                "&:hover": { color: theme.palette.primary.main },
                                p: 0.5,
                            }}
                        >
                            <BarChartIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, }}>
                            151K
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 0, ml: "auto" }}>
                        <IconButton
                            size="small"
                            sx={{
                                color: theme.palette.text.secondary,
                                "&:hover": { color: theme.palette.primary.main },
                                p: 0.5,
                            }}
                        >
                            <BookmarkBorderIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                        <IconButton
                            size="small"
                            sx={{
                                color: theme.palette.text.secondary,
                                "&:hover": { color: theme.palette.primary.main },
                                p: 0.5,
                            }}
                        >
                            <ShareIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                    </Box>
                </Box>
            </CardContent>
        </Card >
    );
}
