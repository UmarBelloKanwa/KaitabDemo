"use client"

import React, { useState, useMemo } from "react"
import {
    Button,
    Typography,
    Box,
    Collapse,
    Paper,
} from "@mui/material"
import {
    ExpandMore,
    ExpandLess,
    ChatBubbleOutline as PostsIcon,
    ImportContacts as ChaptersIcon,
} from "@mui/icons-material";
import SectionPost from "./SectionPost";



export default function ChapterGroup({ chapter }: { chapter: any }) {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <Box sx={{ mb: 0 }}>
            <Paper
                elevation={1}
                sx={{
                    mb: 1,
                    bgcolor: "background.paper",
                }}
            >
                <Button
                    fullWidth
                    variant="text"
                    onClick={() => setCollapsed(!collapsed)}
                    endIcon={collapsed ? <ExpandMore /> : <ExpandLess />}
                    sx={{
                        p: 2,
                        justifyContent: "space-between",
                        textTransform: "none",
                        color: "text.primary",
                    }}
                >
                    <Box sx={{ textAlign: "left" }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>
                            {chapter.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Chapter {chapter.id} • {chapter.sections.length} sections • Pages {chapter.pageNumber}-
                            {chapter.pageNumber + chapter.pagesCount - 1}
                        </Typography>
                    </Box>
                </Button>
            </Paper>

            <Collapse in={!collapsed}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%", m: "auto" }}>
                    {chapter.sections.map((section: any, sectionIndex: number) => (
                        <SectionPost key={section.id} section={section} chapter={chapter} sectionIndex={sectionIndex} />
                    ))}
                </Box>
            </Collapse>
        </Box>
    )
}
