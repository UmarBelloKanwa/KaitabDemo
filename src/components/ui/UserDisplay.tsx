import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/material";
import useAuthCheck from "@/hooks/auth/useAuthCheck";
// import { useUserStore } from "@/store/user-store";
import { useRouter } from "next/navigation";

export default function UserDisplay({ user }: { user: any }) {
  const router = useRouter();
  const theme = useTheme();
  // const user = useUserStore((state) => state.user);

  const isAuthor = !!user?.author;
  const requireAuth = useAuthCheck();

  return (
    <Box
      sx={{
        p: 2,
        boxShadow: 11,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "rgba(255, 255, 255, 0.03)",
      }}
    >
      {user ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
          onClick={() =>
            requireAuth(() => {
              if (isAuthor) {
                router.push(`/${user?.author?.handle}`);
              }
            })
          }
        >
          <Avatar
            src={isAuthor ? user?.author?.profile_picture : undefined}
            sx={{
              bgcolor: theme.palette.primary.main,
              borderRadius: 2,
              width: 41,
              height: 41,
            }}
          >
            {isAuthor
              ? user?.author?.name.charAt(0).toUpperCase()
              : user?.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.primary, fontWeight: 500 }}
            >
              {isAuthor ? user?.author?.name : user?.name}
            </Typography>
            {isAuthor && (
              <Typography
                variant="caption"
                sx={{ color: theme.palette.text.secondary }}
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
          fullWidth
          onClick={() => requireAuth(() => {})}
        >
          Sign in
        </Button>
      )}
    </Box>
  );
}
