"use client"
import {
    Card,
    Button,
    CardContent, Avatar, IconButton, Typography, Box, Chip
} from "@mui/material";
import React from "react";
import {
    Favorite,
    ChatBubbleOutline,
    Repeat,
    Share,
    MoreHoriz,
    BookmarkBorder,
    BarChart,
    CheckCircle,
} from "@mui/icons-material";



interface TwitterPostCardProps {
    user: {
        name: string
        username: string
        avatar: string
        verified?: boolean
    }
    timestamp: string
    content: string
    image?: string
    metrics: {
        replies: number
        retweets: number
        likes: number
        views?: number
    }
}

export default function PostCard({ user, timestamp, content, image, metrics }: TwitterPostCardProps) {
    const formatNumber = (num: number) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + "K"
        }
        return num.toString()
    }
    const [expanded, setExpanded] = React.useState(false);

    const maxLines = 15; // Maximum lines to show when collapsed

    return (
        <Card
            elevation={0}
            sx={{
                width: "100%",
                maxWidth: 672,
                mx: "auto",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                bgcolor: "transparent",
            }}
        >
            <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: "flex", gap: 1.5 }}>
                    <Avatar
                        src={user.avatar}
                        alt="Garry Tan"
                        sx={{ width: 48, height: 48, borderRadius: 1, flexShrink: 0 }}
                    >
                        {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                    </Avatar>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        {/* Header */}
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                    <Typography variant="body1" sx={{ fontWeight: "bold", color: "white" }}>
                                        {user.name}
                                    </Typography>
                                    <CheckCircle sx={{ width: 20, height: 20, color: "#1DA1F2" }} />
                                </Box>

                                <Typography variant="body2" sx={{ color: "#6b7280" }}>
                                    @{user.username}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#6b7280" }}>
                                    ·
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#6b7280" }}>
                                    4h
                                </Typography>
                            </Box>
                            <IconButton
                                size="small"
                                sx={{
                                    color: "#6b7280",
                                    "&:hover": { backgroundColor: "#374151" },
                                }}
                            >
                                <MoreHoriz />
                            </IconButton>
                        </Box>

                        {/* Content */}
                        <Box sx={{ mb: 1.5 }}>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: "white",
                                    lineHeight: 1.6,
                                    whiteSpace: "pre-line",
                                    overflow: "hidden",
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    WebkitLineClamp: expanded ? "unset" : maxLines, // ✅ collapse when not expanded
                                }}
                            >
                                {content}
                            </Typography>

                            {/* Show button only if content is long */}
                            {content.split("\n").join("").length > 300 && (
                                <Button
                                    onClick={() => setExpanded(!expanded)}
                                    size="small"
                                    sx={{ color: "#1DA1F2", textTransform: "none", mt: 0.5 }}
                                >
                                    {expanded ? "See less" : "See more"}
                                </Button>
                            )}
                        </Box>

                        {/* Image */}
                        {image && (
                            <Box sx={{ mb: 1.5, borderRadius: 1, overflow: "hidden", }}>
                                <Box
                                    component="img"
                                    src={image || "/placeholder.svg"}
                                    alt="Post image"
                                    sx={{ width: "100%", height: 250, objectFit: "cover" }}
                                />
                            </Box>
                        )}

                        <Box sx={{ pt: 1.5, borderTop: "1px solid #333" }}>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <IconButton
                                    size="small"
                                    sx={{
                                        color: "#6b7280",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        "&:hover": {
                                            color: "#1DA1F2",
                                            backgroundColor: "rgba(29, 161, 242, 0.1)",
                                        },
                                    }}
                                >
                                    <ChatBubbleOutline sx={{ fontSize: 20 }} />
                                    <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                                        61
                                    </Typography>
                                </IconButton>

                                <IconButton
                                    size="small"
                                    sx={{
                                        color: "#6b7280",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        "&:hover": {
                                            color: "#10b981",
                                            backgroundColor: "rgba(16, 185, 129, 0.1)",
                                        },
                                    }}
                                >
                                    <Repeat sx={{ fontSize: 20 }} />
                                    <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                                        34
                                    </Typography>
                                </IconButton>

                                <IconButton
                                    size="small"
                                    sx={{
                                        color: "#6b7280",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        "&:hover": {
                                            color: "#ef4444",
                                            backgroundColor: "rgba(239, 68, 68, 0.1)",
                                        },
                                    }}
                                >
                                    <Favorite sx={{ fontSize: 20 }} />
                                    <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                                        389
                                    </Typography>
                                </IconButton>

                                <IconButton
                                    size="small"
                                    sx={{
                                        color: "#6b7280",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        "&:hover": {
                                            color: "#1DA1F2",
                                            backgroundColor: "rgba(29, 161, 242, 0.1)",
                                        },
                                    }}
                                >
                                    <BarChart sx={{ fontSize: 20 }} />
                                    <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                                        30K
                                    </Typography>
                                </IconButton>

                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                    <IconButton
                                        size="small"
                                        sx={{
                                            color: "#6b7280",
                                            "&:hover": {
                                                color: "#1DA1F2",
                                                backgroundColor: "rgba(29, 161, 242, 0.1)",
                                            },
                                        }}
                                    >
                                        <BookmarkBorder sx={{ fontSize: 20 }} />
                                    </IconButton>

                                    <IconButton
                                        size="small"
                                        sx={{
                                            color: "#6b7280",
                                            "&:hover": {
                                                color: "#1DA1F2",
                                                backgroundColor: "rgba(29, 161, 242, 0.1)",
                                            },
                                        }}
                                    >
                                        <Share sx={{ fontSize: 20 }} />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}
