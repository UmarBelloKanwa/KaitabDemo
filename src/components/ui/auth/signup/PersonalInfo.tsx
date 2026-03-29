"use client";

import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import useUserInfoPage from "@/hooks/auth/useUserInfo";
import Alert from "../ErrAlert";

import Link from "@mui/material/Link";
import NextLink from "next/link";

export default function UserInfo() {
  const { errors, userInfo, handleSetUserInfo, isSubmitting, handleSubmit } =
    useUserInfoPage();

  return (
    <Stack
      sx={{
        opacity: isSubmitting ? 0.5 : 1,
        pointerEvents: isSubmitting ? "none" : "auto",
        transition: "opacity 0.4s ease-in-out",
        mt: 0,
        width: "100%",
      }}
    >
      <Box sx={{width: "100%",}}>
        <Typography component="h1" variant="h5" sx={{ width: "100%", mb: 2 }}>
          Create an account
        </Typography>
        {errors?.general && (
          <Alert severity="error" sx={{ textAlign: "left" }}>
            {" "}
            {errors?.general}{" "}
          </Alert>
        )}
        <Box
          component="form"
          color="text.secondary"
          sx={{ display: "flex", flexDirection: "column", gap: 2, p: 0 }}
        >
          <TextField
            required
            name="fullName"
            label="Name"
            placeholder={"Your full name"}
            variant="outlined"
            value={userInfo.fullName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSetUserInfo("fullName", e.target.value)
            }
            error={!!errors.fullName}
            helperText={errors.fullName}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label={"Date of birth"}
              sx={{ width: "100%", borderRadius: "0.7em" }}
              onChange={(value) =>
                handleSetUserInfo("birthDate", String(value))
              }
              //maxDate={new Date()}
              slotProps={{
                textField: {
                  fullWidth: true,
                  required: true,
                  error: !!errors.birthDate,
                  helperText: errors.birthDate,
                  InputProps: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PermContactCalendarIcon />
                      </InputAdornment>
                    ),
                  },
                },
              }}
            />
          </LocalizationProvider> */}

          <TextField
            required
            name="email"
            label="Emial"
            placeholder={"Your email address"}
            variant="outlined"
            value={userInfo.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSetUserInfo("email", e.target.value)
            }
            error={!!errors.email}
            helperText={errors.email}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              },
            }}
          />

          <Typography component="p" variant="caption">
            By clicking "Continue", you agree to our{" "}
            <Link component={NextLink} href="/terms">
              Terms{" "}
            </Link>{" "}
            and acknowledge that you have read our
            <Link component={NextLink} href="/privacy">
              {" "}
              Privacy Policy.{" "}
            </Link>
          </Typography>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            loading={isSubmitting}
            loadingPosition="end"
            color="secondary"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </Stack>
  );
}
