"use client"

import { useState } from "react"
import { Box, Avatar, IconButton, Typography, TextField, Button, Divider } from "@mui/material"
import {
    Favorite,
    ChatBubbleOutline,
    Repeat,
    Share,
    MoreHoriz,
    CheckCircle,
    ArrowBack,
    Image as ImageIcon,
    EmojiEmotions,
} from "@mui/icons-material"


interface Comment {
    id: string
    user: {
        name: string
        username: string
        avatar: string
        verified?: boolean
    }
    timestamp: string
    content: string
    metrics: {
        replies: number
        likes: number
    }

}


interface ExpandedPostProps {
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
    onClose: () => void
    usersComments: Comment[]
}

export function ExpandedPost({ user, timestamp, content, image, metrics, onClose, usersComments }: ExpandedPostProps) {
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState<Comment[]>(usersComments);

    const formatNumber = (num: number) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + "K"
        }
        return num.toString()
    }

    const handleAddComment = () => {
        if (newComment.trim()) {
            const comment: Comment = {
                id: Date.now().toString(),
                user: {
                    name: "You",
                    username: "you",
                    avatar: "/diverse-user-avatars.png",
                    verified: false,
                },
                timestamp: "now",
                content: newComment,
                metrics: { replies: 0, likes: 0 },
            }
            setComments([comment, ...comments])
            setNewComment("")
        }
    }

    return (
        <Box sx={{ bgcolor: "black", color: "white" }}>
            <Box sx={{ display: "flex", alignItems: "center", p: 2, borderBottom: "1px solid #374151" }}>
                <IconButton
                    onClick={onClose}
                    sx={{ mr: 2, color: "white", "&:hover": { bgcolor: "rgba(255, 255, 255, 0.1)" } }}
                >
                    <ArrowBack />
                </IconButton>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Post
                </Typography>
            </Box>

            <Box sx={{ p: 2, borderBottom: "1px solid #374151" }}>
                <Box sx={{ display: "flex", gap: 1.5, mb: 2 }}>
                    <Avatar src={user.avatar || "/placeholder.svg"} sx={{ width: 48, height: 48 }}>
                        {user.name.charAt(0)}
                    </Avatar>

                    <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
                                {user.name}
                            </Typography>
                            {user.verified && <CheckCircle sx={{ fontSize: 20, color: "#1DA1F2" }} />}
                        </Box>
                        <Typography variant="body2" sx={{ color: "#6b7280", mb: 2 }}>
                            @{user.username}
                        </Typography>
                    </Box>

                    <IconButton sx={{ color: "#6b7280", "&:hover": { color: "white", bgcolor: "rgba(255, 255, 255, 0.1)" } }}>
                        <MoreHoriz />
                    </IconButton>
                </Box>

                <Box sx={{ mb: 2 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            color: "white",
                            lineHeight: 1.6,
                            whiteSpace: "pre-line",
                            fontWeight: 400,
                        }}
                    >
                        {content}
                    </Typography>
                </Box>

                {image && (
                    <Box
                        sx={{
                            mb: 2,
                            borderRadius: 2,
                            overflow: "hidden",
                            border: "1px solid #374151",
                        }}
                    >
                        <Box
                            component="img"
                            src={image || "/placeholder.svg"}
                            alt="Post image"
                            sx={{ width: "100%", height: 320, objectFit: "cover" }}
                        />
                    </Box>
                )}

                <Typography variant="body2" sx={{ color: "#6b7280", mb: 2, pb: 2, borderBottom: "1px solid #374151" }}>
                    {timestamp} ago
                </Typography>

                <Box sx={{ display: "flex", gap: 3, mb: 2, pb: 2, borderBottom: "1px solid #374151" }}>
                    <Typography variant="body2" sx={{ color: "#6b7280" }}>
                        <Box component="span" sx={{ color: "white", fontWeight: "bold" }}>
                            {formatNumber(metrics.retweets)}
                        </Box>{" "}
                        Reposts
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#6b7280" }}>
                        <Box component="span" sx={{ color: "white", fontWeight: "bold" }}>
                            {formatNumber(metrics.likes)}
                        </Box>{" "}
                        Likes
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#6b7280" }}>
                        <Box component="span" sx={{ color: "white", fontWeight: "bold" }}>
                            {formatNumber(metrics.replies)}
                        </Box>{" "}
                        Replies
                    </Typography>
                    {metrics.views && (
                        <Typography variant="body2" sx={{ color: "#6b7280" }}>
                            <Box component="span" sx={{ color: "white", fontWeight: "bold" }}>
                                {formatNumber(metrics.views)}
                            </Box>{" "}
                            Views
                        </Typography>
                    )}
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-around", py: 1, borderBottom: "1px solid #374151" }}>
                    <IconButton
                        sx={{
                            color: "#6b7280",
                            "&:hover": { color: "#1DA1F2", bgcolor: "rgba(29, 161, 242, 0.1)" },
                        }}
                    >
                        <ChatBubbleOutline />
                    </IconButton>
                    <IconButton
                        sx={{
                            color: "#6b7280",
                            "&:hover": { color: "#10b981", bgcolor: "rgba(16, 185, 129, 0.1)" },
                        }}
                    >
                        <Repeat />
                    </IconButton>
                    <IconButton
                        sx={{
                            color: "#6b7280",
                            "&:hover": { color: "#ef4444", bgcolor: "rgba(239, 68, 68, 0.1)" },
                        }}
                    >
                        <Favorite />
                    </IconButton>
                    <IconButton
                        sx={{
                            color: "#6b7280",
                            "&:hover": { color: "#1DA1F2", bgcolor: "rgba(29, 161, 242, 0.1)" },
                        }}
                    >
                        <Share />
                    </IconButton>
                </Box>
            </Box>

            <Box sx={{ p: 2, borderBottom: "1px solid #374151" }}>
                <Box sx={{ display: "flex", gap: 1.5 }}>
                    <Avatar src="/diverse-user-avatars.png" sx={{ width: 40, height: 40 }}>
                        Y
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                        <TextField
                            multiline
                            rows={3}
                            placeholder="Post your reply"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            variant="standard"
                            fullWidth
                            InputProps={{
                                disableUnderline: true,
                                sx: {
                                    color: "white",
                                    fontSize: "1.25rem",
                                    "& ::placeholder": {
                                        color: "#6b7280",
                                        opacity: 1,
                                    },
                                },
                            }}
                            sx={{
                                "& .MuiInput-root": {
                                    "&:before": { display: "none" },
                                    "&:after": { display: "none" },
                                },
                            }}
                        />
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1.5 }}>
                            <Box sx={{ display: "flex", gap: 2 }}>
                                <IconButton
                                    sx={{
                                        color: "#1DA1F2",
                                        "&:hover": { bgcolor: "rgba(29, 161, 242, 0.1)" },
                                    }}
                                >
                                    <ImageIcon />
                                </IconButton>
                                <IconButton
                                    sx={{
                                        color: "#1DA1F2",
                                        "&:hover": { bgcolor: "rgba(29, 161, 242, 0.1)" },
                                    }}
                                >
                                    <EmojiEmotions />
                                </IconButton>
                            </Box>
                            <Button
                                onClick={handleAddComment}
                                disabled={!newComment.trim()}
                                variant="contained"
                                sx={{
                                    bgcolor: "#1DA1F2",
                                    "&:hover": { bgcolor: "#1a91da" },
                                    borderRadius: "20px",
                                    textTransform: "none",
                                    fontWeight: "bold",
                                    px: 3,
                                    "&:disabled": { opacity: 0.5 },
                                }}
                            >
                                Reply
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box>
                {comments.map((comment, index) => (
                    <Box key={comment.id}>
                        <Box
                            sx={{
                                p: 2,
                                "&:hover": { bgcolor: "rgba(255, 255, 255, 0.03)" },
                                transition: "background-color 0.2s",
                            }}
                        >
                            <Box sx={{ display: "flex", gap: 1.5 }}>
                                <Avatar src={comment.user.avatar || "/placeholder.svg"} sx={{ width: 40, height: 40 }}>
                                    {comment.user.name.charAt(0)}
                                </Avatar>

                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                                        <Typography variant="body1" sx={{ fontWeight: "bold", color: "white" }}>
                                            {comment.user.name}
                                        </Typography>
                                        {comment.user.verified && <CheckCircle sx={{ fontSize: 16, color: "#1DA1F2" }} />}
                                        <Typography variant="body2" sx={{ color: "#6b7280" }}>
                                            @{comment.user.username}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "#6b7280" }}>
                                            ·
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "#6b7280" }}>
                                            {comment.timestamp}
                                        </Typography>
                                    </Box>

                                    <Typography variant="body1" sx={{ color: "white", mb: 1.5, whiteSpace: "pre-line" }}>
                                        {comment.content}
                                    </Typography>

                                    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                                        <IconButton
                                            size="small"
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
                                            <ChatBubbleOutline sx={{ fontSize: 16 }} />
                                            <Typography variant="body2">{comment.metrics.replies}</Typography>
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
                                                    bgcolor: "rgba(239, 68, 68, 0.1)",
                                                },
                                            }}
                                        >
                                            <Favorite sx={{ fontSize: 16 }} />
                                            <Typography variant="body2">{comment.metrics.likes}</Typography>
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            sx={{
                                                color: "#6b7280",
                                                "&:hover": {
                                                    color: "#1DA1F2",
                                                    bgcolor: "rgba(29, 161, 242, 0.1)",
                                                },
                                            }}
                                        >
                                            <Share sx={{ fontSize: 16 }} />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        {index < comments.length - 1 && <Divider sx={{ borderColor: "#374151" }} />}
                    </Box>
                ))}
            </Box>
        </Box>
    )
}
