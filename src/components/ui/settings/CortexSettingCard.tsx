"use client";

import { useState } from "react";
import {
  Switch,
  Button,
  Alert,
  CircularProgress,
  Snackbar,
  Stack,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Cortex } from "@/types/cortex";
import { updateCortexSettings } from "@/lib/api/cortex";
import { useQueryClient } from "@tanstack/react-query";
import type { User } from "@/types";

export default function CortexSettingCard() {
  const queryClient = useQueryClient();

  const user: User | null = queryClient.getQueryData(["user"]) || null;
  
  if (!user) {
    return <></>;
  }
  // read the cached cortex data
  const cortex: Cortex | undefined = queryClient.getQueryData(["cortex"]);

  const cortexSettings = cortex?.setting;

  const [isAwakened, setIsAwakened] = useState(
    cortexSettings?.is_awakened || false
  );
  const [autoPostEnabled, setAutoPostEnabled] = useState(
    cortexSettings?.auto_post_enabled || false
  );

  const [loading, setLoading] = useState(false);

  // Alert states
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  const handleSaveSettings = async () => {
    setLoading(true);

    try {
      await updateCortexSettings({
        is_awakened: isAwakened,
        auto_post_enabled: autoPostEnabled,
      });

      setAlertMessage("Settings updated successfully!");
      setAlertType("success");
      setAlertOpen(true);
    } catch (err: any) {
      setAlertMessage(err?.message || "Failed to update settings.");
      setAlertType("error");
      setAlertOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Alerts */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={alertType}
          variant="filled"
          onClose={() => setAlertOpen(false)}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>

      <Box>
        {/* Header */}
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
              src={user?.author?.profile_picture}
              sx={(theme) => ({
                width: 51,
                height: 51,
                border: `1px solid ${theme.palette.divider}`,
                bgcolor: theme.palette.grey[700],
                color: theme.palette.text.primary,
              })}
            >
              {user?.name?.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Cortex Essence
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                My Personal AI Companion
              </Typography>
            </Box>
          </Stack>
        </Stack>

        {/* Toggles */}
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
              Awaken your Cortex
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Let Cortex think and speak freely
            </Typography>
          </Box>
          <Switch
            checked={isAwakened}
            onChange={(e) => {
              setIsAwakened(e.target.checked);

              if (!e.target.checked) {
                setAutoPostEnabled(false);
              }
            }}
          />
        </Stack>

        {/* <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Let my Cortex speak for me
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Allow Cortex to post on my behalf
            </Typography>
          </Box>
          <Switch
            checked={isAwakened ? autoPostEnabled : false}
            disabled={!isAwakened}
            onChange={(e) => {
              if (isAwakened) {
                setAutoPostEnabled(e.target.checked);
              } else {
                // If user is not awakened, ensure it's off
                setAutoPostEnabled(false);
              }
            }}
          />
        </Stack> */}

        {/* {!isAwakened && (
          <Typography
            variant="caption"
            color="warning"
            sx={{ pl: 0, fontSize: "small", opacity: 0.8 }}
          >
            Awaken your Cortex first to enable auto posting.
          </Typography>
        )} */}

        {/* Save button */}
        <Button
          fullWidth
          disabled={loading}
          onClick={handleSaveSettings}
          sx={{
            mt: 3,
            bgcolor: "divider",
            color: "text.primary",
            "&:hover": {
              bgcolor: "action.hover",
            },
            py: 1.5,
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          {loading ? (
            <CircularProgress size={22} sx={{ color: "white" }} />
          ) : (
            "Save preferences"
          )}
        </Button>
      </Box>
    </>
  );
}
