"use client";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ChatIcon from "@mui/icons-material/Chat";

import { useRouter } from "next/navigation";


export default function RobookCard({ robook, where }: { robook: any, where: string }) {
    const router = useRouter();

    return (
        <Card
            key={robook.id}
            sx={(theme) => ({
                minWidth: where == "home" ? 300 : "100%",
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
                background: theme.custom.gradient.primary,
            })}
            onClick={() => router.push("/r/atomic")}
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
                        src={robook.avatar}
                        alt={robook.name}
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
                                {robook.name}
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
                            {robook.author}
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
                                        {robook.description}
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
                            <ChatIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                            <Typography variant="caption" color="text.secondary">
                                {robook.interactions}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Card>
    )
}