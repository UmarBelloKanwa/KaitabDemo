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

export default function ProfileCard({ author }: { author: Author }) {
  const theme = useTheme();

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
            right: 16,
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

      <CardContent sx={{ p: 2, pt: 1 }}>
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

        {/* Bio */}
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.disabled,
            maxWidth: "85%",
            width: "85%",
            mb: 2,
            lineHeight: 1.6,
          }}
        >
          {author.short_bio}
        </Typography>

        {/* Links */}
        {author.social_links && <SocialLinks links={author.social_links} />}

        {/* Subscriber Count */}
        <Typography
          variant="body2"
          component="div"
          sx={{ color: theme.palette.text.secondary, mb: 2 }}
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
        
        {/* Bottom Navigation */}
        {/* <Box>
                    <Divider sx={{ borderColor: theme.palette.divider, mb: 1.5 }} />
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="body2" sx={{ color: theme.palette.text.primary, fontWeight: 500 }}>
                                Robooks
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                Posts
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                Likes
                            </Typography>
                        </Box>

                    </Box> 
            </Box> */}
      </CardContent>
    </Card>
  );
}
