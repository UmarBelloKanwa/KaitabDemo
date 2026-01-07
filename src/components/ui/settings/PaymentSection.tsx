"use client";

import {
  Typography,
  Button,
  Paper,
  Alert,
  Stack,
  Box,
  Switch,
} from "@mui/material";
import { connectAccountToStripe } from "@/lib/api/subscription";
import { useState } from "react";
import { paymentsData } from "@/data/paymentsData";
import type { AccountStatus } from "@/types/subscription";
import {
  enableMonetization,
  disabledMonetization,
} from "@/lib/api/subscription";

export default function PaymentSection({
  accountStatus,
}: {
  accountStatus: AccountStatus;
}) {
  const [pledgesEnabled, setPledgesEnabled] = useState(
    accountStatus?.monetization_enabled
  );

  // Loading or not fetched
  if (!accountStatus) {
    return <Typography>Loading Stripe account status...</Typography>;
  }

  // Build detailed status messages
  const messages: string[] = [];

  if (!accountStatus.detailsSubmitted) {
    messages.push("Some required account details have not been submitted.");
  }

  if (!accountStatus.payoutsEnabled) {
    messages.push("Payouts are not enabled for your account.");
  }

  if (!accountStatus.chargesEnabled) {
    messages.push("Your account cannot accept charges yet.");
  }

  if (accountStatus.requirements && accountStatus.requirements.length > 0) {
    messages.push(
      `There are ${accountStatus.requirements.length} pending requirement(s) to complete.`
    );
  }

  const handleChangeMonetization = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = e.target.checked;
    try {
      // Turning OFF monetization
      if (!checked) {
        const yes = window.confirm(
          "Are you sure? This won't affect existing paid subscriptions, but will prevent new ones."
        );

        if (!yes) return;

        await disabledMonetization();
        setPledgesEnabled(false);
        return;
      }
      // Turning ON monetization
      await enableMonetization();
      setPledgesEnabled(true);
    } catch (err) {
      console.error(err);
      alert("Failed to update monetization status.");
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Payments
      </Typography>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 4,
          bgcolor: "background.default",
          border: `1px solid`,
          borderColor: "divider",
        }}
      >
        {accountStatus.isActive ? (
          <Alert severity="success" sx={{ mb: 2 }}>
            Your Stripe account is fully connected and active. Payouts and
            charges are enabled.
          </Alert>
        ) : (
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
              {paymentsData.stripe.title}
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "stretch", sm: "flex-start" }}
              justifyContent="space-between"
              spacing={2}
            >
              <Stack direction="column" spacing={1} flex={1}>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {paymentsData.stripe.description}
                </Typography>

                {messages.map((msg, idx) => (
                  <Alert key={idx} severity="warning" sx={{ mt: 1, mb: 2 }}>
                    {msg}
                  </Alert>
                ))}
              </Stack>

              <ConnectStripeButton />
            </Stack>
          </Box>
        )}

        {accountStatus.premium && (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
            spacing={1}
            sx={{ mb: 2, mt: 4 }}
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
              onChange={handleChangeMonetization}
            />
          </Stack>
        )}
      </Paper>
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
      size="small"
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
