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
import { useRouter } from "next/navigation";
import { members } from "@/data/data";
import AuthorsList from "@/components/ui/authors-robooks/AuthorsList";
import RobookCard from "@ui/RobookCard";
import robooks from "@/data/robooksList";

export function Page({ page }: { page: "robooks" | "authors" }) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("")
    const [activeFilter, setActiveFilter] = useState("discover")
    const [genreFilter, setGenreFilter] = useState("all")
    const [sortBy, setSortBy] = useState("followers")

    const [activePage, setActivePage] = React.useState(page);

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
        <Container maxWidth="sm" sx={{ my: { sm: 2 } }}>
            <Paper elevation={0} sx={{ bgcolor: "background.default" }}>
                <Box p={0} >
                    <Box display="flex" mb={1} sx={{ gap: 0, borderRadius: 3 }}>
                        <ToggleButtonGroup
                            value={activePage}
                            exclusive
                            onChange={(_, newPage: "robooks" | "authors") => {
                                if (newPage !== null) {
                                    setActivePage(newPage);
                                    router.replace(`/${newPage}`);  // <-- update browser route
                                }
                            }}
                            size="small"
                        >
                            <ToggleButton value="authors" > Authors </ToggleButton>
                            <ToggleButton value="robooks"> Robooks </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                    <TextField
                        fullWidth
                        placeholder="Search kaitab"
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
                    <Box display="flex" gap={1} mt={1} flexWrap={"wrap"}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
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
                        <FormControl size="small" sx={{ minWidth: 120 }}>
                            <Select
                                value={genreFilter || "all"}
                                onChange={(e) => setGenreFilter(e.target.value || "all")}
                                displayEmpty
                                sx={{ borderRadius: 20, fontSize: "small" }}
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
                                sx={{ borderRadius: 20, fontSize: "small" }}
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
                {page == "authors" && (
                    <List>
                        {filteredAndSortedMembers.map((member, index) => (
                            <React.Fragment key={member.id}>
                                <AuthorsList
                                    member={member}
                                    index={index}
                                    filteredAndSortedMembers={filteredAndSortedMembers}
                                />
                            </React.Fragment>
                        ))}
                    </List>)
                }
                {page == "robooks" && (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2, }}>
                        {robooks.map((robook: any, index) => (
                            <React.Fragment key={index}>
                                <RobookCard robook={robook} where="profile" />
                            </React.Fragment>
                        ))}
                    </Box>
                )}
            </Paper>
        </Container>
    )
}

export default function Authors() {
    return <Page page="authors" />
}
