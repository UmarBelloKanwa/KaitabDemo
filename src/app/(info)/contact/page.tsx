"use client"

import { Container, Typography, Box, Link } from "@mui/material"

export default function ContactPage() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: { xs: "2.5rem", md: "4rem" },
            fontWeight: 400,
            mb: 2,
            fontFamily: "Georgia, serif",
          }}
        >
          Contact Feedple.
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
          Questions? Here&apos;s how you can get in touch with us.
        </Typography>
      </Box>

      <Box sx={{ mt: 6 }}>
        {/* <Box sx={{ mb: 4 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>If you&apos;re a writer interested in starting an independent publication on Feedple:</strong>{" "}
            visit{" "}
            <Link
              href="https://feedple.com/going-paid"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "inherit", textDecoration: "underline" }}
            >
              feedple.com/going-paid
            </Link>
          </Typography>
        </Box> */}

        <Box sx={{ mb: 4 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>If you&apos;re interested in becoming a member of our growing team:</strong> visit{" "}
            <Link
              href="https://feedple.com/about"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "inherit", textDecoration: "underline" }}
            >
              feedple.com/jobs
            </Link>{" "}
            to see career opportunities
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>For FAQs and walkthroughs:</strong> visit{" "}
            <Link
              href="https://feedple.com/support"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "inherit", textDecoration: "underline" }}
            >
              feedple.com/support
            </Link>
          </Typography>
        </Box>

        {/* <Box sx={{ mb: 4 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>For reporting a violation of Feedple&apos;s Terms of Use:</strong>{" "}
            <Link href="mailto:support@feedple.com" sx={{ color: "inherit", textDecoration: "underline" }}>
              support@feedple.com
            </Link>
          </Typography>
        </Box> */}

        <Box sx={{ mb: 4 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>For press inquiries and requests:</strong>{" "}
            <Link href="mailto:support@feedple.com" sx={{ color: "inherit", textDecoration: "underline" }}>
              support@feedple.com
            </Link>
          </Typography>
        </Box>

        <Box sx={{ mt: 6 }}>
          <Typography variant="body1">
            <strong>We also have space for you to report, give us feedback or feature request, so feel free to reach out to us:</strong>{" "}
            <Link
              href="https://feedple.com/feedback"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "inherit", textDecoration: "underline" }}
            >
              feedple.com/feedback
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}
