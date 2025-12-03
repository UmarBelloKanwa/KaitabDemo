"use client";

import { Box, Typography, Avatar, Button, Paper, Stack } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import type { User } from "@/types";
import CortexSettingCard from "@/components/ui/settings/CortexSettingCard";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const user: User | undefined = queryClient.getQueryData(["user"]);

  if (!user || !user?.author) {
    return <h1> Sorry unexpected error, occured </h1>;
  }

  const author = user.author;
  const goToEditProfile = () => {
    router.push("/profile/edit");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        py: 4,
        px: 2,
      }}
    >
      <Box sx={{ maxWidth: 600, mx: "auto" }}>
        {/* Account Section */}
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Account
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 4,
            border: `1px solid`,
            borderColor: "divider",
          }}
        >
          {/* Profile */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              mb: 3,
              pb: 3,
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                src={author.profile_picture}
                sx={{ width: 64, height: 64 }}
              />
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  Profile
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {author.name}
                </Typography>
              </Box>
            </Stack>
            <Button
              className="elevated"
              sx={{
                px: 3,
                fontWeight: 600,
              }}
              onClick={() => {
                goToEditProfile();
              }}
            >
              Edit
            </Button>
          </Stack>

          {/* Email */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              mb: 3,
              pb: 3,
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Email
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {author.contact}
              </Typography>
            </Box>
            <Button
              className="elevated"
              sx={{
                px: 3,
                fontWeight: 600,
              }}
              onClick={() => {
                goToEditProfile();
              }}
            >
              Edit
            </Button>
          </Stack>

          {/* Handle */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Handle
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {author.handle}
              </Typography>
            </Box>
            <Button
              className="elevated"
              onClick={() => {
                goToEditProfile();
              }}
              sx={{
                px: 3,
                fontWeight: 600,
              }}
            >
              Edit
            </Button>
          </Stack>
        </Paper>

        {/* Publications Section */}
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Cortex
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            border: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <CortexSettingCard />
        </Paper>
      </Box>
    </Box>
  );
}
