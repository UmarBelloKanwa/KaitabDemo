"use client"

import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Grid from "@mui/material/Grid"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import GroupIcon from "@mui/icons-material/Group"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import BoltIcon from "@mui/icons-material/Bolt"
import { CortexSection } from "@/components/ui/problems/cortex-section";

const problems = [
  {
    icon: AccessTimeIcon,
    title: "Repeating yourself",
    description: "You spend hours explaining the same frameworks, strategies, and decisions to different people.",
  },
  {
    icon: GroupIcon,
    title: "Trapped business knowledge",
    description: "Your insights live in static documents, slides, or books. They can’t answer questions or guide real-world decisions.",
  },
  {
    icon: ErrorOutlineIcon,
    title: "Ideas don’t scale",
    description: "When you’re not present, your thinking is frozen in content that can’t adapt or apply itself.",
  },
  {
    icon: BoltIcon,
    title: "Impact tied to you",
    description: "Your expertise only works when you personally show up, limiting how far your ideas and influence can grow.",
  },
]

export function ProblemsSection() {
  return (
    <Box component="section" id="problems" sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Container maxWidth="lg" sx={{ py: { xs: 10, md: 16 } }}>
        <Box sx={{ mb: 8, textAlign: "center" }}>
          <Typography
            variant="h2"
            sx={{
              mb: 2,
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
           Why business ideas don’t scale
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: "auto" }}>
          Your frameworks live in static content. Without you present, they can’t adapt to real situations, guide decisions, or scale beyond your time. 
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {problems.map((problem, index) => {
            const IconComponent = problem.icon
            return (
              <Grid size={{xs: 12, md: 6,}}  key={index}>
                <Card
                  elevation={1}
                  //variant="outlined"
                  sx={{
                    height: "100%",
                    bgcolor: "background.default",
                    transition: "all 0.3s",
                    border: 2,
                    borderColor: "divider",
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 1,
                        bgcolor: "secondary.main",
                        mb: 2,
                      }}
                    >
                      <IconComponent sx={{ fontSize: 24, color: "text.primary" }} />
                    </Box>
                    <Typography variant="h3" sx={{ mb: 1.5, fontSize: "1.25rem" }}>
                      {problem.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {problem.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Box>
  )
}
