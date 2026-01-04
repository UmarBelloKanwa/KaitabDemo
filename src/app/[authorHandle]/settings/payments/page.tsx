"use client";

import {
  Box,
  Typography,
  Button,
  Paper,
  Switch,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Link,
} from "@mui/material";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import { paymentsData } from "@/data/paymentsData";
import { connectAccountToStripe } from "@/lib/api/subscription";

export default function PaymentsPage() {
  const [pledgesEnabled, setPledgesEnabled] = useState(
    paymentsData.pledges.enabled
  );
  const [pledgeAmounts, setPledgeAmounts] = useState(
    paymentsData.pledges.amounts
  );

  const handleAmountChange = (id: string, value: string) => {
    setPledgeAmounts((prev) =>
      prev.map((amount) => (amount.id === id ? { ...amount, value } : amount))
    );
  };

  const handleCurrencyChange = (id: string, currency: string) => {
    setPledgeAmounts((prev) =>
      prev.map((amount) =>
        amount.id === id ? { ...amount, currency } : amount
      )
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        py: 4,
        px: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: {
            xs: "100%",
            sm: 600,
            md: "md",
            lg: 1000,
          },
          mx: "auto",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Payments
        </Typography>

        {/* ✅ STRIPE SECTION */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 4,
            border: `1px solid`,
            borderColor: "divider",
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
            {paymentsData.stripe.title}
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "stretch", sm: "flex-start" }}
            justifyContent="space-between"
            spacing={2}
          >
            <Stack direction="row" alignItems="center" spacing={2} flex={1}>
              <Box>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {paymentsData.stripe.description}{" "}
                  {/* <Link
                    href={paymentsData.stripe.learnMoreUrl}
                    underline="always"
                    color="text.primary"
                    sx={{ fontWeight: 500 }}
                  >
                    Learn more
                  </Link> */}
                </Typography>
              </Box>
            </Stack>

           <ConnectStripeButton />
          </Stack>
        </Paper>

        {/* ✅ PLEDGES HEADER */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Pledges
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            pb: 3,
            border: `1px solid`,
            borderColor: "divider",
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
            spacing={1}
          >
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                {paymentsData.pledges.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {paymentsData.pledges.description}
              </Typography>
            </Box>

            <Switch
              checked={pledgesEnabled}
              onChange={(e) => setPledgesEnabled(e.target.checked)}
            />
          </Stack>

          {/* ✅ PLEDGE AMOUNTS */}
          {pledgeAmounts.map((amount) => (
            <Stack
              key={amount.id}
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "stretch", sm: "center" }}
              justifyContent="space-between"
              spacing={1.5}
              sx={{ mt: 2 }}
            >
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {amount.label}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {amount.description}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                <TextField
                  value={amount.value}
                  onChange={(e) =>
                    handleAmountChange(amount.id, e.target.value)
                  }
                  size="small"
                  sx={{ width: { xs: "100%", sm: 120 } }}
                />

                <FormControl size="small" sx={{ width: { xs: "100%", sm: 100 } }}>
                  <Select
                    value={amount.currency}
                    onChange={(e) =>
                      handleCurrencyChange(amount.id, e.target.value)
                    }
                  >
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                    <MenuItem value="GBP">GBP</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Stack>
          ))}
        </Paper>
      </Box>
    </Box>
  );
}


function ConnectStripeButton() {
  const [loading, setLoading] = useState(false);

  async function connectToStripe() {
    try {
      setLoading(true);

      const data = await connectAccountToStripe();

      // Important: redirect immediately after response
      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      setLoading(false); // only reset if error
    }
  }

  return (
    <Button
      variant="contained"
      size="large"
      fullWidth
      onClick={connectToStripe}
      disabled={loading}
      sx={{
        alignSelf: { sm: "flex-start" },
        width: { xs: "100%", sm: "auto" },
      }}
    >
      {loading ? "Redirecting to Stripe…" : paymentsData.stripe.buttonText}
    </Button>
  );
}
