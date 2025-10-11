import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import ShareIcon from "@mui/icons-material/Share";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BarChartIcon from "@mui/icons-material/BarChart";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";


const chapters = [
    { id: 1, title: "Introduction – The Surprising Power of Atomic Habits", reads: "1.1k" },

    // Part 1
    { id: 2, title: "The 1% Rule: Why Small Habits Make a Big Difference", reads: "1.2k" },
    { id: 3, title: "How Your Habits Shape Your Identity (and Vice Versa)", reads: "1.3k" },
    { id: 4, title: "How to Build Better Habits in 4 Simple Steps", reads: "1.4k" },

    // Part 2
    { id: 5, title: "The Man Who Didn’t Look Right", reads: "1.5k" },
    { id: 6, title: "The Best Way to Start a New Habit", reads: "1.6k" },
    { id: 7, title: "Motivation Is Overrated; Environment Often Matters More", reads: "1.7k" },
    { id: 8, title: "The Secret to Self-Control", reads: "1.8k" },

    // Part 3
    { id: 9, title: "How to Make a Habit Irresistible", reads: "1.9k" },
    { id: 10, title: "The Role of Family and Friends in Shaping Your Habits", reads: "2.0k" },

    // Part 4
    { id: 11, title: "Walk Slowly, but Never Backward", reads: "2.1k" },
    { id: 12, title: "The Law of Least Effort", reads: "2.2k" },
    { id: 13, title: "How to Stop Procrastinating by Using the Two-Minute Rule", reads: "2.3k" },
    { id: 14, title: "How to Make Good Habits Inevitable and Bad Habits Impossible", reads: "2.4k" },

    // Part 5
    { id: 15, title: "The Cardinal Rule of Behavior Change", reads: "2.5k" },
    { id: 16, title: "How to Stick with Good Habits Every Day", reads: "2.6k" },
    { id: 17, title: "How an Accountability Partner Can Change Everything", reads: "2.7k" },

    // Advanced Tactics
    { id: 18, title: "The Truth About Talent (When Genes Matter and When They Don’t)", reads: "2.8k" },
    { id: 19, title: "The Goldilocks Rule: How to Stay Motivated in Life and Work", reads: "2.9k" },
    { id: 20, title: "The Downside of Creating Good Habits", reads: "3.0k" },

    // Conclusion
    { id: 21, title: "Conclusion – The Secret to Results That Last", reads: "3.1k" },
];



export default function ChaptersPost() {
    return (
        <Box sx={{ width: "100%", }}>
            <Box sx={{ width: "81%", m: "auto", mt: 0 }}>
                <TextField
                    placeholder="Search"
                    size="small"
                    variant="standard"
                    sx={(theme) => ({ width: "100%", bgcolor: "background.paper", borderRadius: 1.5, py: 0.7, px: 2, border: `1px solid ${theme.palette.divider}`, m: "auto" })}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                        disableUnderline: true, // Also removes underline for standard variant
                    }}
                />
            </Box>
            <Paper
                sx={(theme) => ({
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                    p: 2,
                    px: 1,
                    width: "100%",
                    margin: "auto",
                    mt: 0,
                })}
                elevation={0}
            >
                {chapters.map((chapter) => (
                    <Box
                        key={chapter.id}
                        sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            mb: 1.5,
                            width: "100%",
                        }}
                    >
                        {/* Message Wrapper */}
                        <Box sx={{ textAlign: "left", mr: 1, width: "100%", }}>
                            {/* Header (name + avatar) */}
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexDirection: "row" }}>
                                <Avatar
                                    src="/atomic-habits.jpg"
                                    sx={(theme) => ({
                                        bgcolor: theme.palette.secondary.main,
                                        width: 20,
                                        height: 20,
                                        fontSize: "0.6rem",
                                        fontWeight: 600,
                                        borderRadius: 0.5
                                    })}
                                >
                                    Atomic
                                </Avatar>
                                <Typography variant="caption" sx={{ color: "text.primary", fontWeight: 500 }}>
                                    Atomic Habits
                                </Typography>
                            </Box>

                            {/* Message bubble */}
                            <Box sx={{ flex: 1, minWidth: 0, ml: 2, width: "100%", }}>
                                <Paper
                                    sx={{
                                        p: 1.5,
                                        textAlign: "left",
                                        borderRadius: 1.5,
                                        width: "100%",
                                    }}
                                >
                                    <Typography variant="subtitle1" fontWeight="bold" color="text.secondary" sx={{ mb: 1 }}>{chapter.title}</Typography>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        sx={{
                                            textTransform: "none",
                                            fontWeight: 500,
                                        }}
                                    >
                                        Start Reading
                                    </Button>
                                    <Box sx={{ mt: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <IconButton
                                                size="small"
                                                sx={{
                                                    color: "text.secondary",
                                                    "&:hover": {
                                                        color: "error.main",
                                                        backgroundColor: "error.light",
                                                    },
                                                }}
                                            >
                                                <FavoriteIcon sx={{ fontSize: 18 }} />
                                                <Typography variant="caption" sx={{ ml: 0.5 }}>
                                                    {chapter.reads}
                                                </Typography>
                                            </IconButton>

                                            <IconButton
                                                size="small"
                                                sx={{
                                                    color: "text.secondary",
                                                    "&:hover": {
                                                        color: "info.main",
                                                        backgroundColor: "info.light",
                                                    },
                                                }}
                                            >
                                                <ChatBubbleOutlineIcon sx={{ fontSize: 18 }} />
                                                <Typography variant="caption" sx={{ ml: 0.5 }}>
                                                    {chapter.reads}
                                                </Typography>
                                            </IconButton>

                                            <IconButton
                                                size="small"
                                                sx={{
                                                    color: "text.secondary",
                                                    "&:hover": {
                                                        color: "success.main",
                                                        backgroundColor: "success.light",
                                                    },
                                                }}
                                            >
                                                <RepeatIcon sx={{ fontSize: 18 }} />
                                                <Typography variant="caption" sx={{ ml: 0.5 }}>
                                                    {chapter.reads}
                                                </Typography>
                                            </IconButton>

                                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, ml: 1 }}>
                                                <BarChartIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                                                <Typography variant="caption" color="text.secondary">
                                                    {chapter.reads}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <IconButton
                                                size="small"
                                                sx={{
                                                    color: "text.secondary",
                                                    "&:hover": {
                                                        color: "primary.main",
                                                        backgroundColor: "primary.light",
                                                    },
                                                }}
                                            >
                                                <BookmarkBorderIcon sx={{ fontSize: 18 }} />
                                            </IconButton>

                                            <IconButton
                                                size="small"
                                                sx={{
                                                    color: "text.secondary",
                                                    "&:hover": {
                                                        color: "primary.main",
                                                        backgroundColor: "primary.light",
                                                    },
                                                }}
                                            >
                                                <ShareIcon sx={{ fontSize: 18 }} />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </Paper>

                            </Box>
                        </Box>
                    </Box>
                ))}
            </Paper>
        </Box >
    )
}