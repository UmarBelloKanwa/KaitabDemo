"use client";

import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import useUserCredentials from "@/hooks/auth/useUserCredentials";
import Alert from "../ErrAlert";
import PasswordField from "@/components/ui/auth/PasswordField";
import Link from "@mui/material/Link";
import NextLink from "next/link";

export default function UserCredentials() {
  const {
    errors,
    userCredentials,
    passwordRules,
    handleSetUserCredentials,
    isSubmitting,
    handleSubmit,
  } = useUserCredentials();

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
          Your Credentials
        </Typography>
        {errors?.general && (
          <Alert severity="error" sx={{ textAlign: "left" }}>
            {errors?.general}{" "}
          </Alert>
        )}
        <Box
          component="form"
          color="text.secondary"
          sx={{ display: "flex", flexDirection: "column", gap: 2, p: 0 }}
        >
          <PasswordField
            required
            name="password"
            label="Password"
            placeholder="Your password"
            withIcon={true}
            value={userCredentials.password}
            helperText={errors.password}
            error={!!errors.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSetUserCredentials("password", e.target.value)
            }
          />

          <PasswordField
            required
            name="confirmPassword"
            label="Confirm password"
            placeholder="Confirm password"
            withIcon={true}
            value={userCredentials.confirmPassword}
            helperText={errors.confirmPassword}
            error={!!errors.confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSetUserCredentials("confirmPassword", e.target.value)
            }
          />

          <TextField
            required
            name="email"
            label="Emial"
            placeholder={"Your email address"}
            variant="outlined"
            value={userCredentials.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSetUserCredentials("email", e.target.value)
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

          {passwordRules.length > 0 && userCredentials.password && (
            <Box
              component="ul"
              sx={(theme) => ({
                display: "block",
                py: 1,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
                textAlign: "left",
                mb: 1,
                pl: 3, // indentation
                m: 0, // remove default margin
                listStyleType: "disc",

                mt: 1,
              })}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: 500, ml: -1 }}
              >
                Password must contain:
              </Typography>

              {passwordRules.map((rule, i) => (
                <Box
                  component="li"
                  key={i}
                  sx={{
                    typography: "body2",
                    mb: 0.5,
                    ml: 1.5,
                    mt: i === 0 ? 0.7 : 0,
                  }}
                >
                  {rule.label}
                </Box>
              ))}
            </Box>
          )}
          <Typography component="p" variant="caption">
            By clicking "Continue", you agree to our{" "}
            <Link component={NextLink} href="/terms"> Terms </Link> and acknowledge that you have read our
            <Link component={NextLink} href="/privacy"> Privacy Policy. </Link>
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
