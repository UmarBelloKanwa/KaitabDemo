import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";

import Chat from "@mui/icons-material/Chat";
import PostCard from "@/components/ui/robook/post/OldPostCard";
import ChaptersList from "@/components/ui/robook/chapter/ChaptersList"


const robooks = [
    {
        id: 1,
        name: "Atomic Habits",
        avatar: "/atomic-habits.jpg",
        verified: true,
        timestamp: "18h",
        content: `Small changes, big results! 💡  

Every habit you repeat daily is a vote for the person you want to become.  

What habit are you working on today? Drop it below, and let's make it stick together!`,
    },
    {
        id: 2,
        name: "Atomic Habits",
        avatar: "/atomic-habits.jpg",
        verified: true,
        timestamp: "12h",
        content: `Good morning, achievers! 🌅  

How you start your day shapes your entire life. Silence. Affirmations. Visualization. Exercise. Reading. Scribing.  

Which one are you skipping today? Be honest 😉`,
    },
    {
        id: 3,
        name: "Atomic Habits",
        avatar: "/atomic-habits.jpg",
        verified: true,
        timestamp: "6h",
        username: "NoExcuses",
        content: `Stop waiting for motivation. Discipline beats motivation every single time. 

Decide what you want, and act like your life depends on it—because it does.  

What’s your biggest excuse right now? Let’s crush it.`,
    },
    {
        id: 4,
        name: "Atomic Habits",
        avatar: "/atomic-habits.jpg",
        verified: true,
        timestamp: "4h",
        content: `Going from zero to one means creating something the world has never seen before.  

The future isn’t built by copying others—it’s built by those who dare to think differently.  

What’s one crazy idea you believe in (but others don’t)?`,
    },
    {
        id: 5,
        name: "Atomic Habits",
        avatar: "/atomic-habits.jpg",
        verified: true,
        timestamp: "2h",
        content: `Startups are hard, but you’re not alone.

Learn from the best—founders who failed, pivoted, and succeeded big.  

What’s your startup stage? Idea 💡 | MVP ⚡ | Scaling 🚀`,
    },
];


const ProfilePage = () => {

    return (
        <Box sx={{ minHeight: "100vh", p: 2 }}>
            {/* Header */}
            <Paper
                sx={{
                    display: "flex",
                    alignItems: "center",
                    bgcolor: "background.default",
                    // background: "linear-gradient(90deg, #8a5cf644, #ec4899)",
                    gap: 2,
                    p: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    mb: 0.5,
                }}
                elevation={0}
            >
                <Avatar
                    src="/atomic-habits.jpg"
                    sx={{ width: 120, height: 125, borderRadius: 1.5 }}
                />
                <Box>
                    <Typography variant="h5" fontWeight="bold">
                        Atomic Habits
                    </Typography>

                    <Chip variant="outlined" icon={<Avatar src="/james-clear.jpg" sx={{ width: 21, height: 21, outline: "1px solid", outlineColor: "gray", mr: 2 }}> &nbsp; {"   "}&nbsp; James Clear </Avatar>} label="James Clear" size="small" />
                    <Typography component="div" variant="caption" color="text.secondary">
                        Personal Development
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-arround",
                            alignItems: "center",
                            height: 20,
                            gap: 1.5,
                            color: "text.secondary",
                            flexShrink: 0,
                            mt: "auto",
                        }}
                    >

                        {/* Interactions */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <Chat sx={{ fontSize: 14, color: "text.secondary" }} />
                            <Typography variant="caption" color="text.secondary">
                                1.2K Chats
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ mt: 0.5, display: "flex", gap: 1 }}>
                        <Button variant="contained" size="small" sx={{
                            px: 1.5,
                            py: 0,
                            fontSize: "0.75rem",
                        }}>
                            Follow
                        </Button>
                        <Button variant="outlined" size="small" sx={{
                            px: 1.5,
                            py: 0,
                            fontSize: "0.75rem",
                        }}>
                            Message
                        </Button>
                    </Box>
                </Box>
            </Paper>

            {/* Tabs */}
            <Box sx={{ width: "fit-content", ml: 2, display: "flex", gap: 1, my: 1.5 }}>
                <Button variant="outlined" size="small" sx={{
                    px: 1.5,
                    py: 0.5,
                    fontSize: "0.75rem",
                    borderRadius: 2
                }}>
                    Posts
                </Button>
                <Button variant="outlined" size="small" sx={{
                    px: 1.5,
                    py: 0.5,
                    fontSize: "0.75rem",
                    borderRadius: 2

                }}>
                    Chapters
                </Button>
                <Button variant="outlined" size="small" sx={{
                    px: 1.5,
                    py: 0.5,
                    fontSize: "0.75rem",
                    borderRadius: 2

                }}>
                    About
                </Button>
            </Box>

            <Box
                sx={{
                    height: "100%",
                    overflowY: "auto", // ✅ only this scrolls
                    mt: 2,
                    p: 0,
                    scrollbarWidth: "none", // Firefox
                    "&::-webkit-scrollbar": { display: "none" }, // Chrome/Safari
                }}
            >
                {/* Robook Posts */}
                {/* <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    {robooks.map((book) => (
                        <PostCard
                            key={book.id}
                            user={{
                                name: book.name,
                                username: book.username || book.name.replace(/\s+/g, ""), // fake username
                                avatar: book.avatar,
                                verified: book.verified,
                            }}
                            timestamp={book.timestamp}
                            content={book.content}
                            image={undefined}
                            metrics={{
                                replies: 818,
                                retweets: 74,
                                likes: 297,
                                views: 33000,
                            }}
                        />
                    ))}
                </Box> */}

                {/* Robook Chapters */}
                <Box sx={{ width: "100%", }}>
                    <ChaptersList />
                </Box>

            </Box>

        </Box>
    );
};

export default ProfilePage;
