"use client";

import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import RobookCard from "@ui/author/RobookCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchBooks } from "@/actions/robook";
import Typography from "@mui/material/Typography";

export default function RobooksList() {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const { data } = useInfiniteQuery({
    queryKey: ["robooks"],
    queryFn: ({ pageParam = 0 }) => fetchBooks(pageParam),
    initialPageParam: 0,
    getNextPageParam: (_last, pages) => pages.length, // load next page if needed
  });

  // Flatten the pages into a single array
  const robooks = data?.pages.flat() ?? [];

  const [showLeft, setShowLeft] = React.useState(false);
  const [showRight, setShowRight] = React.useState(false);
  const [hover, setHover] = React.useState(false);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth);
  };

  React.useEffect(() => {
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
    <Box>
      {/* <Typography variant="h6" sx={{ ml: 2, fontSize: "13px", fontWeight: "bold", color: "text.secondary" }}>
        For you
      </Typography> */}
      <Box
        sx={{ position: "relative", maxWidth: "100%" }}
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
            <ArrowBackIosIcon fontSize="small" />
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
            <Box sx={{ width: 300,  }} key={index}>
              <RobookCard robook={robook} where="home" />
            </Box>
          ))}
        </Box>

        {/* Right Arrow */}
        {hover && showRight && (
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
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}
