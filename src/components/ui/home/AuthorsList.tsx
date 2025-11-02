"use client";

import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchAuthors } from "@/actions/author";
import useAuthCheck from "@/hooks/auth/useAuthCheck";
import { followAuthor, unfollowAuthor } from "@/lib/api/author";

export default function AuthorsLists() {
  const { data } = useInfiniteQuery({
    queryKey: ["authors"],
    queryFn: ({ pageParam = 0 }) => fetchAuthors(pageParam), // allows loading more later
    initialPageParam: 0,
    getNextPageParam: (_last, pages) => pages.length,
  });

  const authors = data?.pages.flat() ?? [];

  return (
    <Box
      sx={(theme) => ({
        border: `1px solid ${theme.palette.divider}`,
        height: "fit-content",
        m: "auto",
        boxShadow: 1,
        p: 2,
        pt: 1,
        borderRadius: 2,
        scrollbarWidth: "none", // Firefox
        "&::-webkit-scrollbar": { display: "none" }, // Chrome/Safari
        overflowY: "auto",
      })}
    >
      <Typography variant="h6" sx={{ mb: 1 }}>
        Who to follow
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          height: "fit-content",
          m: "auto",
        }}
      >
        {authors.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.5 }}>
            No authors to display.
          </Typography>
        ) : (
          authors.map((user, index) => (
            <AuthorCard key={index} user={user} index={index} />
          ))
        )}
      </Box>
    </Box>
  );
}

function AuthorCard({ user, index }: { user: any; index: number }) {
  const [isFollowingBook, setIsFollowingBook] = React.useState(false);
  const requiresAuth = useAuthCheck();
  const router = useRouter();

  return (
    <Card
      key={index}
      elevation={0}
      sx={{
        p: 1.5,
        borderRadius: 2,
        bgcolor: "background.paper",
        boxShadow: 1,
      }}
      onClick={() => {
        router.push(`/r/${user.handle}`);
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 0,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar sx={{ width: 50, height: 50 }} src={user.profile_picture} />
          <Box sx={{ display: "flex", flexDirection: "column", gap: -1 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: "0.95rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              {user.name}{" "}
              {/* {user.isVerified && (
                <CheckCircleIcon
                  sx={{
                    fontSize: "0.9rem",
                    color: "primary.main",
                    ml: 0.5,
                  }}
                />
              )} */}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: -0.5 }}
            >
              @{user.handle}
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            requiresAuth(async () => {
              setIsFollowingBook((prev) => !prev);
              try {
                if (isFollowingBook) {
                  await unfollowAuthor(user.public_id);
                } else {
                  await followAuthor(user.public_id);
                }
              } catch (err) {
                console.log("Follow/unfollow failed:", err);
                setIsFollowingBook((prev) => !prev);
              }
            });
          }}
          sx={{
            px: 1.5,
            py: 0.5,
            fontSize: "0.75rem",
            textTransform: "none",
            borderRadius: "20px",
          }}
        >
          {isFollowingBook ? "Following" : "Follow"}
        </Button>
      </Box>
    </Card>
  );
}
