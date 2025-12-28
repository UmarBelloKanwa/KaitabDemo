"use client";

import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

const solutions = [
  {
    title: "Publish and Train",
    description:
      "Share your business frameworks, strategies, and ideas while training your AI Companion to understand, evolve with, and preserve your knowledge.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M28 16c0 6.627-5.373 12-12 12S4 22.627 4 16 9.373 4 16 4s12 5.373 12 12z"
          stroke="#1a73e8"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="16" cy="16" r="4" fill="#1a73e8" />
        <path
          d="M16 8v4M16 20v4M8 16h4M20 16h4"
          stroke="#1a73e8"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Business Interaction",
    description:
      "Users follow you and interact with your AI Companion for insights, advice, and decision guidance inspired by your thinking.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 6L19 12L26 13L21 18L22 25L16 22L10 25L11 18L6 13L13 12L16 6Z"
          fill="#ea4335"
        />
      </svg>
    ),
  },
  {
    title: "Preserve Your Impact",
    description:
      "Your AI Companion continues sharing your business knowledge and frameworks as a helpful guide, even when you’re not present, with explicit consent and no impersonation.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 4v24M4 16h24"
          stroke="#34a853"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="16" cy="8" r="2" fill="#34a853" />
        <circle cx="16" cy="24" r="2" fill="#34a853" />
        <circle cx="8" cy="16" r="2" fill="#34a853" />
        <circle cx="24" cy="16" r="2" fill="#34a853" />
      </svg>
    ),
  },
];

export default function SolutionSection() {
  return (
    <Box sx={{ pb: 8 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontSize: "2.5rem",
            fontWeight: 400,
            color: "text.primary",
            mb: 2,
            textAlign: "center",
          }}
        >
          What We Do
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "1.125rem",
            color: "text.secondary",
            textAlign: "center",
            maxWidth: "800px",
            mx: "auto",
            mb: 6,
            lineHeight: 1.7,
          }}
        >
          {/* Feedple is a social platform where people create, share, and
          continuously grow a safe, personalized companion that learns from
          their real thoughts, stays true to their essence, and remains
          accessible for learning, collaboration, and inspiration beyond their
          lifetime. */}
          Feedple let business thinkers share ideas while their personal AI
          companions learn their thinking, teach their frameworks, and scale
          their impact—beyond their presence.
        </Typography>

        <Grid container spacing={4}>
          {solutions.map((item, index) => (
            <Grid key={index} size={{ xs: 12, md: 4 }}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  bgcolor: "background.default",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <CardContent sx={{ p: 4, textAlign: "center" }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 3,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ mb: 2, fontWeight: 500, color: "text.primary" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", lineHeight: 1.6 }}
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
