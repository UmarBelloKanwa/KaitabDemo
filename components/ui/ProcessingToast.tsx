"use client"
import React from "react";
import { Paper, IconButton, LinearProgress, Chip, Avatar, Stack } from "@mui/material"
import { MenuBook, Close, NotificationsActive, CheckCircle } from "@mui/icons-material"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

interface ProcessingToastProps {
    isVisible?: boolean
    onClose?: () => void
    title?: string
    description?: string
    estimatedTime?: string
    fileName?: string
    author?: string
    slug: string
}

export default function ProcessingToast({
    isVisible = true,
    onClose,
    title = "Processing Your Data",
    description = "Your form has been submitted successfully",
    estimatedTime = "2-3 minutes",
    author = "Author name",
    fileName = "book_name.pdf",
    slug,
}: ProcessingToastProps) {
    if (!isVisible) return null
    const [uploadTime, setUploadTime] = React.useState("Now");

    React.useEffect(() => {
        // Format the current time
        const now = new Date();
        const formattedTime = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        setUploadTime(formattedTime);
    }, []);

    return (
        <Modal open={isVisible}
            sx={{
                width: "43%",
                m: "auto",
                mt: 11,
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                minWidth: 300,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: isVisible ? "slideInRight 0.4s ease-out" : "slideOutRight 0.3s ease-in",
                "@keyframes slideInRight": {
                    "0%": {
                        transform: "translateX(100%)",
                        opacity: 0,
                    },
                    "100%": {
                        transform: "translateX(0)",
                        opacity: 1,
                    },
                },
                "@keyframes slideOutRight": {
                    "0%": {
                        transform: "translateX(0)",
                        opacity: 1,
                    },
                    "100%": {
                        transform: "translateX(100%)",
                        opacity: 0,
                    },
                },
            }}

        >
            <Paper
                elevation={8}
                sx={{
                    width: "100%",
                    borderRadius: 3,
                    overflow: "hidden",
                    color: "white",
                    position: "relative",
                    boxShadow: "0 12px 40px rgba(102, 126, 234, 0.3)",
                }}
            >
                <Box sx={{ padding: 3 }}>
                    <Stack spacing={2}>
                        {/* Header with close button */}
                        <Box display="flex" alignItems="flex-start" justifyContent="space-between">
                            <Box display="flex" alignItems="center" gap={2}>
                                <Avatar
                                    sx={{
                                        backgroundColor: "rgba(255,255,255,0.2)",
                                        backdropFilter: "blur(10px)",
                                        width: 58,
                                        height: 58,
                                    }}
                                >
                                    <MenuBook sx={{ color: "white", fontSize: 31 }} />
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" fontWeight="600" sx={{ fontSize: "1.1rem" }}>
                                        {title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.9, fontSize: "0.85rem" }}>
                                        {author}
                                    </Typography>
                                </Box>
                            </Box>

                            {true && (
                                <IconButton
                                    onClick={onClose}
                                    size="small"
                                    sx={{
                                        color: "rgba(255,255,255,0.7)",
                                        "&:hover": {
                                            color: "white",
                                            backgroundColor: "rgba(255,255,255,0.1)",
                                        },
                                    }}
                                >
                                    <Close fontSize="small" />
                                </IconButton>
                            )}
                        </Box>

                        {/* Status chips */}
                        <Box display="flex" gap={1} flexWrap="wrap" >
                            <Chip
                                icon={<NotificationsActive sx={{ fontSize: 14 }} />}
                                label="We'll notify you"
                                size="small"
                                sx={{
                                    backgroundColor: "rgba(74, 222, 128, 0.2)",
                                    color: "white",
                                    border: "1px solid rgba(74, 222, 128, 0.3)",
                                    "& .MuiChip-icon": {
                                        color: "#4ade80",
                                    },
                                }}
                            />
                            <Chip
                                label={`Est. ${estimatedTime}`}
                                size="small"
                                sx={{
                                    backgroundColor: "rgba(255,255,255,0.1)",
                                    color: "white",
                                    border: "1px solid rgba(255,255,255,0.2)",
                                }}
                            />
                        </Box>

                        {/* Action message */}
                        <Box
                            sx={{
                                backgroundColor: "rgba(255,255,255,0.1)",
                                borderRadius: 2,
                                padding: 2,
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{
                                    opacity: 0.9,
                                    display: "-webkit-box",
                                    WebkitLineClamp: 1,         // limit to 1 lines
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                                gutterBottom
                            >
                                Description: {description}
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.9 }} gutterBottom>
                                File: {fileName}
                            </Typography>
                            <Typography variant="body2" sx={{ opacity: 0.9 }} gutterBottom>
                                Robook: {slug}
                            </Typography>
                            <Typography variant="caption" sx={{ opacity: 0.8 }}>
                                Uploaded at {uploadTime}
                            </Typography>
                        </Box>

                        {/* Progress indicator */}
                        <Box>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                <Typography variant="body2" fontWeight="500">
                                    Processing...
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                    This may take a few minutes
                                </Typography>
                            </Box>
                            <LinearProgress
                                sx={{
                                    height: 6,
                                    borderRadius: 3,
                                    backgroundColor: "rgba(255,255,255,0.2)",
                                    "& .MuiLinearProgress-bar": {
                                        backgroundColor: "#4ade80",
                                        borderRadius: 3,
                                    },

                                }}
                            />
                        </Box>

                        {/* Action message */}
                        <Box
                            display="flex"
                            alignItems="center"
                            gap={1}
                            sx={{
                                backgroundColor: "rgba(255,255,255,0.1)",
                                borderRadius: 2,
                                padding: 1.5,
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            <CheckCircle sx={{ fontSize: 20, opacity: 0.9 }} />
                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                Feel free to close the box and continue with other tasks. We'll send you a notification once the process is completed.
                            </Typography>
                        </Box>
                    </Stack>
                </Box>
            </Paper>
        </Modal >
    )
}
