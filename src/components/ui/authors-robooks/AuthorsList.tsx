"use client"

import React from "react"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VerifiedIcon from "@mui/icons-material/Verified";
import BookIcon from "@mui/icons-material/MenuBook";

import { useRouter } from "next/navigation";


export default function AuthorsList({ member, index, filteredAndSortedMembers }: { member: any, index: number, filteredAndSortedMembers: any }) {

    const router = useRouter();

    return (
        <>
            <ListItem
                alignItems="flex-start"
                sx={{
                    py: 2,
                    px: 0,
                    "&:hover": {
                        backgroundColor: "action.hover",
                    },
                }}
                onClick={() => router.push("/jamesclear")}
            >
                <ListItemAvatar>
                    <Avatar src={member.avatar} sx={{ width: 48, height: 48 }} />
                </ListItemAvatar>
                <ListItemText
                    sx={{ mr: { xs: 0, sm: 2 }, }}
                    primary={
                        <Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: -1 }}>
                                    <Typography variant="subtitle1" sx={{ fontSize: "0.95rem", display: "flex", alignItems: "center" }}>
                                        {member.name} {member.verified && <VerifiedIcon sx={{ fontSize: "0.9rem", color: "primary.main", ml: 0.5 }} />}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" sx={{ mt: -0.5 }}>
                                        {member.handle}
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        sx={{
                                            borderRadius: 20,
                                            textTransform: "none",
                                            minWidth: 80,
                                        }}
                                    >
                                        Follow
                                    </Button>
                                    <IconButton size="small">
                                        <MoreVertIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Typography variant="body2" sx={{ mt: 0.5 }}>
                                {member.bio}
                            </Typography>

                            <Box display="flex" gap={0.5} mb={1} mt={1} flexWrap="wrap">
                                {member.topics.map((topic: string, topicIndex: number) => (
                                    <Chip
                                        key={topicIndex}
                                        label={topic}
                                        size="small"
                                        variant="outlined"
                                        sx={{
                                            fontSize: "0.75rem",
                                            borderRadius: 10,
                                        }}
                                    />
                                ))}
                            </Box>

                            <Box display="flex" alignItems="center" gap={2} mb={1}>
                                <Box display="flex" alignItems="center" gap={0.5}>
                                    <Rating value={member.rating} precision={0.1} size="small" readOnly />
                                    <Typography variant="body2" color="text.secondary">
                                        {member.rating}
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" gap={0.5} >
                                    <BookIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                                    <Typography variant="caption" color="text.secondary">
                                        {member.publicationCount} publications
                                    </Typography>
                                </Box>
                            </Box>


                            <Typography variant="caption" color="text.secondary">
                                {/* • */} {member.followers} followers
                            </Typography>


                        </Box>
                    }
                />

            </ListItem>
            {index < filteredAndSortedMembers.length - 1 && <Divider />}
        </>
    )
}