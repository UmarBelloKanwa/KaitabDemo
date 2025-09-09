"use client"

import React from "react"
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import ShareIcon from "@mui/icons-material/Share";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ImageIcon from "@mui/icons-material/Image";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

import type { PostCardProps, Comment } from "@/types";

interface ExpandedPostProps extends PostCardProps {
    onClose: () => void
}


export function ExpandedPost({ timestamp, image, metrics, onClose, usersComments }: ExpandedPostProps) {
    const [newComment, setNewComment] = React.useState("");
    const [comments, setComments] = React.useState<Comment[]>(usersComments);

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
        <Box sx={{ bgcolor: "background.paper", color: "white", }}>

            <Box sx={{ p: 2, px: 0, }}>
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

                <Box sx={{ display: "flex", justifyContent: "space-around", py: 1, }}>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            color: "#6b7280",
                            "&:hover": { color: "#1DA1F2", bgcolor: "rgba(29, 161, 242, 0.1)" },
                        }}
                    >
                        <ChatBubbleOutlineIcon />
                    </IconButton>
                    <IconButton
                        sx={{
                            color: "#6b7280",
                            "&:hover": { color: "#10b981", bgcolor: "rgba(16, 185, 129, 0.1)" },
                        }}
                    >
                        <RepeatIcon />
                    </IconButton>
                    <IconButton
                        sx={{
                            color: "#6b7280",
                            "&:hover": { color: "#ef4444", bgcolor: "rgba(239, 68, 68, 0.1)" },
                        }}
                    >
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton
                        sx={{
                            color: "#6b7280",
                            "&:hover": { color: "#1DA1F2", bgcolor: "rgba(29, 161, 242, 0.1)" },
                        }}
                    >
                        <ShareIcon />
                    </IconButton>
                </Box>
            </Box>

            <Box sx={{ p: 2, mb: 1, border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
                <Box sx={{ display: "flex", gap: 1.5 }}>
                    <Avatar sx={(theme) => ({ bgcolor: theme.palette.primary.main, width: 40, height: 40 })}>
                        U
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
                                    <EmojiEmotionsIcon />
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
                                p: 0,
                                py: 2,
                                // "&:hover": { bgcolor: "rgba(255, 255, 255, 0.03)" },
                                // transition: "background-color 0.2s",
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
                                        {comment.user.verified && <CheckCircleIcon sx={{ fontSize: 16, color: "#1DA1F2" }} />}
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
                                            <ChatBubbleOutlineIcon sx={{ fontSize: 16 }} />
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
                                            <FavoriteIcon sx={{ fontSize: 16 }} />
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
                                            <ShareIcon sx={{ fontSize: 16 }} />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        {index < comments.length - 1 && <Divider />}
                    </Box>
                ))}
            </Box>
        </Box>
    )
}
