"use client";

import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Stack,
  Divider,
} from "@mui/material";
import {
  LinkedIn,
  Facebook,
  Instagram,
  YouTube,
  HelpOutline,
} from "@mui/icons-material";

// X (Twitter) icon - Material-UI doesn't have it by default
function XIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Feedple logo component
function FeedpleLogo() {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <img
        src="/app/logo-name.png"
        alt="Feedple"
        style={{
          width: "125px",
          objectFit: "contain",
        }}
      />
    </Box>
  );
}

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        pt: 4,
        pb: 3,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        {/* Social Media Section */}
        <Box sx={{ mb: 4 }}>
          <Stack
            direction="row"
            spacing={{ xs: 0.5, sm: 1 }}
            alignItems="center"
            flexWrap="wrap"
            sx={{ gap: { xs: 0.5, sm: 1 } }}
          >
            <Typography
              variant="body2"
              sx={{
                //color: "#202124",
                fontWeight: 500,
                mr: { xs: 0.5, sm: 1 },
                fontSize: { xs: "13px", sm: "14px" },
              }}
            >
              Follow us
            </Typography>
            <IconButton
              href="https://www.linkedin.com/company/feedple/"
              target="_blank"
              sx={{
                // color: "#202124",
                p: { xs: 0.25, sm: 0.5 },
                "& svg": { fontSize: { xs: "20px", sm: "24px" } },
              }}
            >
              <LinkedIn />
            </IconButton>
            <IconButton
              href="https://www.facebook.com/profile.php?id=100075477952362"
              target="_blank"
              sx={{
                //  color: "#202124",
                p: { xs: 0.25, sm: 0.5 },
                "& svg": { fontSize: { xs: "20px", sm: "24px" } },
              }}
            >
              <Facebook />
            </IconButton>
            {/* <IconButton
              href="https://instagram.com"
              target="_blank"
              sx={{
                // color: "#202124",
                p: { xs: 0.25, sm: 0.5 },
                "& svg": { fontSize: { xs: "20px", sm: "24px" } },
              }}
            >
              <Instagram />
            </IconButton> */}
            <IconButton
              href="https://x.com/feedple"
              target="_blank"
              sx={{
                // color: "#202124",
                p: { xs: 0.25, sm: 0.5 },
                "& svg": { fontSize: { xs: "20px", sm: "24px" } },
              }}
            >
              <XIcon />
            </IconButton>
            {/* <IconButton
              href="https://youtube.com"
              target="_blank"
              sx={{
                //  color: "#202124",
                p: { xs: 0.25, sm: 0.5 },
                "& svg": { fontSize: { xs: "20px", sm: "24px" } },
              }}
            >
              <YouTube />
            </IconButton> */}
          </Stack>
        </Box>

        

        <Divider sx={{ mb: 3 }} />

       
        {/* Bottom Section with Feedple Logo and Links */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          spacing={{ xs: 3, md: 0 }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, sm: 3 }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexWrap="wrap"
            sx={{ gap: { xs: 1, sm: 0 } }}
          >
            <Box sx={{ mb: { xs: 1, sm: 0 } }}>
              <FeedpleLogo />
            </Box>
            <Link
              href="/about"
              underline="none"
              sx={{
                color: "text.secondary",
                fontSize: { xs: "13px", sm: "14px" },
                // "&:hover": { color: "#202124" },
              }}
            >
              About Feedple
            </Link>
            
            <Link
              href="/privacy"
              underline="none"
              sx={{
                color: "text.secondary",
                fontSize: { xs: "13px", sm: "14px" },
                // "&:hover": { color: "#202124" },
              }}
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              underline="none"
              sx={{
                color: "text.secondary",
                fontSize: { xs: "13px", sm: "14px" },
                //  "&:hover": { color: "#202124" },
              }}
            >
              Terms
            </Link>

             <Link
              href="/feedback"
              underline="none"
              sx={{
                color: "text.secondary",
                fontSize: { xs: "13px", sm: "14px" },
                // "&:hover": { color: "#202124" },
              }}
            >
              Feedback
            </Link>
          </Stack>

          <Stack direction="row" spacing={0.5} alignItems="center">
            <IconButton
              sx={{
                color: "text.secondary",
                p: { xs: 0.25, sm: 0.5 },
                "& svg": { fontSize: { xs: "20px", sm: "24px" } },
              }}
            >
              <HelpOutline />
            </IconButton>
            <Link
              href="/support"
              underline="none"
              sx={{
                color: "text.secondary",
                fontSize: { xs: "13px", sm: "14px" },
                //  "&:hover": { color: "#202124" },
              }}
            >
              Help
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
