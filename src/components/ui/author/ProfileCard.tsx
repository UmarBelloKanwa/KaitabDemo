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
              component="div"
              sx={{
                color: theme.palette.text.primary,
                fontWeight: "bold",
                fontSize: "1em",

              }}
            >
              Cortex &nbsp;
              {!author.can_follow ? (
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    fontSize: "0.7em",
                    fontWeight: "bold",
                    borderRadius: 2,
                    lineHeight: 0.9,
                    gap: -1,
                    py: 0.5,
                    px: 1
                  }}
                  startIcon={(
                    <Box
                      component="svg"
                      color="primary"
                      sx={{ width: 15, height: 15, color: "text.primary.main" }}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.056-2.13c-.293-.306-.288-.778.018-1.1.306-.294.778-.287 1.1.018l1.476 1.528 3.825-5.738c.251-.375.756-.47 1.131-.22.375.251.47.756.22 1.131-.004-.001-.004-.001-.004-.003z" />
                    </Box>
                  )}
                > Upgrade </Button>
              ) : (
                <Typography
                  component="span"
                  variant="caption"
                  textTransform="lowercase"
                  sx={{ color: "grey" }}
                >
                  (digital mind){" "}
                </Typography>
              )}
            </Typography>
            <Typography
              variant="caption"
              component="div"
              sx={{ color: theme.palette.text.secondary, fontSize: "11px" }}
            >
              {author.can_follow ? "Active" : <span style={{ opacity: 0.5 }}> Upgrade for digital mind </span>}
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
                disabled={true ? true : false}
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
