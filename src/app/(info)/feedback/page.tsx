"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Link,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import PhotoIcon from "@mui/icons-material/Photo";
import BackButton from "@/components/ui/common/BackButton";
import { submitFeedback } from "@/lib/api/feedback";
import { FeedbackType } from "@/types/feedback";

export default function FeedbackPage() {
  const [activeTab, setActiveTab] = useState<"bug" | "feature">("bug");
  const [bugText, setBugText] = useState("");
  const [featureText, setFeatureText] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    open: boolean;
    severity: "success" | "error";
    message: string;
  }>({
    open: false,
    severity: "success",
    message: "",
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const submit = async () => {
    try {
      setLoading(true);
      const message = activeTab === "bug" ? bugText : featureText;
      const type =
        activeTab === "bug" ? FeedbackType.FEEDBACK : FeedbackType.FEATURE;

      const data: { message: string; type: FeedbackType; image?: File } = {
        message,
        type,
      };

      if (selectedImage) {
        data["image"] = selectedImage;
      }

      await submitFeedback(data); // Make sure your API accepts FormData

      setAlert({
        open: true,
        severity: "success",
        message: "Feedback sent successfully!",
      });

      // Reset inputs
      setBugText("");
      setFeatureText("");
      setSelectedImage(null);
    } catch (err) {
      console.log(err);
      setAlert({
        open: true,
        severity: "error",
        message: "Failed to send feedback. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: { xs: 1.5, sm: 2 },
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <BackButton />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            fontSize: { xs: "18px", sm: "20px", md: "24px" },
          }}
        >
          Feedback
        </Typography>
        <Button
          onClick={submit}
          disabled={loading}
          variant="contained"
          sx={{ textTransform: "none" }}
        >
          {loading ? "Sending..." : "Save"}
        </Button>
      </Box>

      {/* Content */}
      <Box
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
          maxWidth: "800px",
          mx: "auto",
          width: "100%",
        }}
      >
        {/* Toggle Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: { xs: 1.5, sm: 2 },
            mb: { xs: 2.5, sm: 3 },
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Button
            onClick={() => setActiveTab("bug")}
            variant={activeTab === "bug" ? "contained" : "outlined"}
            sx={{
              flex: 1,
              py: 1.5,
              px: 2,
              borderRadius: "50px",
              fontWeight: 500,
            }}
          >
            Bug report
          </Button>
          <Button
            onClick={() => setActiveTab("feature")}
            variant={activeTab === "feature" ? "contained" : "outlined"}
            sx={{
              flex: 1,
              py: 1.5,
              px: 2,
              borderRadius: "50px",
              fontWeight: 500,
            }}
          >
            Feature request
          </Button>
        </Box>

        {/* Input */}
        <Box sx={{ position: "relative" }}>
          <TextField
            multiline
            rows={activeTab === "bug" ? 8 : 10}
            fullWidth
            placeholder={
              activeTab === "bug"
                ? "Tell us what happened - the more detail the better!"
                : "Tell us about the feature you'd like to see - the more detail the better!"
            }
            value={activeTab === "bug" ? bugText : featureText}
            onChange={(e) =>
              activeTab === "bug"
                ? setBugText(e.target.value)
                : setFeatureText(e.target.value)
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                fontSize: { xs: "14px", sm: "15px", md: "16px" },
                borderRadius: { xs: "10px", sm: "12px" },
                bgcolor: "transparent",
                border: "1px solid",
                borderColor: "divider",
                "& fieldset": { border: "none" },
              },
              "& .MuiInputBase-input": {
                padding: { xs: "16px", sm: "18px", md: "20px" },
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#6b7280",
                opacity: 1,
              },
            }}
          />

          {/* Image Upload for bug */}
          {activeTab === "bug" && (
            <IconButton
              component="label"
              sx={{ position: "absolute", bottom: 12, right: 12 }}
            >
              <PhotoIcon />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </IconButton>
          )}

          {selectedImage && (
            <Box
              sx={{
                position: "absolute",
                bottom: 12,
                right: 52,
                width: 48,
                height: 48,
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Box
                component="img"
                src={URL.createObjectURL(selectedImage)}
                alt="Uploaded preview"
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          )}
        </Box>

        {/* Privacy Notice */}
        <Typography
          variant="caption"
          sx={{ mt: 2, fontSize: 14, lineHeight: 1.6 }}
        >
          To help us resolve your issue, some diagnostic information will be
          included with your report. To learn more, see our{" "}
          <Link
            href="#"
            sx={{
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Privacy Policy
          </Link>
          .
        </Typography>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
