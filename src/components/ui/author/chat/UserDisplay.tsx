import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useAuthCheck from "@/hooks/auth/useAuthCheck";
import { useRouter, usePathname } from "next/navigation";
import { Avatar, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import type { Author } from "@/types/author";
import { getAuthorPath } from "@/lib/utils/navigate";

export default function UserDisplay({
  user,
  handleDrawerToggle,
  handle,
}: {
  user: any;
  handle: string;
  handleDrawerToggle: () => void;
}) {
  const requireAuth = useAuthCheck();
  const isAuthor = !!user?.author;
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const author: Author = queryClient.getQueryData(["author", handle])!;
  const navigateToSubscribePage = async () => {
    // Optimistic UI update
    if (author.is_subscribed && !author.requires_upgrade) {
      return;
    }
    router.push(getAuthorPath(handle, "/subscribe", pathname));
  };
  return (
    <Box>
      <Box
        sx={(theme) => ({
          py: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          gap: 1,
          borderTop: { xs: `1px solid ${theme.palette.divider}`, md: "none" },
        })}
      >
        {author.is_owner ? (
          <>
            {!author.monetization_enabled && (
              <Button
                size="small"
                variant="outlined"
                className="elevated"
                fullWidth
                onClick={() => {
                  router.push(getAuthorPath(handle, "/settings/payments", pathname));
                }}
                sx={{
                  borderRadius: 2,
                }}
              >
                Enable subscriptions
              </Button>
            )}
          </>
        ) : (
          <>
            {author.monetization_enabled && (
              <Button
                variant="outlined"
                className="elevated"
                fullWidth
                onClick={() => requireAuth(navigateToSubscribePage)}
                sx={{
                  borderRadius: 2,
                }}
              >
                {author.is_subscribed
                  ? "Subscribed"
                  : author.requires_upgrade
                    ? "Upgrade"
                    : "Subscribe"}
              </Button>
            )}
          </>
        )}
        <Box
          sx={{
            display: { xs: "block", sm: "block", md: "none" },
            width: "100%",
            p: 1,
            boxShadow: 11,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          {user ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                minWidth: 0,
                flex: 1,
              }}
            >
              <Avatar
                src={isAuthor ? user?.author?.profile_picture : undefined}
                sx={(theme) => ({
                  bgcolor: theme.palette.primary.main,
                  borderRadius: 2,
                  width: 41,
                  height: 41,
                })}
              >
                {isAuthor
                  ? user?.author?.name.charAt(0).toUpperCase()
                  : user?.name.charAt(0).toUpperCase()}
              </Avatar>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  minWidth: 0,
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{
                    color: "text.primary",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    width: "100%",
                  }}
                >
                  {isAuthor ? user?.author?.name : user?.name}
                </Typography>
                {isAuthor && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      width: "100%",
                    }}
                  >
                    @{user?.author?.handle}
                  </Typography>
                )}
              </Box>
            </Box>
          ) : (
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              fullWidth
              onClick={() => requireAuth(() => {})}
            >
              Sign in
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
