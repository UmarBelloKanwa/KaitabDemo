import { Box, Paper, Typography, Avatar, IconButton } from "@mui/material";
import {
    Refresh as RefreshIcon,
    ThumbUp as ThumbUpIcon,
    ThumbDown as ThumbDownIcon,
} from "@mui/icons-material";

const messages = [
    {
        id: 0,
        sender: "book",
        name: "Atomic Habits",
        avatar: "/atomic-habits.jpg",
        text: "Hello! I’m Atomic Habits, a book brought to life with the author’s insights and reasoning. I understand your goals, challenges, and habits just like James Clear would. I’m here to guide you in building better habits, breaking bad ones, and creating systems that work for your life. What would you like to start with?"
    },
    {
        id: 1,
        sender: "user",
        name: "Umar Bello Kanwa",
        avatar: "U",
        text: "Who is you in short?",
    },
    {
        id: 2,
        sender: "book",
        name: "Atomic Habits",
        avatar: "/atomic-habits.jpg",
        text: "I’m Atomic Habits, a book that understands you like its author. I’ll help you build good habits and break bad ones.",
    },
    {
        id: 3,
        sender: "user",
        name: "Umar Bello Kanwa",
        avatar: "U",
        text: "How can you understand me like the author?",
    },
    {
        id: 4,
        sender: "book",
        name: "Atomic Habits",
        avatar: "/atomic-habits.jpg",
        text: "Because I carry the author’s brain and principles in digital form. I adapt advice based on your questions and goals.",
    },
];

const ChatInterface = () => {
    return (
        <Paper
            sx={(theme) => ({
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                p: 2,
                px: 1,
                margin: "auto",
                mt: 0,
                width: "100%",
            })}
            elevation={0}
        >
            {messages.map((msg) => (
                <Box
                    key={msg.id}
                    sx={{
                        display: "flex",
                        justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                        alignItems: "flex-start",
                        mb: msg.sender === "user" ? 3 : 1.5,
                    }}
                >
                    {/* Message Wrapper */}
                    <Box sx={{ textAlign: msg.sender === "user" ? "right" : "left", mr: msg.sender === "user" ? 0 : 1 }}>
                        {/* Header (name + avatar) */}
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexDirection: msg.sender === "user" ? "row-reverse" : "row" }}>
                            <Avatar
                                src={msg.sender === "book" ? msg.avatar : undefined}
                                sx={(theme) => ({
                                    bgcolor: msg.sender === "user" ? theme.palette.primary.main : theme.palette.secondary.main,
                                    width: 20,
                                    height: 20,
                                    fontSize: "0.6rem",
                                    fontWeight: 600,
                                    borderRadius: msg.sender === "book" ? 0.5 : "50%",
                                })}
                            >
                                {msg.sender === "user" ? msg.avatar : ""}
                            </Avatar>
                            <Typography variant="caption" sx={{ color: "text.primary", fontWeight: 500 }}>
                                {msg.name}
                            </Typography>
                        </Box>

                        {/* Message bubble */}
                        <Box
                            sx={{
                                mt: 0.5,
                                display: "flex",
                                justifyContent: msg.sender === "user" ? "flex-end" : "flex-start", // position bubble
                                px: 1, // padding for spacing from edges
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: msg.sender === "user" ? "flex-end" : "flex-start",
                                    width: "fit-content",
                                    maxWidth: msg.sender === "user" ? "auto" : { xs: "100%", sm: "70%" },// prevents too wide bubbles
                                }}
                            >
                                <Paper
                                    sx={{
                                        p: 1.5,
                                        textAlign: "left",
                                        borderRadius: 1.5,
                                        maxWidth: msg.sender === "user" ? "100%" : "auto",
                                        wordBreak: "break-word" // ensure long words break nicely
                                    }}
                                >
                                    <Typography variant="subtitle1" color="text.secondary">
                                        {msg.text}
                                    </Typography>
                                </Paper>

                                {msg.sender === "book" && (
                                    <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
                                        <IconButton size="small">
                                            <RefreshIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small">
                                            <ThumbUpIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small">
                                            <ThumbDownIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                )}
                            </Box>
                        </Box>

                    </Box>
                </Box>
            ))}
        </Paper>
    );
};

export default ChatInterface;
