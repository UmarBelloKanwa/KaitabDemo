import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useAuthCheck from "@/hooks/auth/useAuthCheck";
import UserMenuPopup from "./common/UserMenu";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useRouter } from "next/navigation";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

export default function UserDisplay({ user, handleDrawerToggle }: { user: any, handleDrawerToggle: () => void }) {
  const requireAuth = useAuthCheck();
  const isAuthor = !!user?.author;
  const router = useRouter();

  return (
    <Box>
      {isAuthor && (
        <List>
          <ListItem
            disablePadding
          >
            <ListItemButton
              onClick={() => {
                requireAuth(() => {
                  if (isAuthor) {
                    handleDrawerToggle();
                    router.push(`/${user?.author?.handle}`);
                  }
                });
              }}
              sx={{
                borderRadius: 2,
                mb: 0,
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <ListItemIcon
                sx={{ color: "text.primary", minWidth: 36 }}
              >
                <AccountCircleOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="Profile"
                sx={{ color: "text.primary" }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      )}
      <Box
        sx={{
          py: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          gap: 1,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Button
          variant="outlined"
          className="elevated"
          fullWidth
          sx={{
            borderRadius: 2,
          }}
          onClick={() => {
            requireAuth(() => { router.push("/upgrade/premium") });
          }}
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
            <UserMenuPopup user={user} />
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
    </Box>

  );
}



