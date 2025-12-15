"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Link,
  Button,
   Menu,
   IconButton,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import { useState } from "react";

const navItems = [
  "Overview",
  "Privacy Policy",
  "Terms of Service",
  "FAQ",
  "Contact",
];
export default function GoogleSearchOverview() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Header/Navigation */}
        <AppBar
      position="static"
      elevation={0}
      variant="outlined"
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.default",
      }}
    >
      <Toolbar>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src="/app/logo-name.png"
            alt="Feedple"
            style={{
              width: "125px",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Desktop navigation */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 3,
          }}
        >
          {navItems.map((item, index) => (
            <Link
              key={item}
              href="#"
              underline="none"
              sx={(theme) => ({
                color: "text.primary",
                fontSize: "0.875rem",
                fontWeight: 500,
                borderBottom:
                  index === 0
                    ? `3px solid ${theme.palette.primary.main}`
                    : "3px solid transparent",
                "&:hover": {
                  color: "primary.main",
                },
              })}
            >
              {item}
            </Link>
          ))}
        </Box>

        {/* Mobile menu */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton onClick={handleOpen}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            {navItems.map((item) => (
              <MenuItem key={item} onClick={handleClose}>
                {item}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>

      {/* Hero Section */}
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 5 } }}>
      <Grid container spacing={6} alignItems="center">
        {/* Text */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              mb: 3,
              color: "text.primary",
              fontWeight: 400,
              fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
              lineHeight: { xs: 1.2, md: 1.3 },
            }}
          >
            Share ideas, grow your Personal Companion
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", sm: "1.125rem" },
              fontWeight: 1000,
              color: "text.secondary",
              lineHeight: 1.7,
            }}
          >
            A social platform where people share ideas while training a personal
            companion that learns from their work, interacts, and inspires
            others.
          </Typography>
        </Grid>

        {/* Image */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: 250, sm: 300, md: 400 },
            }}
          >
            <Image
              src="/illustration.png"
              alt="Illustration of a person using a personal companion platform"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </Box>
        </Grid>
      </Grid>

      {/* Button */}
      <Box
        sx={{
          mt: { xs: 5, md: 3 },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          size="large"
          sx={{
            fontSize: { xs: "1rem", md: "1.125rem" },
            borderRadius: 50,
            px: { xs: 4, md: 6 },
            py: { xs: 1.5, md: 2 },
          }}
        >
          Get started
        </Button>
      </Box>
    </Container>
      {/* What We Do Section */}
      <Box sx={{ py: 8 }}>
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
            Feedple is a social platform where people create, share, and
            continuously grow a safe, personalized companion that learns from
            their real thoughts, stays true to their essence, and remains
            accessible for learning, collaboration, and inspiration beyond their
            lifetime.
          </Typography>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Card elevation={0} sx={{ height: "100%",  bgcolor: "background.default", border: "1px solid", borderColor: "divider" }}>
                <CardContent sx={{ p: 4, textAlign: "center",  }}>
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
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ mb: 2, fontWeight: 500, color: "text.primary" }}
                  >
                    Publish and Train
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", lineHeight: 1.6 }}
                  >
                    Share ideas while training your Personal Companion to
                    understand, evolve with, and preserve your knowledge.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Card elevation={0} sx={{ height: "100%", bgcolor: "background.default", border: "1px solid", borderColor: "divider" }}>
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
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <path
                        d="M16 6L19 12L26 13L21 18L22 25L16 22L10 25L11 18L6 13L13 12L16 6Z"
                        fill="#ea4335"
                      />
                    </svg>
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ mb: 2, fontWeight: 500, color: "text.primary" }}
                  >
                    Social Interaction
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", lineHeight: 1.6 }}
                  >
                    Users follow authors and chat with their Personal Companions
                    for insights, advice, and conversations inspired by the
                    author's work.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Card elevation={0} sx={{ height: "100%",  bgcolor: "background.default", border: "1px solid", borderColor: "divider" }}>
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
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ mb: 2, fontWeight: 500, color: "text.primary" }}
                  >
                    Preserve Legacy
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", lineHeight: 1.6 }}
                  >
                    The Personal Companion continues sharing the author's
                    knowledge as a helpful aide, even after they're gone, with
                    explicit consent and non-impersonation.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Mission & Vision Section */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Grid
          container
          spacing={6}
          alignItems="center"
          justifyContent="center"
          alignContent="center"
        >
          <Grid>
            <Box
              sx={{
                p: 4,
                borderColor: "primary.main",
                borderRadius: "0 8px 8px 0",
                textAlign: "center",
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  color: "primary.main",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  letterSpacing: "1px",
                  mb: 2,
                  display: "block",
                }}
              >
                OUR MISSION
              </Typography>
              {/* <Typography
                variant="h4"
                sx={{
                  fontSize: "1.75rem",
                  fontWeight: 400,
                  color: "text.primary",
                  mb: 2,
                  lineHeight: 1.4,
                }}
              >
                Organize the world's information
              </Typography> */}
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.7,
                  fontSize: "x-large",
                }}
              >
                "Our mission is to build a safe, personalized companion <br />{" "}
                that learns from each individual and helps them achieve their
                goals."
              </Typography>
            </Box>
          </Grid>

          <Grid>
            <Box
              sx={{
                p: 4,
                borderRadius: "0 8px 8px 0",
                textAlign: "center",
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  color: "#34a853",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  letterSpacing: "1px",
                  mb: 2,
                  display: "block",
                }}
              >
                OUR VISION
              </Typography>
              {/* <Typography
                variant="h4"
                sx={{
                  fontSize: "1.75rem",
                  fontWeight: 400,
                  color: "text.primary",
                  mb: 2,
                  lineHeight: 1.4,
                }}
              >
                A world where information empowers everyone
              </Typography> */}
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.7,
                  fontSize: "x-large",
                }}
              >
                "Our vision is a world where everyone has a safe, personalized
                companion that learns and evolves from their thoughts, helps
                with daily tasks, and works on their behalf."
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Product Features Section */}
      <Box sx={{ py: 8 }}>
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
            Cortex is a safe, personalized companion that learns from you and
            helps you achieve more.
          </Typography>

          <Grid container spacing={3}>
            {/* <Grid size={{ xs: 12, md: 6 }}>
              <Card elevation={0} sx={{ height: "100%", display: "flex" }}>
                <CardContent sx={{ p: 4, flex: 1 }}>
                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}
                  >
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
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          stroke="#1a73e8"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ mb: 1, fontWeight: 500, color: "text.primary" }}
                      >
                        Instant Search Results
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", lineHeight: 1.6 }}
                      >
                        Get relevant results in milliseconds with our advanced
                        indexing and ranking algorithms that understand your
                        query intent.
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid> */}

            <Grid size={{ xs: 12, md: 6 }}>
              <Card elevation={0} sx={{ height: "100%", display: "flex", bgcolor: "background.default", border: "1px solid", borderColor: "divider" }}>
                <CardContent sx={{ p: 4, flex: 1 }}>
                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}
                  >
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
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                          fill="#34a853"
                        />
                      </svg>
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ mb: 1, fontWeight: 500, color: "text.primary" }}
                      >
                        It learns everything you write
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", lineHeight: 1.6 }}
                      >
                        Every thought you publish on Feedple continuously trains
                        your Cortex.
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Card elevation={0} sx={{ height: "100%", display: "flex",  bgcolor: "background.default", border: "1px solid", borderColor: "divider" }}>
                <CardContent sx={{ p: 4, flex: 1 }}>
                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}
                  >
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
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="7"
                          height="7"
                          rx="1"
                          fill="#fbbc04"
                        />
                        <rect
                          x="14"
                          y="3"
                          width="7"
                          height="7"
                          rx="1"
                          fill="#fbbc04"
                        />
                        <rect
                          x="3"
                          y="14"
                          width="7"
                          height="7"
                          rx="1"
                          fill="#fbbc04"
                        />
                        <rect
                          x="14"
                          y="14"
                          width="7"
                          height="7"
                          rx="1"
                          fill="#fbbc04"
                        />
                      </svg>
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ mb: 1, fontWeight: 500, color: "text.primary" }}
                      >
                        It keeps working always (only if you allow)
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", lineHeight: 1.6 }}
                      >
                        Your Cortex helps you with your tasks always, shares new
                        insights, stays true to your purpose, and continuously
                        spreads and teaches your ideas to others. People can
                        learn from it, collaborate, and use it to solve
                        problems.
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} sx={{m: "auto"}}>
              <Card elevation={0} sx={{ height: "100%", display: "flex",  bgcolor: "background.default", border: "1px solid", borderColor: "divider" }}>
                <CardContent sx={{ p: 4, flex: 1 }}>
                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}
                  >
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
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
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
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ mb: 1, fontWeight: 500, color: "text.primary" }}
                      >
                        You control it completely
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", lineHeight: 1.6 }}
                      >
                        You decide when to awaken it, what it is allowed to do,
                        and whether it works automatically.
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* <Grid size={{ xs: 12, md: 6 }}>
              <Card elevation={0} sx={{ height: "100%", display: "flex" }}>
                <CardContent sx={{ p: 4, flex: 1 }}>
                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}
                  >
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
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          stroke="#9c27b0"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ mb: 1, fontWeight: 500, color: "text.primary" }}
                      >
                        Fact-Checking Tools
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", lineHeight: 1.6 }}
                      >
                        Verify information with built-in fact-checking features
                        and source credibility indicators for reliable results.
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid> */}

            {/* <Grid size={{ xs: 12, md: 6 }}>
              <Card elevation={0} sx={{ height: "100%", display: "flex" }}>
                <CardContent sx={{ p: 4, flex: 1 }}>
                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}
                  >
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
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 2v20M17 7H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
                          stroke="#00897b"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ mb: 1, fontWeight: 500, color: "text.primary" }}
                      >
                        Voice Search
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", lineHeight: 1.6 }}
                      >
                        Search hands-free using natural voice commands with
                        advanced speech recognition technology.
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid> */}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
