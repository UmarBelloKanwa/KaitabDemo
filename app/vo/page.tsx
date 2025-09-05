"use client"

import React, { useState, useMemo } from "react"
import {
    Card,
    CardContent,
    CardHeader,
    Avatar,
    Button,
    Chip,
    IconButton,
    Typography,
    Box,
    Divider,
    Collapse,
    Paper,
    Stack
} from "@mui/material"
import {
    Favorite,
    FavoriteBorder,
    ChatBubbleOutline,
    Share,
    BookmarkBorder,
    Bookmark,
    MoreHoriz,
    ExpandMore,
    ExpandLess,
    ChatBubbleOutline as PostsIcon,
    ImportContacts as ChaptersIcon,
} from "@mui/icons-material"


const bookData = {
    metadata: {
        title: "Atomic Habits",
        language: "en",
        totalChapters: 20,
        totalPages: 320,
        version: "1.0",
    },
    chapters: [
        {
            id: 1,
            title: "The Surprising Power of Atomic Habits",
            pageNumber: 1,
            pagesCount: 15,
            sections: [
                {
                    id: "1-1",
                    title: "Section 1 of The Surprising Power of Atomic Habits",
                    elements: [
                        {
                            type: "head",
                            contentRole: "h2",
                            text: "The Surprising Power of Atomic Habits - Part 1",
                            style: {
                                fontSize: "18px",
                                fontWeight: "bold",
                                color: "#222",
                            },
                        },
                        {
                            type: "text",
                            contentRole: "paragraph",
                            text: "Habits are small, everyday choices that shape our identity and outcomes. Through repetition, they compound into powerful forces that determine success or failure. Tiny changes might appear trivial at first, but over time they rewrite who we are and what we can achieve. The lesson of atomic habits is that you don't need massive action, you need consistent, intentional action.",
                            style: {
                                fontSize: "14px",
                                fontWeight: "normal",
                                color: "#222",
                            },
                        },
                        {
                            type: "text",
                            contentRole: "paragraph",
                            text: "Consider the story of the British cycling team. In 2003, they had won only one Olympic gold medal in their 76-year history. Then Dave Brailsford became the new performance director and applied a philosophy of marginal gains - improving every tiny thing by just 1%. They redesigned bike seats for comfort, rubbed alcohol on tires for better grip, tested different massage gels for faster muscle recovery, and even taught riders the best way to wash their hands to avoid infection.",
                            style: {
                                fontSize: "14px",
                                fontWeight: "normal",
                                color: "#222",
                            },
                        },
                        {
                            type: "text",
                            contentRole: "paragraph",
                            text: "The results were extraordinary. Just five years later, the British cycling team dominated the 2008 Olympics, winning 60% of the gold medals available. Four years after that, they set nine Olympic records and seven world records at the 2012 Olympics. The same approach led to five Tour de France victories in six years. These weren't overnight transformations - they were the compound effect of dozens of small improvements.",
                            style: {
                                fontSize: "14px",
                                fontWeight: "normal",
                                color: "#222",
                            },
                        },
                    ],
                },
                {
                    id: "1-2",
                    title: "Section 2 of The Surprising Power of Atomic Habits",
                    elements: [
                        {
                            type: "head",
                            contentRole: "h2",
                            text: "The Surprising Power of Atomic Habits - Part 2",
                            style: {
                                fontSize: "18px",
                                fontWeight: "bold",
                                color: "#222",
                            },
                        },
                        {
                            type: "text",
                            contentRole: "paragraph",
                            text: "Success is the product of daily habits—not once-in-a-lifetime transformations. You get what you repeat. If you want to predict where you'll end up in life, all you have to do is follow the curve of tiny gains or tiny losses, and see how your daily choices will compound ten or twenty years down the line.",
                            style: {
                                fontSize: "14px",
                                fontWeight: "normal",
                                color: "#222",
                            },
                        },
                        {
                            type: "text",
                            contentRole: "paragraph",
                            text: "Time magnifies the margin between success and failure. It will multiply whatever you feed it. Good habits make time your ally. Bad habits make time your enemy. This is why small changes often appear to make no difference until you cross a critical threshold. The most powerful outcomes of any compounding process are delayed. You need to be patient.",
                            style: {
                                fontSize: "14px",
                                fontWeight: "normal",
                                color: "#222",
                            },
                        },
                    ],
                },
                {
                    id: "1-3",
                    title: "Section 3 of The Surprising Power of Atomic Habits",
                    elements: [
                        {
                            type: "head",
                            contentRole: "h2",
                            text: "The Surprising Power of Atomic Habits - Part 3",
                            style: {
                                fontSize: "18px",
                                fontWeight: "bold",
                                color: "#222",
                            },
                        },
                        {
                            type: "text",
                            contentRole: "paragraph",
                            text: "Your outcomes are a lagging measure of your habits. Your net worth is a lagging measure of your financial habits. Your weight is a lagging measure of your eating habits. Your knowledge is a lagging measure of your learning habits. Your clutter is a lagging measure of your cleaning habits. You get what you repeat.",
                            style: {
                                fontSize: "14px",
                                fontWeight: "normal",
                                color: "#222",
                            },
                        },
                        {
                            type: "text",
                            contentRole: "paragraph",
                            text: "If you want better results, then forget about setting goals. Focus on your system instead. Goals are about the results you want to achieve. Systems are about the processes that lead to those results. The purpose of setting goals is to win the game. The purpose of building systems is to continue playing the game. True long-term thinking is goal-less thinking. It's not about any single accomplishment. It is about the cycle of endless refinement and continuous improvement.",
                            style: {
                                fontSize: "14px",
                                fontWeight: "normal",
                                color: "#222",
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2,
            title: "How Habits Shape Identity",
            pageNumber: 16,
            pagesCount: 15,
            sections: [
                {
                    id: "2-1",
                    title: "Section 1 of How Habits Shape Identity",
                    elements: [
                        {
                            type: "head",
                            contentRole: "h2",
                            text: "How Habits Shape Identity - Part 1",
                            style: {
                                fontSize: "18px",
                                fontWeight: "bold",
                                color: "#222",
                            },
                        },
                        {
                            type: "text",
                            contentRole: "paragraph",
                            text: "Every action you take is a vote for the type of person you wish to become. No single instance will transform your beliefs, but as the votes build up, so does the evidence of your new identity. This is one reason why meaningful change does not require radical change. Small habits can make a meaningful difference by providing evidence of a new identity.",
                            style: {
                                fontSize: "14px",
                                fontWeight: "normal",
                                color: "#222",
                            },
                        },
                        {
                            type: "text",
                            contentRole: "paragraph",
                            text: "The most practical way to change who you are is to change what you do. Each time you write a page, you are a writer. Each time you practice the violin, you are a musician. Each time you start a workout, you are an athlete. Each time you encourage your employees, you are a leader. Each habit not only gets results but also teaches you something far more important: to trust yourself.",
                            style: {
                                fontSize: "14px",
                                fontWeight: "normal",
                                color: "#222",
                            },
                        },
                    ],
                },
                {
                    id: "2-2",
                    title: "Section 2 of How Habits Shape Identity",
                    elements: [
                        {
                            type: "head",
                            contentRole: "h2",
                            text: "How Habits Shape Identity - Part 2",
                            style: {
                                fontSize: "18px",
                                fontWeight: "bold",
                                color: "#222",
                            },
                        },
                        {
                            type: "text",
                            contentRole: "paragraph",
                            text: "The process of building a habit can be divided into four simple steps: cue, craving, response, and reward. This four-step pattern is the backbone of every habit, and your brain runs through these steps in the same order each time. First, there is the cue. The cue triggers your brain to initiate a behavior. It is a bit of information that predicts a reward.",
                            style: {
                                fontSize: "14px",
                                fontWeight: "normal",
                                color: "#222",
                            },
                        },
                        {
                            type: "text",
                            contentRole: "paragraph",
                            text: "Cravings are the second step, and they are the motivational force behind every habit. Without some level of motivation or desire—without craving a change—we have no reason to act. What you crave is not the habit itself but the change in state it delivers. You do not crave smoking a cigarette, you crave the feeling of relief it provides. Every craving is linked to a desire to change your internal state.",
                            style: {
                                fontSize: "14px",
                                fontWeight: "normal",
                                color: "#222",
                            },
                        },
                    ],
                },
            ],
        },
    ],
}

function SectionPost({ section, chapter, sectionIndex }: { section: any; chapter: any; sectionIndex: number }) {
    const [liked, setLiked] = useState(false)
    const [bookmarked, setBookmarked] = useState(false)
    const [expanded, setExpanded] = useState(false)

    const textElements = section.elements.filter((element: any) => element.type === "text")
    const headingElement = section.elements.find((element: any) => element.type === "head")

    const fullContent = textElements.map((element: any) => element.text).join("\n\n")
    const shouldTruncate = fullContent.length > 400
    const displayContent = shouldTruncate && !expanded ? fullContent.substring(0, 400) + "..." : fullContent

    const randomLikes = Math.floor(Math.random() * 200) + 50
    const randomComments = Math.floor(Math.random() * 30) + 5

    // Example: calculate once outside render
    const hoursAgo = useMemo(() => Math.floor(Math.random() * 12) + 1, []);

    return (
        <Card sx={{ maxWidth: 600, mx: "auto", mb: 1, "&:hover": { boxShadow: 3 }, }} elevation={0}>
            <CardHeader
                avatar={
                    <Avatar src="/atomic-habits.jpg" sx={{ bgcolor: "primary.light", borderRadius: 2, }}>
                        AH
                    </Avatar>
                }
                action={
                    <IconButton>
                        <MoreHoriz />
                    </IconButton>
                }
                title={
                    <Typography variant="subtitle2" fontWeight="bold">
                        Atomic Habits
                    </Typography>
                }
                subheader={
                    <Typography variant="caption" color="text.secondary">
                        Chapter {chapter.id} • Section {sectionIndex + 1} • {hoursAgo}h ago
                    </Typography>
                }
                sx={{ pb: 1 }}
            />

            <CardContent sx={{ pt: 0 }}>

                <Box sx={{ mb: 2 }}>
                    {headingElement && (
                        <Typography variant="h6" component="h3" fontWeight="bold" sx={{ mb: 2, lineHeight: 1.3 }}>
                            {headingElement.text}
                        </Typography>
                    )}

                    <Box sx={{ mb: 2 }}>
                        {displayContent.split("\n\n").map((paragraph: string, idx: number) => (
                            <Typography key={idx} variant="body2" sx={{ mb: 1.5, lineHeight: 1.6 }}>
                                {paragraph}
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

                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2, }}>
                        <Chip label={`Chapter ${chapter.id}`} size="small" variant="filled" />
                        <Chip label={`Section ${sectionIndex + 1} of ${chapter.sections.length}`} size="small" variant="outlined" />
                        <Chip
                            label={`Page ${chapter.pageNumber + Math.floor((sectionIndex * chapter.pagesCount) / chapter.sections.length)}`}
                            size="small"
                            variant="outlined"
                        />
                    </Box>

                    <Divider sx={{ mb: 0, mt: 2 }} />
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={{ xs: 2.5, sm: 1 }}
                        sx={{
                            p: 0,
                            m: { xs: "auto", sm: 0 },
                            mt: 0,
                            width: "fit-content",
                            maxWidth: "100%",
                        }}
                    >
                        {[
                            { title: "Watch" },
                            { title: "Translate" },
                            { title: "Adapt" },
                            { title: "Solve" },
                            { title: "Read Aloud" },
                        ].map((item, index, arr) => (
                            <React.Fragment key={index}>
                                <Stack
                                    direction={{ xs: "column", sm: "row" }}
                                    alignItems="center"
                                    sx={(theme) => ({
                                        mt: 0.5,
                                        pr: 1,
                                        [theme.breakpoints.down("sm")]: {
                                            border: "1px solid",
                                            borderColor: "divider",
                                            pr: 1,
                                            gap: 0,
                                            borderRadius: 10,
                                        },
                                    })}
                                >
                                    <IconButton>
                                        <PostsIcon sx={{ fontSize: 16 }} />
                                    </IconButton>
                                    <Typography variant="caption" color="text.secondary">
                                        {item.title}
                                    </Typography>
                                </Stack>

                                {/* Divider only if not last item */}
                                {index < arr.length - 1 && (
                                    <Divider
                                        orientation="vertical"
                                        variant="middle"
                                        sx={{
                                            height: "15px",
                                            alignSelf: "center",
                                            m: "auto", // adds top & bottom margin for spacing

                                        }}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </Stack>

                    <Divider sx={{ mb: 0.5 }} />
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
                </Box>
            </CardContent>
        </Card>
    )
}

function ChapterGroup({ chapter }: { chapter: any }) {
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

export default function SocialMediaFeed() {
    return (
        <Box sx={{ width: "98%", m: "auto" }}>
            <Paper
                elevation={0}
                sx={{
                    top: 0,
                    zIndex: 20,
                    borderRadius: 2,
                    m: "auto",
                    //bgcolor: "background.default"
                }}
            >
                <Box sx={{ maxWidth: 600, mx: "auto", p: 2, pt: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>

                        <ChaptersIcon sx={{ width: 32, height: 32, }} />

                        <Box>
                            <Typography variant="h6" fontWeight="bold">
                                Atomic Habits Chapters
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {bookData.metadata.totalChapters} chapters • {bookData.metadata.totalPages} pages
                            </Typography>
                        </Box>


                    </Box>
                </Box>
            </Paper>

            <Box sx={{ mx: "auto", py: 1, }}>
                {bookData.chapters.map((chapter) => (
                    <ChapterGroup key={chapter.id} chapter={chapter} />
                ))}
            </Box>
        </Box>
    )
}
