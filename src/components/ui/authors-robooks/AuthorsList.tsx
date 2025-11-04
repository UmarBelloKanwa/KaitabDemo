"use client";

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VerifiedIcon from "@mui/icons-material/Verified";
import BookIcon from "@mui/icons-material/MenuBook";
import type { AuthorProfileResponse } from "@/types/profile-edit";
import { useRouter } from "next/navigation";
import { followAuthor } from "@/lib/api/author";
import useAuthCheck from "@/hooks/auth/useAuthCheck";

interface Author extends AuthorProfileResponse {
  followers_count: number;
  books_count: number;
  public_id: string;
}

export default function AuthorsList({ member }: { member: Author }) {
  const router = useRouter();
  const requireAuth = useAuthCheck();
  
    
  return (
    <>
      <ListItem
        alignItems="flex-start"
        sx={{
          py: 2,
          px: 0,
          "&:hover": {
            backgroundColor: "action.hover",
          },
        }}
        onClick={() => router.push(`/${member.handle}`)}
      >
        <ListItemAvatar>
          <Avatar src={member?.profile_picture || ""} sx={{ width: 48, height: 48 }} />
        </ListItemAvatar>
        <ListItemText
          sx={{ mr: { xs: 0, sm: 2 } }}
          primary={
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: -1,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontSize: "0.95rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {member.name}{" "}
                    {
                      <VerifiedIcon
                        sx={{
                          fontSize: "0.9rem",
                          color: "primary.main",
                          ml: 0.5,
                        }}
                      />
                    }
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: -0.5 }}
                  >
                    @{member.handle}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      borderRadius: 20,
                      textTransform: "none",
                      minWidth: 80,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      requireAuth(async () => { 
                        await followAuthor(member.public_id);
                      });
                    }}
                  >
                    Follow
                  </Button>
                  <IconButton size="small">
                    <MoreVertIcon />
                  </IconButton>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                {member.short_bio}
              </Typography>

              <Box display="flex" gap={0.5} mb={1} mt={1} flexWrap="wrap">
                <Chip
                  label={member.expertise_area || "Author"}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: "0.75rem",
                    borderRadius: 10,
                  }}
                />
              </Box>

              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Rating value={5} precision={0.1} size="small" readOnly />
                  {/* <Typography variant="body2" color="text.secondary">
                                        {member.rating}
                                    </Typography> */}
                </Box>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <BookIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                  <Typography variant="caption" color="text.secondary">
                    {member.books_count} publications
                  </Typography>
                </Box>
              </Box>

              <Typography variant="caption" color="text.secondary">
                {/* • */} {member.followers_count} followers
              </Typography>
            </Box>
          }
        />
      </ListItem>
    </>
  );
}
