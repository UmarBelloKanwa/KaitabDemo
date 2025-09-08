"use client"

import React, { useState } from "react"
import {
    Box,
    Typography,
    Button,
    Avatar,
    Paper,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    IconButton,
    Divider,
    Container,
    Grid,
    Chip,
    TextField,
    InputAdornment,
    ToggleButton,
    ToggleButtonGroup,
    FormControl,
    Select,
    MenuItem,
    Rating,
    Link,
} from "@mui/material"
import {
    MoreVert as MoreVertIcon,
    Search as SearchIcon,
    Verified as VerifiedIcon,
    Twitter as TwitterIcon,
    LinkedIn as LinkedInIcon,
    Language as WebsiteIcon,
    MenuBook as BookIcon,
} from "@mui/icons-material";

const members = [
    {
        id: 1,
        name: "James Clear",
        handle: "@jamesclear",
        bio: "Author of Atomic Habits. Focused on habits, decision-making, and continuous improvement. I write about human behavior and self-improvement.",
        avatar: "/james-clear.jpg",
        followers: "12.5K",
        topics: ["Habits", "Productivity", "Self-Improvement"],
        verified: true,
        rating: 4.8,
        publicationCount: 23,
        recentPublication: "Atomic Habits",
        genre: "business",
        socialLinks: {
            twitter: "/",
            linkedin: "/",
            website: "/",
        },
    },
    {
        id: 2,
        name: "Hal Elrod",
        handle: "@halelrod",
        bio: "Author of The Miracle Morning. My mission is to elevate the consciousness of humanity, one person and one morning at a time.",
        avatar: "/hal-elrod.jpg",
        followers: "8.2K",
        topics: ["Motivation", "Personal Growth", "Morning Routines"],
        verified: true,
        rating: 4.6,
        publicationCount: 15,
        recentPublication: "The Miracle Morning",
        genre: "business",
        socialLinks: {
            twitter: "/",
            linkedin: "/",
        },
    },
    {
        id: 3,
        name: "Stephen King",
        handle: "@stephenking",
        bio: "Novelist and short story writer. Master of horror, supernatural fiction, suspense, science fiction, and fantasy.",
        avatar: "/stephen-king.jpg",
        followers: "15.7K",
        topics: ["Horror", "Fiction", "Writing"],
        verified: true,
        rating: 4.9,
        publicationCount: 31,
        recentPublication: "Fairy Tale",
        genre: "fiction",
        socialLinks: {
            twitter: "/",
            linkedin: "/",
            website: "/",
        },
    },
    {
        id: 4,
        name: "Brian Tracy",
        handle: "@briantracy",
        bio: "Chairman and CEO of Brian Tracy International. Specializing in the development and training of individuals and organizations.",
        avatar: "/brian-tracy.jpg",
        followers: "9.8K",
        topics: ["Leadership", "Business", "Personal Development"],
        verified: true,
        rating: 4.4,
        publicationCount: 8,
        recentPublication: "Eat That Frog!",
        genre: "business",
        socialLinks: {
            twitter: "/",
            linkedin: "/",
        },
    },
    {
        id: 5,
        name: "Joanne Rowling",
        handle: "@joannerowling",
        bio: "British author, philanthropist, film producer, and screenwriter. Wrote the Harry Potter fantasy series.",
        avatar: "/joanne-rowling.jpg",
        followers: "6.4K",
        topics: ["Fantasy", "Fiction", "Writing"],
        verified: true,
        rating: 4.7,
        publicationCount: 12,
        recentPublication: "The Ink Black Heart",
        genre: "fiction",
        socialLinks: {
            twitter: "/",
            linkedin: "/",
        },
    },
    {
        id: 6,
        name: "Ernest Hemingway.",
        handle: "@ernesthemingway",
        bio: "American novelist, short-story writer, and journalist. Known for his concise and impactful writing style.",
        avatar: "/ernest-hemingway.jpg",
        followers: "11.3K",
        topics: ["Classic Literature", "Journalism", "Fiction"],
        verified: true,
        rating: 4.3,
        publicationCount: 19,
        recentPublication: "The Old Man and the Sea",
        genre: "fiction",
        socialLinks: {
            twitter: "/",
            linkedin: "/",
            website: "/",
        },
    },
]

export default function AuthorsListPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [activeFilter, setActiveFilter] = useState("discover")
    const [genreFilter, setGenreFilter] = useState("all")
    const [sortBy, setSortBy] = useState("followers")

    const filteredAndSortedMembers = members
        .filter((member) => {
            const matchesSearch =
                member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.topics.some((topic) => topic.toLowerCase().includes(searchQuery.toLowerCase()))

            const matchesGenre = genreFilter === "all" || member.genre === genreFilter

            return matchesSearch && matchesGenre
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "followers":
                    return Number.parseFloat(b.followers.replace("K", "")) - Number.parseFloat(a.followers.replace("K", ""))
                case "rating":
                    return b.rating - a.rating
                case "publications":
                    return b.publicationCount - a.publicationCount
                case "alphabetical":
                    return a.name.localeCompare(b.name)
                default:
                    return 0
            }
        })

    return (
        <Container maxWidth="sm" sx={{ py: 2 }}>

            <Paper elevation={0} sx={{ bgcolor: "background.default" }}>
                <Box p={0} >
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <ToggleButtonGroup
                            value={activeFilter}
                            exclusive
                            onChange={(event, newFilter) => {
                                if (newFilter !== null) {
                                    setActiveFilter(newFilter)
                                }
                            }}
                            size="small"
                            sx={{
                                "& .MuiToggleButton-root": {
                                    borderRadius: 20,
                                    px: 3,
                                },
                            }}
                        >
                            <ToggleButton value="discover" sx={{ mr: 1 }}>Discover</ToggleButton>
                            <ToggleButton value="following">Following</ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                    <TextField
                        fullWidth
                        placeholder="Search authors"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 20,
                            }
                        }}
                    />
                    <Box display="flex" gap={1} mt={1}>
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                            <Select
                                value={genreFilter || "all"}
                                onChange={(e) => setGenreFilter(e.target.value || "all")}
                                displayEmpty
                                sx={{ borderRadius: 20 }}
                                size="small"
                            >
                                <MenuItem value="all">All Genres</MenuItem>
                                <MenuItem value="business">Business</MenuItem>
                                <MenuItem value="tech">Technology</MenuItem>
                                <MenuItem value="fiction">Fiction</MenuItem>
                                <MenuItem value="non-fiction">Non-Fiction</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl size="small" sx={{ minWidth: 140 }}>
                            <Select
                                value={sortBy || "followers"}
                                onChange={(e) => setSortBy(e.target.value || "followers")}
                                sx={{ borderRadius: 20 }}
                                size="small"
                            >
                                <MenuItem value="followers">Most Followers</MenuItem>
                                <MenuItem value="rating">Highest Rated</MenuItem>
                                <MenuItem value="publications">Most Publications</MenuItem>
                                <MenuItem value="alphabetical">Alphabetical</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                <List>
                    {filteredAndSortedMembers.map((member, index) => (
                        <React.Fragment key={member.id}>
                            <ListItem
                                alignItems="flex-start"
                                sx={{
                                    py: 2,
                                    px: 0,
                                    "&:hover": {
                                        backgroundColor: "action.hover",
                                    },
                                }}
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
                                                {member.topics.map((topic, topicIndex) => (
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
                        </React.Fragment>
                    ))}
                </List>
            </Paper>
        </Container>
    )
}
