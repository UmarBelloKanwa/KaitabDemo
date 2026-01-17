"use client";

import type React from "react";
import { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Avatar,
  IconButton,
  Typography,
  Stack,
  Divider,
  Alert,
  CircularProgress,
  useTheme,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  PhotoCamera as PhotoCameraIcon,
  Close as CloseIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useProfileValidation } from "@/hooks/profile/useProfileValidation";
import { useProfileSave } from "@/hooks/profile/useProfileSave";
import type { ProfileData } from "@/hooks/profile/useProfileValidation";
import type { AuthorProfileResponse, SocialLink } from "@/types/profile-edit";
import { useRouter } from "next/navigation";

const SOCIAL_PLATFORMS = [
  "twitter",
  "x",
  "facebook",
  "instagram",
  "linkedin",
  "youtube",
  "github",
  "website",
  "tiktok",
  "medium",
] as const;

export default function EditProfile({
  authorProfile,
}: {
  authorProfile: AuthorProfileResponse;
}) {
  const theme = useTheme();
  const router = useRouter();

  const [profileData, setProfileData] = useState<ProfileData>({
    ...authorProfile as ProfileData,
    profile_picture: null, // start empty
    cover_photo: null,
  });

  const [bannerImage, setBannerImage] = useState<string | null>(
    authorProfile.cover_photo || null
  );
  const [profileImage, setProfileImage] = useState<string | null>(
    authorProfile.profile_picture || null
  );
  const [validationErrors, setValidationErrors] = useState<Record<string, any>>(
    {}
  );

  const { validateProfileData, isValid } = useProfileValidation();
  const { saveProfile, isSaving, saveError, saveSuccess, resetState } =
    useProfileSave(authorProfile);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSocialLinkChange = (
    index: number,
    field: keyof SocialLink,
    value: string
  ) => {
    setProfileData((prev) => {
      const newLinks = [...(prev.social_links || [])];
      newLinks[index] = { ...newLinks[index], [field]: value };
      return { ...prev, social_links: newLinks };
    });
    if (validationErrors.social_links?.[index]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        if (newErrors.social_links) {
          delete newErrors.social_links[index];
          if (Object.keys(newErrors.social_links).length === 0) {
            delete newErrors.social_links;
          }
        }
        return newErrors;
      });
    }
  };

  const handleAddSocialLink = () => {
    setProfileData((prev) => ({
      ...prev,
      social_links: [
        ...(prev.social_links || []),
        { platform: "twitter", url: "", label: "" },
      ],
    }));
  };

  const handleRemoveSocialLink = (index: number) => {
    setProfileData((prev) => ({
      ...prev,
      social_links: prev.social_links?.filter((_, i) => i !== index),
    }));
  };
  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileData((prev) => ({
        ...prev,
        profile_picture: file,
      }));
      setProfileImage(URL.createObjectURL(file)); // preview
    }
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileData((prev) => ({
        ...prev,
        cover_photo: file,
      }));
      setBannerImage(URL.createObjectURL(file)); // preview
    }
  };

  const handleSave = async () => {
    const errors = validateProfileData(profileData);

    if (!isValid(errors)) {
      setValidationErrors(errors);
      return;
    }
    try {
      const res = await saveProfile(profileData);
      if (res?.success) {
        setValidationErrors({});
        router.push(`/${authorProfile.handle}`);
     }
      return res;
    } catch (error) { 
      console.log("Error saving profile:", error);
    }
   
  };

  const textFieldSx = (fieldName: string) => ({
    "& .MuiOutlinedInput-root": {
      color: theme.palette.text.primary,
      borderColor: validationErrors[fieldName]
        ? theme.palette.error.main
        : theme.palette.divider,
      "& fieldset": {
        borderColor: validationErrors[fieldName]
          ? theme.palette.error.main
          : theme.palette.divider,
      },
      "&:hover fieldset": {
        borderColor: validationErrors[fieldName]
          ? theme.palette.error.main
          : theme.palette.action.hover,
      },
      "&.Mui-focused fieldset": {
        borderColor: validationErrors[fieldName]
          ? theme.palette.error.main
          : theme.palette.primary.main,
      },
    },
    "& .MuiOutlinedInput-input::placeholder": {
      color: theme.palette.text.secondary,
      opacity: 1,
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.text.secondary,
      "&.Mui-focused": {
        color: validationErrors[fieldName]
          ? theme.palette.error.main
          : theme.palette.primary.main,
      },
    },
    "& .MuiFormHelperText-root": {
      color: theme.palette.error.main,
    },
  });

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        minHeight: "100vh",
        color: theme.palette.text.primary,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 20px",
          borderBottom: `1px solid ${theme.palette.divider}`,
          position: "sticky",
          top: 0,
          zIndex: 10,
          bgcolor: theme.palette.background.default,
        }}
      >
        <IconButton sx={{ color: theme.palette.text.primary }}
          onClick={() => {
            router.push(`/${authorProfile.handle}`)
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6">Edit profile</Typography>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={isSaving}
          sx={{
            borderRadius: "20px",
            padding: "8px 24px",
            "&:hover": { bgcolor: theme.palette.secondary.dark },
            "&:disabled": {
              bgcolor: theme.palette.action.disabled,
              color: theme.palette.text.disabled,
            },
          }}
        >
          {isSaving ? (
            <CircularProgress
              size={20}
              sx={{ color: theme.palette.background.default }}
            />
          ) : (
            "Save"
          )}
        </Button>
      </Box>

      <Container maxWidth="sm" sx={{ padding: "0 !important", mt: 2 }}>
        {saveSuccess && (
          <Alert
            severity="success"
            sx={{
              m: 2,
              bgcolor: theme.palette.primary.main,
              color: theme.palette.text.primary,
            }}
          >
            Profile updated successfully!
          </Alert>
        )}
        {saveError && (
          <Alert
            severity="error"
            sx={{
              m: 2,
              bgcolor: theme.palette.error.main,
              color: theme.palette.text.primary,
            }}
          >
            {saveError}
          </Alert>
        )}

        {/* Banner Section */}
        {/* <Box
          sx={{
            position: "relative",
            height: "200px",
            bgcolor: "background.paper",
            backgroundImage: `url(${bannerImage ?? "/cover.jpg"})`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: 2,
            display: "flex",
            mx: { xs: 1.3 },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input
            type="file"
            id="banner-upload"
            hidden
            accept="image/*"
            onChange={handleBannerUpload}
          />
          <label htmlFor="banner-upload" style={{ cursor: "pointer" }}>
            <IconButton
              component="span"
              sx={{
                bgcolor: "rgba(0, 0, 0, 0.5)",
                color: theme.palette.text.primary,
                "&:hover": { bgcolor: "rgba(0, 0, 0, 0.7)" },
              }}
            >
              <PhotoCameraIcon />
            </IconButton>
          </label>
          {bannerImage && (
            <IconButton
              onClick={() => setBannerImage(null)}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                bgcolor: "rgba(0, 0, 0, 0.5)",
                color: theme.palette.text.primary,
                "&:hover": { bgcolor: "rgba(0, 0, 0, 0.7)" },
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box> */}

        {/* Profile Picture Section */}
        <Box sx={{ position: "relative", px: 2, pb: 3 }}>
          <Box sx={{ position: "relative", display: "inline-block", mt: 0 }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                border: `4px solid ${theme.palette.background.default}`,
                backgroundImage: profileImage ? `url(${profileImage})` : "none",
                bgcolor: "background.paper",
              }}
              src={profileImage || ""}
            />
            <input
              type="file"
              id="profile-upload"
              hidden
              accept="image/*"
              onChange={handleProfileImageUpload}
            />
            <label htmlFor="profile-upload" style={{ cursor: "pointer" }}>
              <IconButton
                component="span"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.text.primary,
                  width: 40,
                  height: 40,
                  "&:hover": { bgcolor: theme.palette.primary.light },
                }}
              >
                <PhotoCameraIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </label>
          </Box>
        </Box>

        {/* Form Fields */}
        <Box sx={{ px: 2, pb: 3 }}>
          <Stack spacing={3}>
            {/* Name Field */}
            <TextField
              fullWidth
              name="name"
              label="Name"
              value={profileData.name}
              onChange={handleInputChange}
              error={!!validationErrors.name}
              helperText={validationErrors.name}
              variant="outlined"
              sx={textFieldSx("name")}
            />

            {/* Contact Field */}
            <TextField
              fullWidth
              name="contact"
              label="Contact"
              value={profileData.contact}
              onChange={handleInputChange}
              error={!!validationErrors.contact}
              helperText={validationErrors.contact}
              variant="outlined"
              disabled={true}
              sx={textFieldSx("contact")}
            />

            {/* Birth Date Field */}
            <TextField
              fullWidth
              name="birth_date"
              label="Birth Date"
              type="date"
              value={profileData.birth_date}
              onChange={handleInputChange}
              error={!!validationErrors.birth_date}
              helperText={validationErrors.birth_date}
              variant="outlined"
              sx={textFieldSx("birth_date")}
            />

            {/* Short Bio Field */}
            <TextField
              fullWidth
              name="short_bio"
              label="Short Bio"
              value={profileData.short_bio || ""}
              onChange={handleInputChange}
              error={!!validationErrors.short_bio}
              helperText={validationErrors.short_bio}
              variant="outlined"
              multiline
              rows={3}
              sx={textFieldSx("short_bio")}
            />

            {/* Handle Field */}
            <TextField
              fullWidth
              name="handle"
              label="Handle"
              value={profileData.handle || ""}
              onChange={handleInputChange}
              error={!!validationErrors.handle}
              helperText={validationErrors.handle}
              variant="outlined"
              sx={textFieldSx("location")}
            />

            {/* Location Field */}
            <TextField
              fullWidth
              name="location"
              label="Location"
              value={profileData.location || ""}
              onChange={handleInputChange}
              error={!!validationErrors.location}
              helperText={validationErrors.location}
              variant="outlined"
              sx={textFieldSx("location")}
            />

            {/* Expertise Area Field */}
            <TextField
              fullWidth
              name="expertise_area"
              label="Expertise Area"
              value={profileData.expertise_area || ""}
              onChange={handleInputChange}
              error={!!validationErrors.expertise_area}
              helperText={validationErrors.expertise_area}
              variant="outlined"
              sx={textFieldSx("expertise_area")}
            />

            {/* About Self Field */}
            <TextField
              fullWidth
              name="about_self"
              label="About"
              value={profileData.about_self || ""}
              onChange={handleInputChange}
              error={!!validationErrors.about_self}
              helperText={validationErrors.about_self}
              variant="outlined"
              multiline
              rows={4}
              sx={textFieldSx("about_self")}
            />
          </Stack>

          {/* Social Links Section */}
          <Box sx={{ mt: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: theme.palette.text.primary }}
              >
                Social Links
              </Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddSocialLink}
                sx={{
                  color: theme.palette.primary.main,
                  textTransform: "none",
                  "&:hover": { bgcolor: theme.palette.action.hover },
                }}
              >
                Add
              </Button>
            </Box>

            <Stack spacing={2}>
              {profileData.social_links?.map((link, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    gap: 1,
                    mb: 1,
                    alignItems: "flex-start",
                    borderRadius: 1,
                  }}
                >
                  <FormControl sx={{ flex: 1, minWidth: 120 }}>
                    <InputLabel sx={{ color: theme.palette.text.secondary }}>
                      Platform
                    </InputLabel>
                    <Select
                      value={link.platform}
                      onChange={(e) =>
                        handleSocialLinkChange(
                          index,
                          "platform",
                          e.target.value as string
                        )
                      }
                      label="Platform"
                      sx={{
                        color: theme.palette.text.primary,
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.divider,
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.action.hover,
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.primary.main,
                        },
                      }}
                    >
                      {SOCIAL_PLATFORMS.map((platform) => (
                        <MenuItem key={platform} value={platform}>
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    label="URL"
                    value={link.url}
                    onChange={(e) =>
                      handleSocialLinkChange(index, "url", e.target.value)
                    }
                    error={!!validationErrors.social_links?.[index]}
                    helperText={validationErrors.social_links?.[index]}
                    variant="outlined"
                    sx={{
                      flex: 2,
                      ...textFieldSx(`social_links.${index}`),
                    }}
                  />

                  {/* <TextField
                    label="Label"
                    value={link.label || ""}
                    onChange={(e) => handleSocialLinkChange(index, "label", e.target.value)}
                    variant="outlined"
                    size="small"
                    sx={{
                      flex: 1,
                      ...textFieldSx(`social_links.${index}.label`),
                    }}
                  /> */}

                  {/* <IconButton
                    onClick={() => handleRemoveSocialLink(index)}
                  >
                    <DeleteIcon />
                  </IconButton> */}
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
