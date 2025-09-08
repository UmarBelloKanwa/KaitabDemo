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
} from "@mui/icons-material"

const members = [
    {
        id: 1,
        name: "Daniele Hagen",
        handle: "@DanieleHagen",
        bio: "marketer, yogi, auntie, handbag snob, middle sister, vegetable lover, grammar freak",
        avatar: "/professional-woman-brown-hair.png",
        followers: "12.5K",
        topics: ["Marketing", "Wellness", "Lifestyle"],
        verified: true,
        rating: 4.8,
        publicationCount: 23,
        recentPublication: "The Mindful Marketer's Guide",
        genre: "business",
        socialLinks: {
            twitter: "https://twitter.com/DanieleHagen",
            linkedin: "https://linkedin.com/in/danielehagen",
            website: "https://danielehagen.com",
        },
    },
    {
        id: 2,
        name: "Corey O'Loughlin",
        handle: "@coreyolo",
        bio: "Owner of Prep Obsessed. Marketing nerd. Lover of pink and green. Boston native. Mom to the most adorable ginger.",
        avatar: "/smiling-redhead.png",
        followers: "8.2K",
        topics: ["Marketing", "Business", "Parenting"],
        verified: true,
        rating: 4.6,
        publicationCount: 15,
        recentPublication: "Prep Obsessed: Marketing Strategies",
        genre: "business",
        socialLinks: {
            twitter: "https://twitter.com/coreyolo",
            linkedin: "https://linkedin.com/in/coreyoloughlin",
        },
    },
    {
        id: 3,
        name: "Veronica Jarski",
        handle: "@Veronica_Jarski",
        bio: "Wordsmith at a tech company & moonlighting artist. Passionate about crafting content that connects & converts. Also, alliteration apparently.",
        avatar: "/professional-woman-dark-hair.png",
        followers: "15.7K",
        topics: ["Content Marketing", "Tech", "Writing"],
        verified: true,
        rating: 4.9,
        publicationCount: 31,
        recentPublication: "Content That Converts",
        genre: "tech",
        socialLinks: {
            twitter: "https://twitter.com/Veronica_Jarski",
            linkedin: "https://linkedin.com/in/veronicajarski",
            website: "https://veronicajarski.com",
        },
    },
    {
        id: 4,
        name: "Valerie Witt",
        handle: "@valerie_witt",
        bio: "Director of MarketingProfs PRO membership and MarketingProfs University; love international travel, words, flying, skiing, hiking, dogs, home remodeling.",
        avatar: "/blonde-woman-headshot.png",
        followers: "9.8K",
        topics: ["Marketing Education", "Travel", "Leadership"],
        verified: false,
        rating: 4.4,
        publicationCount: 8,
        recentPublication: "Marketing Education Handbook",
        genre: "business",
        socialLinks: {
            twitter: "https://twitter.com/valerie_witt",
            linkedin: "https://linkedin.com/in/valeriewitt",
        },
    },
    {
        id: 5,
        name: "Courtney Bosch",
        handle: "@courtneybosch",
        bio: "Demand Gen Manager @TransActTech #RestaurantTech #ABM #AgileMarketer #Jets & #UFC fan. Mama of 3 powered by coffee, wine, & yoga. Aka: Courtney Bosch-Tanguy",
        avatar: "/woman-with-brown-hair-marketing-professional.jpg",
        followers: "6.4K",
        topics: ["Demand Generation", "B2B Marketing", "Restaurant Tech"],
        verified: true,
        rating: 4.7,
        publicationCount: 12,
        recentPublication: "B2B Demand Generation Playbook",
        genre: "tech",
        socialLinks: {
            twitter: "https://twitter.com/courtneybosch",
            linkedin: "https://linkedin.com/in/courtneybosch",
        },
    },
    {
        id: 6,
        name: "Jim DeLorenzo",
        handle: "@JimDeLo",
        bio: "Marketing | Cybersecurity | Beer | Tech | Sports | Dogs Opinions are my own",
        avatar: "/bearded-man-headshot.png",
        followers: "11.3K",
        topics: ["Cybersecurity", "Marketing", "Tech"],
        verified: false,
        rating: 4.3,
        publicationCount: 19,
        recentPublication: "Cybersecurity for Marketers",
        genre: "tech",
        socialLinks: {
            twitter: "https://twitter.com/JimDeLo",
            linkedin: "https://linkedin.com/in/jimdelorenzo",
            website: "https://jimdelorenzo.com",
        },
    },
]

