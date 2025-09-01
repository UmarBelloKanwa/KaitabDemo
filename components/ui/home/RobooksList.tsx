"use client";

import { useRef, useState, useEffect } from "react";
import {
    Box,
    Chip,
    Card,
    CardContent,
    Typography,
    Avatar,
    IconButton,
} from "@mui/material";
import { Chat, ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const robooks = [
    {
        id: 1,
        name: "Atomic Habits",
        author: "Personal Development",
        description: "A book for building habits",
        avatar: "/atomic-habits.jpg",
        interactions: "21.6k",
    },
    {
        id: 2,
        name: "No, excuse the power of self discipline",
        author: "Discipline",
        description: "Book of no excuse the power of self discipline",
        avatar: "/no-excuse.png",
        interactions: "320.5k",
    },
    {
        id: 3,
        name: "Miracles Morning",
        author: "Lifestyle",
        description: "A book by Hal Elrod for changing life",
        avatar: "/miracle-morning.jpg",
        interactions: "33.7k",
    },
    {
        id: 4,
        name: "Zero to one",
        author: "Startup",
        description: "A book for building and innovations new things",
        avatar: "/zero-to-one.jpg",
        interactions: "21.6k",
    },
    {
        id: 5,
        name: "Startup playbook",
        author: "Y combinator",
        description: "A book for building and learning to create startup",
        avatar: "/startup-playbook.jpg",
        interactions: "21.6k",
    },
];

export default function RobooksList() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);
    const [hover, setHover] = useState(false);

    const checkScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeft(scrollLeft > 0);
        setShowRight(scrollLeft + clientWidth < scrollWidth);
    };

    useEffect(() => {
        checkScroll();
        const handleResize = () => checkScroll();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;
        const scrollAmount = 320 + 16; // card width + gap
        scrollRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <Box
            sx={{ position: "relative" }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {/* Left Arrow */}
            {hover && showLeft && (
                <IconButton
                    onClick={() => scroll("left")}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: 8,
                        transform: "translateY(-50%)",
                        zIndex: 2,
                        bgcolor: "background.paper",
                        boxShadow: 2,
                        "&:hover": { bgcolor: "background.paper" },
                    }}
                >
                    <ArrowBackIos fontSize="small" />
                </IconButton>
            )}

            {/* Scrollable List */}
            <Box
                ref={scrollRef}
                onScroll={checkScroll}
                sx={{
                    display: "flex",
                    gap: 1,
                    overflowX: "auto",
                    scrollBehavior: "smooth",
                    scrollbarWidth: "none", // Firefox
                    "&::-webkit-scrollbar": { display: "none" }, // Chrome/Safari
                }}
            >
                {robooks.map((character) => (
                    <Card
                        key={character.id}
                        sx={(theme) => ({
                            width: 300,
                            flexShrink: 0, // ✅ Prevent shrinking in flex layouts
                            flexGrow: 0,   // ✅ Prevent growing in flex layouts
                            height: 115,
                            cursor: "pointer",
                            border: `1px solid ${theme.palette.divider}`,
                            "&:hover": { transform: "translateY(-2px)" },
                            transition: "transform 0.2s",
                            overflow: "hidden",
                            borderRadius: 1.5,
                            position: "relative",
                            p: 0.5,
                            background: "linear-gradient(90deg, #8a5cf644, #ec4899)",

                        })}
                        elevation={0}
                    >
                        <Avatar
                            src="/two.png"
                            sx={{ width: 33, height: 33, borderRadius: 0, position: "absolute", right: 1, bottom: 1, }} />
                        <Box sx={{ display: "flex", height: "100%", width: "100%" }}>
                            <Box
                                sx={{
                                    width: 110,
                                    height: "100%",
                                    flexShrink: 0,
                                    borderRadius: "12px 0 0 12px",
                                    overflow: "hidden",
                                    p: 1,
                                }}
                            >
                                <Box
                                    component="img"
                                    src={character.avatar}
                                    alt={character.name}
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: 1.1
                                    }}
                                />
                            </Box>

                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    p: 1,
                                    pl: 0,
                                    width: "100%",
                                    minWidth: 0,
                                    height: "100%",
                                }}
                            >
                                <Box sx={{ flex: 1, minHeight: 0, pb: 1 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                                        <Typography
                                            variant="subtitle1"
                                            component="div"
                                            sx={{
                                                fontSize: "0.95rem",
                                                lineHeight: 1.2,
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "wrap",
                                            }}
                                        >
                                            {character.name}
                                        </Typography>
                                    </Box>

                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            mb: 1,
                                            fontSize: "0.75rem",
                                        }}
                                    >
                                        {character.author}
                                    </Typography>

                                    {/* <Typography
                                        variant="body2"
                                        color="text.primary"
                                        sx={{
                                            fontSize: "0.8rem",
                                            lineHeight: 1.3,
                                            overflow: "hidden",
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            color: "text.secondary"
                                        }}
                                    >
                                        {character.description}
                                    </Typography> */}
                                </Box>

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
                                    {/* Follow Button */}
                                    <IconButton
                                        size="small"
                                        sx={{
                                            px: 1.5,
                                            py: 0.5,
                                            fontSize: "0.75rem",
                                            color: "text.secondary",
                                            borderRadius: 1,
                                            border: (theme) => `1px solid ${theme.palette.divider}`,
                                            borderColor: "grey.800",
                                            bgcolor: "background.paper",
                                            "&:hover": {
                                                bgcolor: "primary.main",
                                                color: "white",
                                            },
                                        }}
                                    >
                                        Follow
                                    </IconButton>

                                    {/* Interactions */}
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        <Chat sx={{ fontSize: 14, color: "text.secondary" }} />
                                        <Typography variant="caption" color="text.secondary">
                                            {character.interactions}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Card>
                ))}

            </Box>

            {/* Right Arrow */}
            {
                hover && showRight && (
                    <IconButton
                        onClick={() => scroll("right")}
                        sx={{
                            position: "absolute",
                            top: "50%",
                            right: 8,
                            transform: "translateY(-50%)",
                            zIndex: 2,
                            bgcolor: "background.paper",
                            boxShadow: 2,
                            "&:hover": { bgcolor: "background.paper" },
                        }}
                    >
                        <ArrowForwardIos fontSize="small" />
                    </IconButton>
                )
            }
        </Box >
    );
}
