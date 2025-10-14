"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "./ErrAlert";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import OtpInput from "./OtpInput";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { AxiosResponse } from "axios";

export default function VerifyOtpTab({
  email,
  submitOtpCode,
  setIsOtpStep,
}: {
  email: string | null;
  submitOtpCode: (otp_code: string) => Promise<AxiosResponse<any>>; // ✅ async axios call
  setIsOtpStep: (value: boolean) => void;
}) {
  const [otpCode, setOtpCode] = React.useState<string | null>(null);
  const [errors, setErrors] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState(false);

  const submit = async () => {
    try {
      if (!otpCode || otpCode?.length < 6) {
        setErrors((p: any) => ({ ...p, otp: "OTP Codes must be 6 numbers" }));
        return;
      }
      setLoading(true);
      const res = await submitOtpCode(otpCode);
      setErrors(null);
    } catch (err: any) {
      setErrors(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Typography
        component="h1"
        variant="h5"
        sx={{ width: "100%", mt: 0 }}
      >
        Check your inbox
      </Typography>

      {errors?.general && (
        <Alert severity="error" sx={{ textAlign: "left" }}>
          {" "}
          {errors?.general}{" "}
        </Alert>
      )}

      <Typography
        component="div"
        fontSize="14px"
        variant="subtitle1"
        color="text.secondary"
        sx={{
          m: "auto",
          mb: 1,
        }}
      >
        We’ve sent a verification code to {email}
      </Typography>

      <OtpInput
        onChange={(code) => {
          setOtpCode(code);
        }}
      />

      {!!errors?.otp && (
        <FormControl error={!!errors.otp}>
          <FormHelperText sx={{ pl: 0.5, mt: 0 }}>
            {" "}
            {errors?.otp}{" "}
          </FormHelperText>
        </FormControl>
      )}

      <Button
        type="submit"
        variant="contained"
        loadingPosition="end"
        fullWidth
        disabled={!otpCode || otpCode.length < 6}
        loading={loading}
        sx={{
          margin: "auto",
          mt: 1,
          width: { xs: "100%", sm: "75%" },
        }}
        color="secondary"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          submit();
        }}
      >
        Continue
      </Button>

      <Typography
        component="div"
        fontSize="13px"
        variant="subtitle1"
        color="text.secondary"
        sx={{
          m: "auto",
          mb: 1,
        }}
      >
        Didn't get the email? &nbsp;
        <Typography
          color="secondary"
          component="span"
          fontSize="13px"
          onClick={() => setIsOtpStep(false)}
          sx={{
            "&:hover": {
              textDecorationLine: "underline",
              cursor: "pointer",
            },
          }}
        >
          Try again
        </Typography>
      </Typography>
    </Box>
  );
}
