import React, { useState, useMemo } from "react";
import {
    Card, CardHeader, Avatar, IconButton, Typography, CardContent, CardMedia,
    Box, Button, Divider, Stack, ButtonBase, Dialog, DialogTitle,
    DialogContent, DialogActions, Select, MenuItem,
} from "@mui/material";
import { MoreHoriz, Favorite, FavoriteBorder, ChatBubbleOutline, Share, Bookmark, BookmarkBorder, ExpandMore, ExpandLess, Language as LanguageIcon, OndemandVideo as OndemandVideoIcon, TipsAndUpdates as TipsAndUpdatesIcon, WorkOutlineOutlined as WorkOutlineOutlinedIcon, MusicNote as MusicNoteIcon } from "@mui/icons-material";
import { ExpandedPost } from "@ui/robook/post/ExpandedPost";
import usersComments from "@/data/comments.json";

export default function SectionPost({ section, chapter, sectionIndex }: { section: any; chapter: any; sectionIndex: number; }) {
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [action, setAction] = useState("null");

    const [translateDialogOpen, setTranslateDialogOpen] = useState(false);
    const [adaptDialogOpen, setAdaptDialogOpen] = useState(false);

    const [language, setLanguage] = useState("en"); // default English
    const [adaptLevel, setAdaptLevel] = useState("original"); // default original

    const textElements = section.elements.filter((element: any) => element.type === "text");
    const headingElement = section.elements.find((element: any) => element.type === "head");

    // Helper function to get the correct content based on language and adaptation level
    const getTranslatedValue = (element: any, lang: string, level: string) => {
        if (level === "original") {
            return element?.text || "";
        }
        const translation = element?.translations?.[lang];
        return translation?.[level] || translation?.['intermediate'] || element?.text || "";
    };

    // Memoize main content based on language and adaptLevel
    const { selectedHeading, selectedContent } = useMemo(() => {
        const headingText = getTranslatedValue(headingElement, language, adaptLevel);
        const contentText = textElements.map((el: any) => getTranslatedValue(el, language, adaptLevel)).join("\n\n");
        return {
            selectedHeading: headingText,
            selectedContent: contentText,
        };
    }, [language, adaptLevel, section, headingElement, textElements]);

    // Memoize application content based on language and adaptLevel
    const applicationData = section?.application;
    const { whyItMatters, howToUse, reflection } = useMemo(() => {
        const getTranslatedApplicationValue = (data: any, lang: string, level: string) => {
            const translation = data?.[lang];
            return translation?.[level] || translation?.['intermediate'] || "";
        };

        return {
            whyItMatters: getTranslatedApplicationValue(applicationData?.whyItMatters, language, adaptLevel),
            howToUse: getTranslatedApplicationValue(applicationData?.howToUse, language, adaptLevel),
            reflection: getTranslatedApplicationValue(applicationData?.reflection, language, adaptLevel),
        };
    }, [language, adaptLevel, applicationData]);

    const shouldTruncate = selectedContent.length > 400;
    const displayContent = shouldTruncate && !expanded ? selectedContent.substring(0, 400) + "..." : selectedContent;

    // FIX: Generate random numbers using useState and useEffect
    const [hoursAgo, setHoursAgo] = useState(0);
    const [randomLikes, setRandomLikes] = useState(0);
    const [randomComments, setRandomComments] = useState(0);

    React.useLayoutEffect(() => {
        setRandomLikes(Math.floor(Math.random() * 200) + 50);
        setRandomComments(Math.floor(Math.random() * 30) + 5);
        setHoursAgo(Math.floor(Math.random() * 12) + 1);
    }, []);

    const handleClick = (item: string) => {
        if (item === "Translate") {
            setTranslateDialogOpen(true);
            return;
        }
        if (item === "Adapt") {
            setAdaptDialogOpen(true);
            return;
        }
        if (item === action) {
            setAction("null");
            return;
        } else {
            setAction(item);
        }
    };

    const actions = [
        { title: "Watch", icon: OndemandVideoIcon, onClick: () => handleClick("Watch") },
        { title: "Translate", icon: LanguageIcon, onClick: () => handleClick("Translate") },
        { title: "Adapt", icon: TipsAndUpdatesIcon, onClick: () => handleClick("Adapt") },
        { title: "Application", icon: WorkOutlineOutlinedIcon, onClick: () => handleClick("Application") },
        { title: "Read Aloud", icon: MusicNoteIcon, onClick: () => handleClick("Read") },
    ];

    const [showExpandedPost, setShowExpandedPost] = useState(false);
    const handlePostClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest("button, a")) {
            return
        }

        setShowExpandedPost((prev) => !prev);
    }


    return (
        <Card sx={{ maxWidth: "100%", mx: "auto", mb: 1, "&:hover": { boxShadow: 3 } }} elevation={0}>
            <CardHeader
                avatar={<Avatar src="/atomic-habits.jpg" sx={{ bgcolor: "primary.light", borderRadius: 2 }}>AH</Avatar>}
                action={<IconButton><MoreHoriz /></IconButton>}
                title={<Typography variant="subtitle2" fontWeight="bold">Atomic Habits</Typography>}
                subheader={
                    <Typography variant="caption" color="text.secondary">
                        Chapter {chapter.id} • Section {sectionIndex + 1} of {chapter.sections.length} • Page {chapter.pageNumber + Math.floor((sectionIndex * chapter.pagesCount) / chapter.sections.length)}
                    </Typography>
                }
                sx={{ pb: 1 }}
            />

            <CardContent sx={{ pt: 0 }}>
                {action === "Watch" && (
                    <Card sx={{ mb: 1 }}> <CardMedia component="video" controls src="/atomic.mp4" sx={{ borderRadius: 2 }} /> </Card>
                )}

                {selectedHeading && (
                    <Typography variant="h6" component="h3" fontWeight="bold" sx={{ mb: 2, lineHeight: 1.3 }}>
                        {selectedHeading}
                    </Typography>
                )}

                <Box sx={{ mb: 2 }}>
                    {displayContent.split("\n\n").map((p: string, idx: number) => (
                        <Typography key={idx} variant="body2" sx={{ mb: 1.5, lineHeight: 1.6 }}>
                            {p}
                        </Typography>
                    ))}
                </Box>

                {shouldTruncate && (
                    <Button
                        variant="text"
                        size="small"
                        onClick={() => setExpanded(!expanded)}
                        endIcon={expanded ? <ExpandLess /> : <ExpandMore />}
                        sx={{ p: 0, textTransform: "none", fontWeight: 500 }}
                    >
                        {expanded ? "Show less" : "Read more"}
                    </Button>
                )}

                {/* New section for "Application" content */}
                {action === "Application" && applicationData && (
                    <Box sx={{ mt: 4, p: 2, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                            Why It Matters
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            {whyItMatters}
                        </Typography>

                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                            How to Use
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            {howToUse}
                        </Typography>

                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                            Reflection
                        </Typography>
                        <Typography variant="body2">
                            {reflection}
                        </Typography>
                    </Box>
                )}

                <Divider sx={{ mb: 0, mt: 2 }} />
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={{ xs: 0.5, sm: 0.5 }}
                    sx={{
                        py: 0.5,
                        maxWidth: "100%",
                        flexWrap: "wrap"
                    }}
                >
                    {actions.map((item, index, arr) => {

                        const Icon = item.icon; // <-- assign the component
                        return (<React.Fragment key={index}>
                            <ButtonBase onClick={item.onClick}
                                sx={(theme) => ({
                                    display: "flex", flexDirection: { xs: "column", sm: "row" },
                                    alignItems: "center", borderRadius: 2,
                                    px: 1, py: 0.5,
                                    "&:hover": { bgcolor: "action.hover" },
                                    gap: 0.5,
                                    ...(action === item.title && {
                                        bgcolor: theme.palette.primary.main, // same as contained
                                        color: theme.palette.primary.contrastText, // text/icons turn white
                                        "&:hover": {
                                            bgcolor: theme.palette.primary.dark, // darker on hover
                                        },
                                        "& .MuiTypography-root": {
                                            color: theme.palette.primary.contrastText,
                                        },
                                        "& svg": {
                                            color: theme.palette.primary.contrastText, // icons white too
                                        },
                                    }),
                                })}
                            >
                                {<Icon sx={{ fontSize: { xs: 17.7, sm: 16 }, color: "grey.300" }} />}
                                <Typography variant="caption" color="text.secondary" sx={{ ml: { sm: 0.5, xs: 0 }, mt: { xs: 0.5, sm: 0 }, display: { xs: "none", sm: "block", }, }}>
                                    {item.title}
                                </Typography>
                            </ButtonBase>
                            {index < arr.length - 1 && <Divider orientation="vertical" variant="middle" sx={{ height: "15px", alignSelf: "center", }} />}
                        </React.Fragment>
                        )
                    })}
                </Stack>

                <Divider sx={{ mb: 0.5, display: { xs: "block", sm: "none" } }} />

                {showExpandedPost ? (
                    <ExpandedPost
                        timestamp="2"
                        image={undefined}
                        user={{
                            name: "Atomic Habits",
                            username: "Atomic Habits",
                            avatar: "/atomic-habits.jpg",
                            verified: true
                        }}
                        content={"Null"}
                        metrics={{
                            "replies": 45,
                            "retweets": 120,
                            "likes": 986,
                            "views": 5421
                        }}
                        onClose={() => setShowExpandedPost(false)}
                        usersComments={usersComments}
                    />

                ) : (
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <Button
                                variant="text"
                                size="small"
                                startIcon={liked ? <Favorite /> : <FavoriteBorder />}
                                onClick={() => setLiked(!liked)}
                                sx={{
                                    color: liked ? "error.main" : "text.secondary",
                                    textTransform: "none",
                                    "&:hover": { bgcolor: "error.light", color: "error.main" },
                                }}
                            >
                                {liked ? randomLikes + 1 : randomLikes}
                            </Button>

                            <Button
                                variant="text"
                                size="small"
                                onClick={() => { setShowExpandedPost((prev) => !prev) }}
                                startIcon={<ChatBubbleOutline />}
                                sx={{
                                    color: "text.secondary",
                                    textTransform: "none",
                                    "&:hover": { bgcolor: "primary.light", color: "primary.main" },
                                }}
                            >
                                {randomComments}
                            </Button>

                            <Button
                                variant="text"
                                size="small"
                                startIcon={<Share />}
                                sx={{
                                    color: "text.secondary",
                                    textTransform: "none",
                                    "&:hover": { bgcolor: "success.light", color: "success.main" },
                                }}
                            >
                                Share
                            </Button>
                        </Box>

                        <IconButton
                            onClick={() => setBookmarked(!bookmarked)}
                            sx={{
                                color: bookmarked ? "warning.main" : "text.secondary",
                                "&:hover": { bgcolor: "warning.light", color: "warning.main" },
                            }}
                        >
                            {bookmarked ? <Bookmark /> : <BookmarkBorder />}
                        </IconButton>
                    </Box>
                )}
            </CardContent>

            {/* Translation Dialog */}
            <Dialog
                open={translateDialogOpen}
                onClose={() => setTranslateDialogOpen(false)} maxWidth="xs" fullWidth
            >
                <DialogTitle>Select Language</DialogTitle>
                <DialogContent>
                    <Select
                        fullWidth
                        value={language}
                        onChange={(e) => {
                            setLanguage(e.target.value);
                            if (e.target.value !== 'en') {
                                setAdaptLevel('intermediate'); // Set a non-original level for translations
                            } else {
                                setAdaptLevel('original'); // Revert to original for English
                            }
                        }}
                        variant="outlined"
                        sx={{ mt: 1, }}
                    >
                        <MenuItem value="en">English</MenuItem>
                        <MenuItem value="es">Spanish</MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setTranslateDialogOpen(false)}>Okay</Button>
                </DialogActions>
            </Dialog>

            {/* Adaptation Dialog */}
            <Dialog
                open={adaptDialogOpen}
                onClose={() => setAdaptDialogOpen(false)} maxWidth="xs" fullWidth
            >
                <DialogTitle>Select Adaptation Level</DialogTitle>
                <DialogContent>
                    <Select
                        fullWidth
                        value={adaptLevel}
                        onChange={(e) => setAdaptLevel(e.target.value)}
                        variant="outlined"
                        sx={{ mt: 1, }}
                    >
                        <MenuItem value="original">Original</MenuItem>
                        <MenuItem value="beginner">Beginner</MenuItem>
                        <MenuItem value="intermediate">Intermediate</MenuItem>
                        <MenuItem value="advanced">Advanced</MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAdaptDialogOpen(false)}>Okay</Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}
