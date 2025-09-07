"use client";

import { useRef, useState, useEffect } from "react";
import {
    Box,
    IconButton,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import robooks from "@/data/robooksList";
import RobookCard from "@ui/RobookCard";

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
                {robooks.map((robook, index) => (
                    <Box sx={{ width: 300, }} key={index}>
                        <RobookCard robook={robook} where="home" />
                    </Box>
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
