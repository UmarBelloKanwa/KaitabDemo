import React, { useState, FormEvent } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  Box,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Card,
  Stack,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";

const CheckoutForm = ({ back }: { back: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [status, setStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setStatus("processing");
    setErrorMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setStatus("error");
      setErrorMessage(error.message ?? "Payment failed");
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      setStatus("success");
    }
  };

  /* ---------------- SUCCESS STATE ---------------- */
  if (status === "success") {
    return (
      <Card
        elevation={1}
        sx={{
          p: 4,
          bgcolor: "background.default",
          textAlign: "center",
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Stack spacing={2} alignItems="center">
          <CheckCircleIcon sx={{ fontSize: 64, color: "primary.main" }} />

          <Typography variant="h5" fontWeight={600}>
            Subscription successful 🎉
          </Typography>

          <Typography color="text.secondary">
            You now have full access. Welcome aboard!
          </Typography>

          <Button variant="contained" size="large" href="/" sx={{ mt: 1.5 }}>
            Go to dashboard
          </Button>
        </Stack>
      </Card>
    );
  }

  /* ---------------- FORM STATE ---------------- */
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 420,
        mx: "auto",
        textAlign: "center",
      }}
    >
      <Typography variant="h6">
        Choose a payment method
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          my: 1,
          mb: 2,
        }}
      >
        <IconButton onClick={back} size="small">
          <ArrowBackIcon fontSize="small" sx={{ color: "grey"}} />
        </IconButton>
        <Typography fontSize="small" color="grey">Back to plans</Typography>
      </Box>

      <PaymentElement />

      {status === "error" && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Alert>
      )}

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={!stripe || status === "processing"}
        sx={{ mt: 2 }}
      >
        {status === "processing" ? <CircularProgress size={22} /> : "Subscribe"}
      </Button>
    </Box>
  );
};

export default CheckoutForm;
