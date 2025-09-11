"use client";

import type React from "react"
import { useState } from "react"
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import ShareIcon from "@mui/icons-material/Share";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BarChartIcon from "@mui/icons-material/BarChart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { ExpandedPost } from "@/components/ui/robook/post/ExpandedPost";
import type { PostCardProps } from "@/types";

export default function PostCard({ user, timestamp, content, image, metrics, usersComments, video }: PostCardProps) {
    const [expanded, setExpanded] = useState(false)
    const [showExpandedPost, setShowExpandedPost] = useState(false);



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
                display: "flex",
                m: "auto",
                borderRadius: 0,
                bgcolor: "transparent",
                mt: 0,
                p: 0,
                pb: 1
            }}
            onClick={handlePostClick}
        >
            <CardContent sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                m: "auto",
                mb: 0,
                color: "tex.secondary",
                p: 0,
            }}>
                <Box sx={{ textAlign: "left", m: "auto", width: "100%", }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexDirection: "row", width: { xs: "100%", sm: "97%" } }}>
                        <Avatar
                            src={user.avatar || "/placeholder.svg"}
                            sx={(theme) => ({
                                bgcolor: theme.palette.secondary.main,
                                width: 20,
                                height: 20,
                                fontSize: "0.6rem",
                                fontWeight: 600,
                                borderRadius: 0.3
                            })}
                        >
                            {user.name.charAt(0)}
                        </Avatar>
                        <Typography variant="caption" sx={{ color: "text.primary", fontWeight: 500 }}>
                            {user.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#6b7280" }}>
                            ·
                        </Typography>
                        <Typography variant="caption" sx={{ flex: 1, color: "gray", fontWeight: 500 }}>
                            {timestamp}
                        </Typography>
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

                    <Paper
                        sx={{
                            flex: 1, minWidth: 0, width: { xs: "100%", sm: "96%" },
                            mt: 0, p: 2, m: "auto", bgcolor: "background.paper",
                            borderRadius: 1.3,
                            px: { xs: 1.5, sm: 2 },
                            border: "1px solid",
                            borderColor: "divider",
                        }}
                        elevation={0}
                    >

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
                                    WebkitLineClamp: expanded ? "unset" : maxLines,
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
                                        color: "#1DA1F2",
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

                        {video && (
                            <Box component="video" controls src={video} sx={{ width: "100%", m: "auto", borderRadius: 1.5, my: 1 }} />
                        )}

                        {/* Image */}
                        {image && (
                            <Box sx={{ mb: 1.5, borderRadius: 0, overflow: "hidden", }}>
                                <Box
                                    component="img"
                                    src={image || "/placeholder.svg"}
                                    alt="Post image"
                                    sx={{ width: "100%", height: 311, }}

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
                    </Paper>
                </Box>
            </CardContent>
        </Card >
    )
}
