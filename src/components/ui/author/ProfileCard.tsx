"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import type { Author } from "@/types/author";
import SocialLinks from "@/components/ui/author/SocialLinks";
import ActionsButtons from "./ActionsButtons";
import TabsButton from "@/components/ui/author/TabsButtons";
import Chip from "@mui/material/Chip";
import MessageIcon from "@mui/icons-material/MessageOutlined";
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined';

export default function ProfileCard({ author }: { author: Author }) {
  const theme = useTheme();

  const actions = [
    { label: "Chat", icon: <MessageIcon fontSize="small" /> },
    { label: "Ask", icon: <LiveHelpOutlinedIcon fontSize="small" /> },

    // {label: "Add"}
  ];

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: "100%",
        mx: "auto",
        bgcolor: theme.palette.background.default,
        //border: `1px solid ${theme.palette.divider}`,
        color: theme.palette.text.primary,
        overflow: "hidden",
      }}
      elevation={0}
    >
      {/* Background Header */}
      <Box
        sx={{
          height: 200,
          borderRadius: 1,
          backgroundImage: `url(${author.cover_photo ?? "/cover.jpg"})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      >
        {/* Profile Avatar positioned over the background */}
        <Avatar
          src={author.profile_picture}
          // alt="James Clear"
          sx={{
            position: "absolute",
            bottom: -50,
            right: { xs: 9, sm: 16 },
            width: 109,
            height: 109,
            border: `1px solid ${theme.palette.divider}`,
            bgcolor: theme.palette.grey[700],
            color: theme.palette.text.primary,
          }}
        >
          {author.name.charAt(0)}
        </Avatar>
      </Box>

      <CardContent sx={{ p: 2, px: { xs: 1, md: 2 }, pt: 1 }}>
        {/* Name and Username */}
        <Box sx={{ mb: 1.5 }}>
          <Typography
            variant="h6"
            component="h2"
            sx={{ color: theme.palette.text.primary, fontWeight: "bold" }}
          >
            {author.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary }}
          >
            @{author.handle}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: 0,
            mb: 1,
          }}
        >
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <Avatar
              src={author.profile_picture}
              sx={{
                bgcolor: theme.palette.primary.main,
                width: 45,
                height: 45,
                //borderRadius: 1,
                border: `1px solid ${theme.palette.divider}`,
                color: theme.palette.text.primary,
              }}
            >
              {author.name.charAt(0)}
            </Avatar>

            {/* Online indicator */}
            <Box
              sx={(theme) => ({
                position: "absolute",
                bottom: 2,
                right: 2,
                width: 12,
                height: 12,
                bgcolor: "green", // green
                borderRadius: "50%",
                border: "2px solid white", // clean border
              })}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h6"
              component="h2"
              sx={{
                color: theme.palette.text.primary,
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              Cortex{" "}
              <Typography
                component="span"
                variant="caption"
                textTransform="lowercase"
                sx={{ color: "grey" }}
              >
                (living digital mind){" "}
              </Typography>
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: theme.palette.text.secondary, fontSize: "11px" }}
            >
              Active
            </Typography>
          </Box>
        </Box>
        {/* Bio */}
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.disabled,
            maxWidth: "85%",
            width: "85%",
            mb: 1,
            lineHeight: 1.6,
          }}
        >
          {author.short_bio}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: theme.palette.text.disabled,
            cursor: "pointer",
            mb: 2,
            "&:hover": { color: theme.palette.text.primary },
          }}
        >
          {actions.map((action, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: theme.palette.text.disabled,
                cursor: "pointer",
                "&:hover": { color: theme.palette.text.primary },
              }}
            >
              <Chip
                size="small"
                icon={action.icon}
                label={action.label}
                sx={{
                  fontSize: "small",
                  gap: 0.1,
                  py: 1,
                  px: 0.5,
                }}
              />
            </Box>
          ))}
        </Box>

        {/* Links */}
        {author.social_links && <SocialLinks links={author.social_links} />}

        {/* Subscriber Count */}
        <Typography
          variant="body2"
          component="div"
          sx={{ color: theme.palette.text.secondary, mb: 2, fontSize: "small" }}
        >
          <span> {author.followers_count} followers </span> &nbsp; • &nbsp;
          <span> {author.expertise_area} </span>
        </Typography>

        {/* Action Buttons */}
        <ActionsButtons
          canFollow={author.can_follow}
          // canFollow={true}
          isFollowing={author.is_following}
          authorPublicId={author.public_id}
        />
        <TabsButton />
        <Divider sx={{ borderColor: theme.palette.divider, mb: 0 }} />
      </CardContent>
    </Card>
  );
}
