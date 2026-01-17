"use client"

import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

export function CTASection() {
  return (
    <Box component="section" id="cta" sx={{ position: "relative", overflow: "hidden" }}>
      <Container maxWidth="lg" sx={{ py: { xs: 10, md: 16 } }}>
        <Box sx={{ maxWidth: 800, mx: "auto", textAlign: "center" }}>
          <Typography
            variant="h2"
            sx={{
              mb: 3,
              fontSize: { xs: "2rem", md: "3.5rem" },
            }}
          >
            Ready to scale your business thinking?
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mb: 5,
              fontSize: { xs: "1rem", md: "1.125rem" },
            }}
          >
          Join other business authors who have turned their frameworks into AI companions that teach, guide, and grow their impact.
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              mb: 3,
            }}
          >
            <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} sx={{ minWidth: 180 }}>
              Start Free
            </Button>
            <Button
              variant="outlined"
              size="large"
              LinkComponent={"a"}
              href="https://cal.com/umar-bello-kanwa-jwhzin/30min"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                minWidth: 180,
                borderColor: "divider",
              }}
            >
              Schedule Demo
            </Button>
          </Box>

          <Typography variant="body2" color="text.secondary">
            No credit card required 
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
