import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/material";
import useAuthCheck from "@/hooks/auth/useAuthCheck";
// import { useUserStore } from "@/store/user-store";
import { useRouter } from "next/navigation";
import Chip from "@mui/material/Chip";

export default function UserDisplay({ user }: { user: any }) {
  const router = useRouter();
  const theme = useTheme();
  // const user = useUserStore((state) => state.user);

  const isAuthor = !!user?.author;
  const requireAuth = useAuthCheck();

  return (
    <Box
      sx={{
        py: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        gap: 1,
        // boxShadow: 11,
        // borderRadius: 2,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Button
        variant="outlined"
        fullWidth
        sx={(theme) => ({
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          border: "1px solid " + theme.palette.divider,
          borderRadius: 2,
          boxShadow: theme.shadows[1],   // elevation
          textTransform: "none",
          "&:hover": {
            boxShadow: theme.shadows[8],
            backgroundColor: theme.palette.background.paper,
          },
        })}
      >
        Upgrade
      </Button>


      <Box
        sx={{
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
            size="small"
            fullWidth
            onClick={() => requireAuth(() => { })}
          >
            Sign in
          </Button>
        )}
      </Box>
    </Box>
  );
}
