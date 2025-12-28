"use client";

import { Typography, Box, Container, Grid, Card, CardContent } from "@mui/material";


const cortexData = [
  {
    title: "It learns your business thinking",
    description:
      "Every framework, strategy, and insight you share on Feedple continuously trains your Cortex.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          fill="#34a853"
        />
      </svg>
    ),
  },
  {
    title: "Guides decisions and spreads knowledge",
    description:
      "Your Cortex helps others learn, collaborate, and apply your strategies.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1" fill="#fbbc04" />
        <rect x="14" y="3" width="7" height="7" rx="1" fill="#fbbc04" />
        <rect x="3" y="14" width="7" height="7" rx="1" fill="#fbbc04" />
        <rect x="14" y="14" width="7" height="7" rx="1" fill="#fbbc04" />
      </svg>
    ),
  },
  {
    title: "Full control in your hands",
    description:
      "You decide when it activates, when it works, what it does, and how it operates.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          stroke="#ea4335"
          strokeWidth="2"
        />
        <path
          d="M2 12H22M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
          stroke="#ea4335"
          strokeWidth="2"
        />
      </svg>
    ),
  },
];

export function CortexSection() {
  return (
    <Box sx={{ pb: 8 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          sx={{ fontSize: "2.5rem", fontWeight: 400, color: "text.primary", mb: 2, textAlign: "center" }}
        >
          Cortex
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "1.125rem",
            color: "text.secondary",
            textAlign: "center",
            maxWidth: "500px",
            mx: "auto",
            mb: 6,
            lineHeight: 1.7,
          }}
        >
          Cortex is a safe, personalized AI companion that learns from your business thinking and helps you scale your impact.
       </Typography>

        <Grid container spacing={3}>
          {cortexData.map((item, index) => (
            <Grid key={index} size={{ xs: 12, md: 6 }} sx={index === 2 ? { m: "auto" } : {}}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  display: "flex",
                  bgcolor: "background.default",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <CardContent sx={{ p: 4, flex: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 500, color: "text.primary" }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                        {item.description}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
