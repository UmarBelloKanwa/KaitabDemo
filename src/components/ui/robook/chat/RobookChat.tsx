"use client";

import React from "react";
import Box from "@mui/material/Box";
import AskInput from "@/components/ui/robook/chat/AskInput";
import ChatInterface from "@/components/ui/robook/chat/ChatInterface";


export default function RobookChat() {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [containerStyle, setContainerStyle] = React.useState<{ left: number; width: string } | null>(null);

    React.useLayoutEffect(() => {
        function updatePosition() {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setContainerStyle({ left: rect.left, width: rect.width + "px" });
            }
        }

        updatePosition(); // run immediately

        const resizeObserver = new ResizeObserver(() => {
            updatePosition();
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        window.addEventListener("scroll", updatePosition); // if page has horizontal scroll
        window.addEventListener("resize", updatePosition);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("scroll", updatePosition);
            window.removeEventListener("resize", updatePosition);
        };
    }, []);

    // console.log(containerStyle);

    return (
        <Box>
            <Box ref={containerRef} sx={{ width: "100%", pb: { xs: 7 } }}>
                <ChatInterface />
            </Box>

            {containerStyle && (
                <Box
                    sx={{
                        position: "fixed",
                        bottom: 0,
                        left: containerStyle.left,
                        width: containerStyle.width,
                        bgcolor: "background.default",
                        py: 2,
                        px: 1,
                    }}
                >
                    <AskInput borderRadius={2} />
                </Box>
            )}
        </Box>
    );
}
