"use client";

import { useState } from "react";
import {
  Switch,
  Button,
  Divider,
  Alert,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useUserStore } from "@/store/user-store";
import type { Cortex } from "@/types/cortex";
import { updateCortexSettings } from "@/lib/api/cortex";
import { useQueryClient } from "@tanstack/react-query";

export default function SettingsCard({
  displaySettingsCard,
  setDisplaySettingsCard,
}: {
  displaySettingsCard: boolean;
  setDisplaySettingsCard: (value: boolean) => void;
}) {
  
  let { user } = useUserStore();

  const queryClient = useQueryClient();

  if (!user) {
    user = queryClient.getQueryData(["user"]) || null;
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

  const handleClose = () => setDisplaySettingsCard(false);

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

      <Dialog
        open={displaySettingsCard}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            border: "1px solid red",
            borderColor: "grey.800",
            borderRadius: 2,
            p: { xs: 0, md: 1 },
          },
          elevation: 0,
        }}
      >
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Box sx={{ maxWidth: 480, mx: "auto" }}>
            {/* Header */}
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}
            >
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
                <Typography variant="h6" fontWeight={600}>
                  Cortex Essence
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Safe Personalized Superintelligence
                </Typography>
              </Box>
            </Box>

            {/* Toggles */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography variant="body1" fontWeight={500}>
                    Awaken your Cortex
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
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
              </Box>

              {/* AUTO POST SECTION */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography variant="body1" fontWeight={500}>
                      Let my Cortex speak for me
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
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
                </Box>

                {/* Helper Text When Trying to Enable Autopost While Not Awakened */}
                {!isAwakened && (
                  <Typography
                    variant="caption"
                    color="warning"
                    sx={{ pl: 0.5 }}
                  >
                    Awaken your Cortex first to enable auto posting.
                  </Typography>
                )}
              </Box>

              <Divider />

              {/* Save button */}
              <Button
                variant="contained"
                fullWidth
                size="medium"
                disabled={loading}
                onClick={handleSaveSettings}
              >
                {loading ? (
                  <CircularProgress size={22} sx={{ color: "white" }} />
                ) : (
                  "Guide my Cortex"
                )}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
