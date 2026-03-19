"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BusinessSolutionSection from "@/components/ui/problems/extra-solution-section";
import { CortexSection } from "@/components/ui/problems/cortex-section";



export function SolutionSection() {
  return (
    <Box
      component="section"
      id="solution"
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        //  bgcolor: "rgba(245, 245, 245, 0.5)",
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 10, md: 16 } }}>
        <Box sx={{ mb: 8, textAlign: "center" }}>
          <Chip
            icon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
            label="Our Solution"
            sx={{
              mb: 2,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              fontWeight: 500,
              fontSize: "0.875rem",
            }}
          />
          <Typography
            variant="h2"
            sx={{
              mb: 2,
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            A platform built to scale your expertise
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 700, mx: "auto" }}
          >
            Feedple enables people to create an AI companion trained using their expertise to guide real-world decisions on their behalf.
          </Typography>
        </Box>
        <BusinessSolutionSection/>
       
        <CortexSection />
      </Container>
    </Box>
  );
}
