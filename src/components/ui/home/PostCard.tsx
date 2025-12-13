"use client";

import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import ShareIcon from "@mui/icons-material/Share";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BarChartIcon from "@mui/icons-material/BarChart";

import type { PostCardProps } from "@/types";
import { ExpandedPost } from "@/components/ui/robook/post/ExpandedPost";
import { useRouter } from "next/navigation";

export default function PostCard({ user, timestamp, content, image, metrics, usersComments, video }: PostCardProps) {
    const router = useRouter();
    const [expanded, setExpanded] = React.useState(false)
    const [showExpandedPost, setShowExpandedPost] = React.useState(false)

    const formatNumber = (num: number) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + "K"
        }
        return num.toString()
    }

    const maxLines = 7
    const shouldShowMore = content.split("\n").join("").length > 300

    const handlePostClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest("button, a")) {
            return
        }

        setShowExpandedPost((prev) => !prev);
    }

    return (
        <Card
            elevation={0}
            sx={{
                mx: "auto",
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                width: "100%",
            }}
            onClick={handlePostClick}
        >
            <CardContent sx={{ p: 2, pt: 0, }}>
                {/* Header */}
                <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 1.5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 2 }} onClick={() => router.push("/r/atomic-habits")}
                    >
                        <Avatar src={user.avatar || "/placeholder.svg"} alt={user.name} sx={{ width: 50, height: 50, borderRadius: 0.5 }}>
                            {user.name.charAt(0)}
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
                        <MoreHorizIcon />
                    </IconButton>
                </Box>

                {video && (
                    <Box component="video" controls src={video} sx={{ width: "100%", m: "auto", borderRadius: 1.5, my: 1 }} />
                )}

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
                    {shouldShowMore && (
                        <Button
                            onClick={(e) => {
                                e.stopPropagation()
                                setExpanded(!expanded)
                            }}
                            sx={{
                                color: "text.primary",
                                textTransform: "none",
                                p: 0,
                                minWidth: "auto",
                                "&:hover": { bgcolor: "transparent", textDecoration: "underline" },
                            }}
                        >
                            {expanded ? "Show less" : "Show more"}
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
                            sx={{ width: "100%", height: 311 }}
                        />
                    </Box>
                )}

                {showExpandedPost ? (
                    <ExpandedPost
                        user={user}
                        timestamp={timestamp}
                        content={content}
                        image={image}
                        metrics={metrics}
                        onClose={() => setShowExpandedPost(false)}
                        usersComments={usersComments}
                    />

                ) : (
                    <Box sx={{ pt: 1.5, borderTop: "1px solid #333", display: showExpandedPost ? "none" : "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 2 } }}>
                            <IconButton
                                size="small"
                                onClick={(e) => { e.stopPropagation(); setShowExpandedPost((prev) => !prev); }}
                                sx={{
                                    color: "#6b7280",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    "&:hover": {
                                        color: "#1DA1F2",
                                        bgcolor: "rgba(29, 161, 242, 0.1)",
                                    },
                                }}
                            >
                                <ChatBubbleOutlineIcon sx={{ fontSize: 16 }} />
                                <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                                    {formatNumber(metrics.replies)}
                                </Typography>
                            </IconButton>

                            <IconButton
                                size="small"
                                onClick={(e) => e.stopPropagation()}
                                sx={{
                                    color: "#6b7280",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    "&:hover": {
                                        color: "#10b981",
                                        bgcolor: "rgba(16, 185, 129, 0.1)",
                                    },
                                }}
                            >
                                <RepeatIcon sx={{ fontSize: 16 }} />
                                <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                                    {formatNumber(metrics.retweets)}
                                </Typography>
                            </IconButton>

                            <IconButton
                                size="small"
                                onClick={(e) => e.stopPropagation()}
                                sx={{
                                    color: "#6b7280",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    "&:hover": {
                                        color: "#ef4444",
                                        bgcolor: "rgba(239, 68, 68, 0.1)",
                                    },
                                }}
                            >
                                <FavoriteIcon sx={{ fontSize: 16 }} />
                                <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                                    {formatNumber(metrics.likes)}
                                </Typography>
                            </IconButton>


                            {metrics.views && (
                                <IconButton
                                    size="small"
                                    onClick={(e) => e.stopPropagation()}
                                    sx={{
                                        color: "#6b7280",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        "&:hover": {
                                            color: "#1DA1F2",
                                            bgcolor: "rgba(29, 161, 242, 0.1)",
                                        },
                                    }}
                                >
                                    <BarChartIcon sx={{ fontSize: 16 }} />
                                    <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                                        {formatNumber(metrics.views)}
                                    </Typography>
                                </IconButton>
                            )}
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0, sm: 0.5 } }}>
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
                                <BookmarkBorderIcon sx={{ fontSize: 16 }} />
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
                                <ShareIcon sx={{ fontSize: 16 }} />
                            </IconButton>
                        </Box>
                    </Box>
                )}
            </CardContent>
        </Card>
    )
}
