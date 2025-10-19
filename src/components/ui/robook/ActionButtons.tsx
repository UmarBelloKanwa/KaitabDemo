"use client";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FollowButton from "@/components/ui/robook/FollowButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

export default function ActionsButton({robookPublicId,isFollowing, canFollow }: {robookPublicId: string, isFollowing: boolean, canFollow: boolean}) {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", gap: 1.5, mb: 2 }}>
    {canFollow &&  <FollowButton robookPublicId={robookPublicId} isFollowing={isFollowing} />}
      <Button
        variant="outlined"
        sx={{
          borderColor: theme.palette.divider,
          color: theme.palette.text.disabled,
          flex: canFollow ? "unset" : 1,
          "&:hover": {
            bgcolor: theme.palette.action.hover,
            color: theme.palette.text.primary,
            borderColor: theme.palette.divider,
          },
        }}
      >
        Read
      </Button>
      <IconButton
        sx={{
          color: theme.palette.text.secondary,
          "&:hover": {
            color: theme.palette.text.primary,
            bgcolor: theme.palette.action.hover,
          },
        }}
      >
        <MoreHorizIcon />
      </IconButton>
    </Box>
  );
}
