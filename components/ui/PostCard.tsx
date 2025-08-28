import React from "react";
import { Card, CardContent, Avatar, IconButton, Typography, Box } from "@mui/material"
import Button from "@mui/material/Button"
import { Favorite, ChatBubbleOutline, Repeat, Share, MoreHoriz, BookmarkBorder, BarChart } from "@mui/icons-material"


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
                mx: "auto",
                borderRadius: 2,
            }}
        >
            <CardContent sx={{ p: 2 }}>
                {/* Header */}
                <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 1.5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Avatar src={user.avatar || "/placeholder.svg"} alt={user.name} sx={{ width: 50, height: 50, borderRadius: 0.5 }}>
                            {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </Avatar>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
                            <Typography variant="body1" sx={{ fontWeight: "bold", color: "white" }}>
                                {user.name}  {user.verified && (
                                    <Box
                                        component="svg"
                                        sx={{ width: 20, height: 20, color: "#3b82f6" }}
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.056-2.13c-.293-.306-.288-.778.018-1.1.306-.294.778-.287 1.1.018l1.476 1.528 3.825-5.738c.251-.375.756-.47 1.131-.22.375.251.47.756.22 1.131-.004-.001-.004-.001-.004-.003z" />

                                    </Box>
                                )}
                            </Typography>

                            <Typography variant="body2" sx={{ color: "#6b7280" }}>
                                @{user.username}
                            </Typography>

                        </Box>
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

                {/* Engagement Metrics */}
                <Box sx={{ pt: 1.5, borderTop: "1px solid #374151" }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <IconButton
                            size="small"
                            sx={{
                                color: "#6b7280",
                                display: "flex",
                                alignItems: "center",
                                gap: { xs: 0.3, sm: 1 },
                                "&:hover": {
                                    color: "#3b82f6",
                                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                                },
                            }}
                        >
                            <ChatBubbleOutline sx={{ fontSize: 20 }} />
                            <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                                {formatNumber(metrics.replies)}
                            </Typography>
                        </IconButton>

                        <IconButton
                            size="small"
                            sx={{
                                color: "#6b7280",
                                display: "flex",
                                alignItems: "center",
                                                               gap: { xs: 0.3, sm: 1 },

                                "&:hover": {
                                    color: "#10b981",
                                    backgroundColor: "rgba(16, 185, 129, 0.1)",
                                },
                            }}
                        >
                            <Repeat sx={{ fontSize: 20 }} />
                            <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                                {formatNumber(metrics.retweets)}
                            </Typography>
                        </IconButton>

                        <IconButton
                            size="small"
                            sx={{
                                color: "#6b7280",
                                display: "flex",
                                alignItems: "center",
                                                               gap: { xs: 0.3, sm: 1 },

                                "&:hover": {
                                    color: "#ef4444",
                                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                                },
                            }}
                        >
                            <Favorite sx={{ fontSize: 20 }} />
                            <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                                {formatNumber(metrics.likes)}
                            </Typography>
                        </IconButton>

                        {metrics.views && (
                            <IconButton
                                size="small"
                                sx={{
                                    color: "#6b7280",
                                    display: "flex",
                                    alignItems: "center",
                                                                   gap: { xs: 0.3, sm: 1 },

                                    "&:hover": {
                                        color: "#3b82f6",
                                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                                    },
                                }}
                            >
                                <BarChart sx={{ fontSize: 20 }} />
                                <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                                    {formatNumber(metrics.views)}
                                </Typography>
                            </IconButton>
                        )}

                        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0, sm: 1 } }}>
                            <IconButton
                                size="small"
                                sx={{
                                    color: "#6b7280",
                                    "&:hover": {
                                        color: "#3b82f6",
                                        backgroundColor: "rgba(59, 130, 246, 0.1)",
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
                                        color: "#3b82f6",
                                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                                    },
                                }}
                            >
                                <Share sx={{ fontSize: 20 }} />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}
