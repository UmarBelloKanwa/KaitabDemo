"use client";

import type React from "react";

import { useState } from "react";
import { Box, TextField, IconButton, Typography, Link } from "@mui/material";
import Button from "@mui/material/Button";
import PhotoIcon from "@mui/icons-material/Photo";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BackButton from "@/components/ui/common/BackButton";
export default function FeedbackPage() {
  const [activeTab, setActiveTab] = useState<"bug" | "feature">("bug");
  const [bugText, setBugText] = useState("");
  const [featureText, setFeatureText] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
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
        <Typography
          sx={{
            color: "text.primary",
            cursor: "pointer",
            fontSize: { xs: "14px", sm: "16px" },
            "&:hover": { color: "white" },
          }}
        >
          Save
        </Typography>
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
            className={activeTab == "bug" ? "no" : "elevated"}
            sx={{
              flex: 1,
              py: { xs: 1.5, sm: 2 },
              px: { xs: 2, sm: 3 },
              textAlign: "center",
              borderRadius: "50px",
              cursor: "pointer",
              // bgcolor: activeTab === "bug" ? "white" : "transparent",
              // color: activeTab === "bug" ? "black" : "#9ca",
              // border:
              //   activeTab === "bug"
              //     ? "none"
              //     : "1px solid rgba(255, 255, 255, 0.2)",
              transition: "all 0.3s ease",
              fontWeight: 500,
              fontSize: { xs: "14px", sm: "15px", md: "16px" },
              // "&:hover": {
              //   bgcolor:
              //     activeTab === "bug" ? "white" : "rgba(255, 255, 255, 0.05)",
              // },
            }}
          >
            Bug report
          </Button>
          <Button
            variant={activeTab === "feature" ? "contained" : "outlined"}
            className={activeTab == "feature" ? "no" : "elevated"}
            onClick={() => setActiveTab("feature")}
            sx={{
              flex: 1,
              py: { xs: 1.5, sm: 2 },
              px: { xs: 2, sm: 3 },
              textAlign: "center",
              borderRadius: "50px",
              cursor: "pointer",
              // bgcolor: activeTab === "feature" ? "white" : "transparent",
              // color: activeTab === "feature" ? "black" : "#9ca3af",
              // border:
              //   activeTab === "feature"
              //     ? "none"
              //     : "1px solid rgba(255, 255, 255, 0.2)",
              transition: "all 0.3s ease",
              fontWeight: 500,
              fontSize: { xs: "14px", sm: "15px", md: "16px" },
              // "&:hover": {
              //   bgcolor:
              //     activeTab === "feature"
              //       ? "white"
              //       : "rgba(255, 255, 255, 0.05)",
              // },
            }}
          >
            Feature request
          </Button>
        </Box>

        {/* Bug Report Input */}
        {activeTab === "bug" && (
          <Box sx={{ position: "relative" }}>
            <TextField
              multiline
              rows={activeTab === "bug" ? 8 : 10}
              fullWidth
              placeholder="Tell us what happened - the more detail the better!"
              value={bugText}
              onChange={(e) => setBugText(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  //color: "white",
                  fontSize: { xs: "14px", sm: "15px", md: "16px" },
                  borderRadius: { xs: "10px", sm: "12px" },
                  bgcolor: "transparent",
                  border: "1px solid",
                  borderColor: "divider",
                  "& fieldset": {
                    border: "none",
                  },
                  // "&:hover": {
                  //   border: "1px solid rgba(255, 255, 255, 0.3)",
                  // },
                  // "&.Mui-focused": {
                  //   border: "1px solid rgba(255, 255, 255, 0.4)",
                  // },
                },
                "& .MuiInputBase-input": {
                  padding: { xs: "16px", sm: "18px", md: "20px" },
                  paddingBottom: { xs: "50px", sm: "55px", md: "60px" },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "#6b7280",
                  opacity: 1,
                },
              }}
            />
            {/* Image Upload Button */}
            <IconButton
              component="label"
              sx={{
                position: "absolute",
                bottom: { xs: "12px", sm: "14px", md: "16px" },
                right: { xs: "12px", sm: "14px", md: "16px" },
                // color: "#9ca3af",
                // bgcolor: "rgba(255, 255, 255, 0.05)",
                width: { xs: "36px", sm: "40px", md: "44px" },
                height: { xs: "36px", sm: "40px", md: "44px" },
                // "&:hover": {
                //   bgcolor: "rgba(255, 255, 255, 0.1)",
                // },
              }}
            >
              <PhotoIcon />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </IconButton>
            {selectedImage && (
              <Box
                sx={{
                  position: "absolute",
                  bottom: { xs: "12px", sm: "14px", md: "16px" },
                  right: { xs: "52px", sm: "58px", md: "64px" },
                  width: { xs: 40, sm: 48, md: 56 },
                  height: { xs: 40, sm: 48, md: 56 },
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                }}
              >
                <Box
                  component="img"
                  src={URL.createObjectURL(selectedImage)}
                  alt="Uploaded preview"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            )}
          </Box>
        )}

        {/* Feature Request Input */}
        {activeTab === "feature" && (
          <TextField
            multiline
            rows={10}
            fullWidth
            placeholder="Tell us about the feature you'd like to see - the more detail the better!"
            value={featureText}
            onChange={(e) => setFeatureText(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "white",
                fontSize: { xs: "14px", sm: "15px", md: "16px" },
                borderRadius: { xs: "10px", sm: "12px" },
                bgcolor: "transparent",
                border: "1px solid",
                borderColor: "divider",
                "& fieldset": {
                  border: "none",
                },
                // "&:hover": {
                //   border: "1px solid rgba(255, 255, 255, 0.3)",
                // },
                // "&.Mui-focused": {
                //   border: "1px solid rgba(255, 255, 255, 0.4)",
                // },
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
        )}

        {/* Privacy Notice */}
        <Typography
          variant="caption"
          sx={{
            mt: { xs: 2, sm: 2.5, md: 3 },
            fontSize: { xs: "12px", sm: "13px", md: "14px" },
            lineHeight: 1.6,
          }}
        >
          To help us resolve your issue, some diagnostic information will be
          included with your report. To learn more, see our{" "}
          <Link
            href="#"
            sx={{
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Privacy Policy
          </Link>
          .
        </Typography>
      </Box>
    </Box>
  );
}
