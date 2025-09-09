import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps, accordionSummaryClasses } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";


export const bookData = {
    description: {
        title: "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones",
        author: "by James Clear",
        summary:
            "No matter your goals, Atomic Habits offers a proven framework for improving—every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
        keyInsight:
            "If you're having trouble changing your habits, the problem isn't you. The problem is your system. You do not rise to the level of your goals. You fall to the level of your systems.",
        tags: ["Bestseller", "Self-Development"],
    },
    tableOfContents: [
        {
            part: "Part I: The Fundamentals",
            chapters: [
                "The Surprising Power of Atomic Habits",
                "How Your Habits Shape Your Identity (and Vice Versa)",
                "How to Build Better Habits in 4 Simple Steps",
            ],
        },
        {
            part: "Part II: The 1st Law - Make It Obvious",
            chapters: [
                "The Man Who Didn't Look Right",
                "The Best Way to Start a New Habit",
                "Motivation Is Overrated; Environment Often Matters More",
                "The Secret to Self-Control",
            ],
        },
        {
            part: "Part III: The 2nd Law - Make It Attractive",
            chapters: [
                "How to Make a Habit Irresistible",
                "The Role of Family and Friends in Shaping Your Habits",
                "How to Find and Fix the Causes of Your Bad Habits",
            ],
        },
        {
            part: "Part IV: The 3rd Law - Make It Easy",
            chapters: [
                "Walk Slowly, but Never Backward",
                "The Law of Least Effort",
                "How to Stop Procrastinating by Using the Two-Minute Rule",
                "How to Make Good Habits Inevitable and Bad Habits Impossible",
            ],
        },
        {
            part: "Part V: The 4th Law - Make It Satisfying",
            chapters: [
                "The Cardinal Rule of Behavior Change",
                "How to Stick with Good Habits Every Day",
                "How an Accountability Partner Can Change Everything",
            ],
        },
        {
            part: "Part VI: Advanced Tactics",
            chapters: [
                "The Truth About Talent (When Genes Matter and When They Don't)",
                "The Goldilocks Rule: How to Stay Motivated in Life and Work",
                "The Downside of Creating Good Habits",
            ],
        },
    ],
};


// ---------- Styled Components ----------
const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': { borderBottom: 0 },
    '&::before': { display: 'none' },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
    backgroundColor: 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]: {
        transform: 'rotate(90deg)',
    },
    [`& .${accordionSummaryClasses.content}`]: { marginLeft: theme.spacing(1) },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

// ---------- Component ----------
export default function AtomicHabitsAccordion() {
    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <Box sx={{ m: "auto", mb: 3, mt: 0 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexDirection: "row", }}>
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
                    Atomic Habits
                </Avatar>
                <Typography variant="caption" sx={{ flex: 1, color: "text.primary", fontWeight: 500 }}>
                    Atomic Habits
                </Typography>

                <IconButton
                    size="small"
                    sx={{

                        color: "#6b7280",
                        "&:hover": { backgroundColor: "#374151" },
                    }}
                >
                    <MoreHorizIcon />
                </IconButton>
            </Box>
            {/* Accordion 1: Book Description */}
            {/* <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{ borderRadius: 2 }}>
                <AccordionSummary aria-controls="panel1-content" id="panel1-header">
                    <Typography component="span">Book Description</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="h6">{bookData.description.title}</Typography>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>{bookData.description.author}</Typography>
                    <Typography paragraph>{bookData.description.summary}</Typography>
                    <Box sx={{ fontStyle: 'italic', mt: 2 }}>Key Insight: {bookData.description.keyInsight}</Box>
                    <Box sx={{ mt: 2 }}>
                        Tags: {bookData.description.tags.join(', ')}
                    </Box>
                </AccordionDetails>
            </Accordion> */}

            {/* Accordion 2: Table of Contents */}
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} sx={{ borderRadius: 1 }}>
                <AccordionSummary aria-controls="panel2-content" id="panel2-header">
                    <Typography component="span">Table of Contents</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {bookData.tableOfContents.map((section, index) => (
                        <Box key={index} sx={{ mb: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                {section.part}
                            </Typography>
                            <List dense>
                                {section.chapters.map((chapter, idx) => (
                                    <ListItem key={idx} sx={{ pl: 2 }}>
                                        <Typography variant="body2">{chapter}</Typography>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    ))}
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
