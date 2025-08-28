"use client";

import { useRef, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const categories = [
    "All",
    "Following",
    "New Bestsellers",
    "Culture",
    "Technology",
    "Business",
    "U.S. Politics",
    "Finance",
    "Food & Drink",
    "Sports",
    "Art & Illustration",
    "World Politics",
    "Health",
];

export default function CategoriesList() {
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
        const scrollAmount = 200; // adjust scroll step
        scrollRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <Box
            sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                mb: 0.5,
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {/* Left Arrow */}
            {hover && showLeft && (
                <IconButton
                    onClick={() => scroll("left")}
                    sx={{
                        position: "absolute",
                        left: 0,
                        zIndex: 1,
                        bgcolor: "background.paper",
                        boxShadow: 2,
                        "&:hover": { bgcolor: "background.paper" },
                    }}
                >
                    <ArrowBackIosNewIcon fontSize="small" />
                </IconButton>
            )}

            {/* Scrollable Container */}
            <Box
                ref={scrollRef}
                onScroll={checkScroll}
                sx={{
                    display: "flex",
                    gap: 1,
                    py: 1,
                    overflowX: "auto",
                    scrollbarWidth: "none", // Firefox
                    "&::-webkit-scrollbar": { display: "none" }, // Chrome/Safari
                    scrollBehavior: "smooth",
                }}
            >
                {categories.map((category) => (
                    <Chip key={category} label={category} sx={(theme) => ({ borderRadius: 0.7, bgcolor: "background.paper", border: `1px solid ${theme.palette.divider}`, })} />
                ))}
            </Box>

            {/* Right Arrow */}
            {hover && showRight && (
                <IconButton
                    onClick={() => scroll("right")}
                    sx={{
                        position: "absolute",
                        right: 0,
                        zIndex: 1,
                        bgcolor: "background.paper",
                        boxShadow: 2,
                        "&:hover": { bgcolor: "background.paper" },
                    }}
                >
                    <ArrowForwardIosIcon fontSize="small" />
                </IconButton>
            )}
        </Box>
    );
}
