"use client";
import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { usePathname, useRouter } from "next/navigation";
import type { Author } from "@/types/author";
import useAuthCheck from "@/hooks/auth/useAuthCheck";
import { getAuthorPath } from "@/lib/utils/navigate";

export default function ProfileCard({ author }: { author: Author }) {
  const pathname = usePathname();
  const router = useRouter();
  const requireAuth = useAuthCheck();

  const isActive = (path: string) =>
    pathname === path || pathname.endsWith(path);

  const navButtonSx = (active: boolean) => ({
    py: 0.2,
    px: 0.8,
    fontSize: "0.73em",
    border: "2px solid",
    borderColor: "divider",
    borderRadius: 2,

    height: "fit-content",
    color: "white",
    ...(active && {
      bgcolor: "white",
      color: "black",
      borderColor: "white",
    }),
  });

  const navigateToSubscribePage = async () => {
    // Optimistic UI update
    if (author.is_subscribed && !author.requires_upgrade) {
      return;
    }
    router.push(getAuthorPath(author.handle, "/subscribe", pathname));
  };

  return (
    <Box
      sx={{
        mx: "auto",
        my: 1,
        width: { xs: "80%", sm: "70%", md: "40%" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        textAlignLast: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "inline-block",
          height: "fit-content",
        }}
      >
        <Avatar
          src={author.profile_picture}
          sx={{
            width: 90,
            height: 90,
            border: "2px solid",
            borderColor: "divider",
          }}
        >
          {author.name.charAt(0)}
        </Avatar>

        {/* Online indicator */}
        <Box
          sx={(theme) => ({
            position: "absolute",
            bottom: 11,
            right: 11,
            width: 13,
            height: 13,
            bgcolor: "green", // green
            borderRadius: "50%",
            border: "2px solid white", // clean border
          })}
        />
      </Box>
      <Typography variant="h6">{author.name}</Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        {author.is_owner ? (
          <>
            {!author.monetization_enabled ? (
              <Button
                variant="text"
                size="small"
                onClick={() => {
                  router.push(getAuthorPath(author.handle, "/settings/payments", pathname));
                }}
              >
                Enable subscriptions
              </Button>
            ) : (
              <Typography component={"div"} variant="caption" color="primary">
                @{author.handle}
              </Typography>
            )}
          </>
        ) : (
          <>
            {author.monetization_enabled ? (
              <Button
                variant="text"
                size="small"
                onClick={() => requireAuth(navigateToSubscribePage)}
                sx={{
                  p: 0,
                  ml: -1,
                  fontSize: "0.7em",
                }}
              >
                {author.is_subscribed
                  ? "Subscribed"
                  : author.requires_upgrade
                    ? "Upgrade"
                    : "Subscribe"}
              </Button>
            ) : (
              <Typography component={"div"} variant="caption" color="secondary">
                @{author.handle}
              </Typography>
            )}
          </>
        )}
      </Box>

      <Typography variant="caption" color="grey" fontSize="x-small">
        {author.short_bio}
      </Typography>

      <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
        <Button
          size="small"
          variant="outlined"
          onClick={() => router.push(getAuthorPath(author.handle, "/chat", pathname))}
          sx={navButtonSx(isActive("/chat") || isActive(`/${author.handle}`))}
        >
          Chat
        </Button>

        <Button
          size="small"
          variant="outlined"
          onClick={() => router.push(getAuthorPath(author.handle, "/library", pathname))}
          sx={navButtonSx(isActive("/library"))}
        >
          Library
        </Button>

        <Button
          size="small"
          variant="outlined"
          onClick={() => router.push(getAuthorPath(author.handle, "/about", pathname))}
          sx={navButtonSx(isActive("/about"))}
        >
          About
        </Button>
      </Box>
    </Box>
  );
}