export default function TwitterListPage() {
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
        <Container maxWidth="lg" sx={{ py: 2 }}>
            <Grid container spacing={3}>
                {/* Sidebar */}
                <Grid item xs={12} md={3}>
                    <Paper elevation={1} sx={{ p: 3, mb: 2 }}>
                        <Box display="flex" alignItems="center" mb={2}>
                            <Avatar src="/professional-woman-avatar.png" sx={{ width: 40, height: 40, mr: 2 }} />
                            <Box>
                                <Typography variant="h6" fontWeight="bold">
                                    MarketingProfsMembers
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    A public list by Ann Handley
                                </Typography>
                            </Box>
                        </Box>

                        <Box display="flex" gap={3} mb={2}>
                            <Box textAlign="center">
                                <Typography variant="h6" fontWeight="bold">
                                    80
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Members
                                </Typography>
                            </Box>
                            <Box textAlign="center">
                                <Typography variant="h6" fontWeight="bold">
                                    238
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Subscribers
                                </Typography>
                            </Box>
                        </Box>

                        <Button
                            variant="outlined"
                            fullWidth
                            sx={{
                                borderRadius: 20,
                                textTransform: "none",
                                fontWeight: "bold",
                                mb: 3,
                            }}
                        >
                            Subscribe
                        </Button>

                        <List dense>
                            <ListItem button>
                                <ListItemText primary="Tweets" />
                            </ListItem>
                            <ListItem button selected>
                                <ListItemText primary="List members" />
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary="List subscribers" />
                            </ListItem>
                        </List>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6" gutterBottom>
                            More lists by{" "}
                            <Typography component="span" color="primary" fontWeight="bold">
                                @MarketingProfs
                            </Typography>
                        </Typography>
                        <Typography variant="body2" color="primary" sx={{ cursor: "pointer", mb: 1 }}>
                            • View all
                        </Typography>
                        <Typography variant="body2" color="primary" sx={{ cursor: "pointer", mb: 1 }}>
                            MarketingProfsMembers
                        </Typography>
                        <Typography variant="body2" color="primary" sx={{ cursor: "pointer" }}>
                            ProfsPeople
                        </Typography>
                    </Paper>
                </Grid>

                {/* Main Content */}
                <Grid item xs={12} md={9}>
                    <Paper elevation={1}>
                        <Box p={2} borderBottom={1} borderColor="divider">
                            <Typography variant="h5" fontWeight="bold" mb={2}>
                                List members
                            </Typography>

                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
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
                                            textTransform: "none",
                                            fontWeight: "bold",
                                            borderRadius: 20,
                                            px: 3,
                                            border: "1px solid #e1e8ed",
                                            "&.Mui-selected": {
                                                backgroundColor: "#1976d2",
                                                color: "white",
                                                "&:hover": {
                                                    backgroundColor: "#1565c0",
                                                },
                                            },
                                        },
                                    }}
                                >
                                    <ToggleButton value="discover">Discover</ToggleButton>
                                    <ToggleButton value="following">Following</ToggleButton>
                                </ToggleButtonGroup>
                            </Box>

                            <Box display="flex" gap={2} mb={2}>
                                <FormControl size="small" sx={{ minWidth: 120 }}>
                                    <Select
                                        value={genreFilter || "all"}
                                        onChange={(e) => setGenreFilter(e.target.value || "all")}
                                        displayEmpty
                                        sx={{ borderRadius: 20 }}
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
                                    >
                                        <MenuItem value="followers">Most Followers</MenuItem>
                                        <MenuItem value="rating">Highest Rated</MenuItem>
                                        <MenuItem value="publications">Most Publications</MenuItem>
                                        <MenuItem value="alphabetical">Alphabetical</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            <TextField
                                fullWidth
                                placeholder="Search people"
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
                                        backgroundColor: "#f7f9fa",
                                        "& fieldset": {
                                            border: "1px solid #e1e8ed",
                                        },
                                        "&:hover fieldset": {
                                            border: "1px solid #1976d2",
                                        },
                                        "&.Mui-focused fieldset": {
                                            border: "2px solid #1976d2",
                                        },
                                    },
                                }}
                            />
                        </Box>

                        <List>
                            {filteredAndSortedMembers.map((member, index) => (
                                <React.Fragment key={member.id}>
                                    <ListItem
                                        alignItems="flex-start"
                                        sx={{
                                            py: 2,
                                            px: 3,
                                            "&:hover": {
                                                backgroundColor: "action.hover",
                                            },
                                        }}
                                    >
                                        <ListItemAvatar>
                                            <Avatar src={member.avatar} sx={{ width: 48, height: 48 }} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            sx={{ mr: 2 }}
                                            primary={
                                                <Box>
                                                    <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                                                        <Typography variant="subtitle1" fontWeight="bold">
                                                            {member.name}
                                                        </Typography>
                                                        {member.verified && <VerifiedIcon sx={{ fontSize: 16, color: "#1976d2" }} />}
                                                        <Typography variant="body2" color="text.secondary">
                                                            {member.handle}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            • {member.followers} followers
                                                        </Typography>
                                                    </Box>

                                                    <Box display="flex" alignItems="center" gap={2} mb={1}>
                                                        <Box display="flex" alignItems="center" gap={0.5}>
                                                            <Rating value={member.rating} precision={0.1} size="small" readOnly />
                                                            <Typography variant="body2" color="text.secondary">
                                                                {member.rating}
                                                            </Typography>
                                                        </Box>
                                                        <Box display="flex" alignItems="center" gap={0.5}>
                                                            <BookIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                                                            <Typography variant="body2" color="text.secondary">
                                                                {member.publicationCount} publications
                                                            </Typography>
                                                        </Box>
                                                    </Box>

                                                    <Typography variant="body2" color="primary" sx={{ mb: 1, fontStyle: "italic" }}>
                                                        Latest: "{member.recentPublication}"
                                                    </Typography>

                                                    <Box display="flex" gap={0.5} mb={1}>
                                                        {member.topics.map((topic, topicIndex) => (
                                                            <Chip
                                                                key={topicIndex}
                                                                label={topic}
                                                                size="small"
                                                                variant="outlined"
                                                                sx={{
                                                                    fontSize: "0.75rem",
                                                                    height: 20,
                                                                    borderRadius: 10,
                                                                }}
                                                            />
                                                        ))}
                                                    </Box>

                                                    <Box display="flex" gap={1} mt={1}>
                                                        {member.socialLinks.twitter && (
                                                            <Link href={member.socialLinks.twitter} target="_blank" rel="noopener">
                                                                <TwitterIcon sx={{ fontSize: 16, color: "#1976d2" }} />
                                                            </Link>
                                                        )}
                                                        {member.socialLinks.linkedin && (
                                                            <Link href={member.socialLinks.linkedin} target="_blank" rel="noopener">
                                                                <LinkedInIcon sx={{ fontSize: 16, color: "#0077b5" }} />
                                                            </Link>
                                                        )}
                                                        {member.socialLinks.website && (
                                                            <Link href={member.socialLinks.website} target="_blank" rel="noopener">
                                                                <WebsiteIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                                                            </Link>
                                                        )}
                                                    </Box>
                                                </Box>
                                            }
                                            secondary={
                                                <Typography variant="body2" sx={{ mt: 0.5 }}>
                                                    {member.bio}
                                                </Typography>
                                            }
                                        />
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    borderRadius: 20,
                                                    textTransform: "none",
                                                    fontWeight: "bold",
                                                    minWidth: 80,
                                                }}
                                            >
                                                Follow
                                            </Button>
                                            <IconButton size="small">
                                                <MoreVertIcon />
                                            </IconButton>
                                        </Box>
                                    </ListItem>
                                    {index < filteredAndSortedMembers.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}
