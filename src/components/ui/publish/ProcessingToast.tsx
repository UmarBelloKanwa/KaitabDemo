"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  Paper,
  IconButton,
  LinearProgress,
  Chip,
  Avatar,
  Stack,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/LocalLibraryOutlined";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DialogTitle from "@mui/material/DialogTitle";

interface ProcessingToastProps {
  isVisible?: boolean;
  onClose?: () => void;
  title?: string;
  description?: string;
  estimatedTime?: string;
  fileName?: string;
  author?: string;
  slug: string;
}

export default function ProcessingToast({
  isVisible = true,
  onClose,
  title = "Building your intelligent Robook",
  description = "Your form has been submitted successfully.",
  estimatedTime = "5–13 minutes",
  author = "James Clear",
  fileName,
  slug,
}: ProcessingToastProps) {
  const theme = useTheme();
  const [uploadTime, setUploadTime] = React.useState("");

  React.useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setUploadTime(formatted);
  }, []);

  if (!isVisible) return null;

  return (
    <Dialog
      open={isVisible}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          border: "1px solid red",
          borderColor: "grey.800",
          borderRadius: 2, // optional: rounded corners
          p: { xs: 0, md: 1 },
        },
        elevation: 0,
      }}
    >
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
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
        <Stack spacing={2}>
          {/* Header */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar
                sx={{
                  width: 58,
                  height: 58,
                  borderRadius: 1,
                  color: "text.primary",
                  bgcolor: "transparent"
                }}
              >
                <MenuBookIcon fontSize="large" />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="500" sx={{fontSize: {xs: "medium", sm: "large"}}}>
                  {title}
                </Typography>
                {author && (
                  <Typography variant="caption">
                    {author}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>

          {/* Status Chips */}
          <Box display="flex" gap={1} flexWrap="wrap">
            <Chip
              icon={<NotificationsActiveIcon sx={{ fontSize: 16 }} />}
              label="We'll notify you"
              size="small"
              sx={{ borderRadius: {xs: 0.5, sm: 2}, p: {sm:1.7} }}
              variant="outlined"
              
            />
            <Chip
              label={`Estimated: ${estimatedTime}`}
              size="small"
              sx={{ borderRadius: {xs: 0.5, sm: 2}, p: {sm:1.7}}}
              variant="outlined"
            />
          </Box>
{/* Progress */}
          <Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexWrap={"wrap"}
              mb={1}
            >
              <Typography variant="body2" fontWeight="500">
                Processing...
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This may take a few minutes
              </Typography>
            </Box>
            <LinearProgress
              sx={{
                height: 6,
                borderRadius: 3,
              }}
            />
          </Box>
          {/* File Info */}
          <Paper
            variant="outlined"
            sx={{
              borderRadius: 1.3,
              p: 2,
            }}
          >
            <Typography variant="body2" gutterBottom>
              <strong>Description:</strong> {description}
            </Typography>
            {fileName && (
              <Typography variant="body2" gutterBottom>
                <strong>File:</strong> {fileName}
              </Typography>
            )}
            <Typography variant="body2" gutterBottom>
              <strong>Robook:</strong> {slug}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Uploaded at {uploadTime}
            </Typography>
          </Paper>

          

          {/* Note */}
          <Paper
            variant="outlined"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              borderRadius: 1.3,
              p: 1.5,
            }}
          >
            <CheckCircleIcon color="success" sx={{ fontSize: 20 }} />
            <Typography variant="body2">
              You can close this window and continue working. We’ll notify you
              once the process is complete.
            </Typography>
          </Paper>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
