import React, { useState } from "react";
import {
  Box,
  Typography,
  Popover,
  MenuItem,
  useTheme,
  Tooltip,
  Chip
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X"; // optional if using MUI v6+; else reuse TwitterIcon
import type { SocialLink } from "@/types/author";

const getPlatformIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "twitter":
    case "x":
      return <TwitterIcon sx={{ fontSize: "small" }} />;
    case "linkedin":
      return <LinkedInIcon sx={{ fontSize: "small" }} />;
    case "facebook":
      return <FacebookIcon sx={{ fontSize: "small" }} />;
    case "instagram":
      return <InstagramIcon sx={{ fontSize: "small" }} />;
    case "youtube":
      return <YouTubeIcon sx={{ fontSize: "small" }} />;
    case "github":
      return <GitHubIcon sx={{ fontSize: "small" }} />;
    default:
      return <LanguageIcon sx={{ fontSize: "small" }} />;
  }
};

export default function SocialLinks({ links }: { links: SocialLink[] }) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // const visibleLinks = links.slice(0, 3);
  // const hiddenLinks = links.slice(2);

  return (
    <Box sx={{ display: "flex", flexDirection: "column",  gap: 2, mb: 0.5 }}>
      {links.map((link, index) => (
        <Tooltip title={link.label || link.platform} key={index}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: theme.palette.text.disabled,
              cursor: "pointer",
              "&:hover": { color: theme.palette.text.primary },
            }}
            onClick={() => window.open(link.url, "_blank")}
          >
            
            {getPlatformIcon(link.platform)}
            <Typography variant="body2" sx={{ textTransform: "capitalize", fontSize: "small" }}>
              {link.platform}
            </Typography>
          </Box>
        </Tooltip>
      ))}

      {/* {hiddenLinks.length > 0 && (
        <>
          <Box
            sx={{
              color: theme.palette.text.disabled,
              cursor: "pointer",
              "&:hover": { color: theme.palette.text.primary },
              fontSize: "small"
            }}
            onClick={handleOpen}
          >
            <Typography variant="body2">+{hiddenLinks.length}</Typography>
          </Box>

          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          >
            {hiddenLinks.map((link, index) => (
              <MenuItem
                key={index}
                onClick={() => {
                  handleClose();
                  window.open(link.url, "_blank");
                }}
              >
                {getPlatformIcon(link.platform)}
                <Typography sx={{ ml: 1 }}>
                  {link.label || link.platform}
                </Typography>
              </MenuItem>
            ))}
          </Popover>
        </>
      )} */}
    </Box>
  );
}
