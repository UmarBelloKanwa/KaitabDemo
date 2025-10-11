"use client"

import React from "react"
import SectionPost from "./SectionPost";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";



export default function ChapterGroup({ chapter }: { chapter: any }) {
    const [collapsed, setCollapsed] = React.useState(false)

    return (
        <Box sx={{ mb: 0 }}>
            <Paper
                elevation={1}
                sx={{
                    mb: 1,
                    borderRadius: 2,
                    bgcolor: "background.paper",
                }}
            >
                <Button
                    fullWidth
                    variant="text"
                    onClick={() => setCollapsed(!collapsed)}
                    endIcon={collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
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
