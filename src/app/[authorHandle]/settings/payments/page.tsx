"use client";

import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  Select,
  Switch,
  MenuItem,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { paymentsData, currencies } from "@/data/paymentsData";
import PaymentSection from "@/components/ui/settings/PaymentSection";
import FormControl from "@mui/material/FormControl";
import type { CreatorPlans } from "@/types/subscription";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import useSubscription from "@/hooks/settings/useSubscription";

export default function PaymentsPage() {
  const {
    response,
    setResponse,
    accountStatus,
    pledgeAmounts,
    handleAmountChange,
    handleCurrencyChange,
    freePlanBenefits,
    handleFreeBenefitChange,
    paidPlanBenefits,
    loading,
    handleEnablePayment,
    router,
    handlePaidBenefitChange,
  } = useSubscription();
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        pt: 2.5,
        px: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: {
            xs: "100%",
            sm: 600,
            md: "sm",
          },
          width: "100%",
          mx: "auto",
        }}
      >
        {response.message && (
          <Snackbar
            open={!!response.message}
            autoHideDuration={null}
            onClose={() => setResponse((prev) => ({ ...prev, message: "" }))}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert severity={response.severity}> {response.message} </Alert>
          </Snackbar>
        )}

        {/* STRIPE SECTION */}
        <PaymentSection accountStatus={accountStatus} />

        {accountStatus?.isActive && (
          <Box sx={{ position: "relative", left: 0, pb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              {accountStatus.premium
                ? "Paid subscriptions"
                : "Set up paid subscriptions"}
            </Typography>

            <Paper
              elevation={0}
              sx={{
                p: 2,
                pb: 3,
                bgcolor: "background.default",
                border: `1px solid`,
                borderColor: "divider",
              }}
            >
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Plans
              </Typography>

              {pledgeAmounts.map((plan) => {
                const min = plan.name.toLowerCase() == "monthly" ? 29 : 290;
                return (
                  <Stack
                    key={plan.id}
                    direction={{ xs: "column", sm: "row" }}
                    alignItems={{ xs: "stretch", sm: "center" }}
                    justifyContent="space-between"
                    spacing={1.5}
                    sx={{ mt: 2 }}
                  >
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {plan.name.toLowerCase() == "monthly"
                          ? "Monthly plan price"
                          : "Annual plan price"}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}
                      >
                        {plan.name.toLowerCase() == "monthly"
                          ? "The amount monthly paid subscribers pay per month."
                          : "The amount annual paid subscribers pay per year."}
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
                        value={plan.price}
                        onChange={(e) =>
                          handleAmountChange(plan.name, e.target.value)
                        }
                        type="number"
                        inputProps={{
                          min,
                        }}
                        size="small"
                        sx={{ width: { xs: "100%", sm: 120 } }}
                        helperText={`Minimum $${min}`}
                      />

                      <FormControl
                        size="small"
                        sx={{ width: { xs: "100%", sm: 100 } }}
                      >
                        <Select
                          value={plan.currency}
                          onChange={(e) =>
                            handleCurrencyChange(plan.id, e.target.value)
                          }
                        >
                          {currencies.map((v, i) => (
                            <MenuItem value={v} key={i}>
                              {v}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Stack>
                );
              })}
            </Paper>
            <Typography variant="h6" sx={{ my: 2, fontWeight: 600 }}>
              Benefits
            </Typography>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                pb: 3,
                bgcolor: "background.default",
                border: `1px solid`,
                borderColor: "divider",
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Free subscriber benefits
              </Typography>

              <Box sx={{ display: "grid", gap: 1, mb: 1 }}>
                <Typography
                  variant="caption"
                  component="div"
                  sx={{ color: "text.secondary" }}
                >
                  Let free subscribers know what they'll get out of their
                  subscription
                </Typography>

                {freePlanBenefits.map((benefit, index) => (
                  <TextField
                    key={index}
                    size="small"
                    value={benefit}
                    onChange={(e) =>
                      handleFreeBenefitChange(index, e.target.value)
                    }
                  />
                ))}
              </Box>

              <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 600 }}>
                Paid subscriber benefits
              </Typography>

              <Box sx={{ display: "grid", gap: 1 }}>
                <Typography
                  variant="caption"
                  component="div"
                  sx={{ color: "text.secondary" }}
                >
                  Let paid subscribers know what they'll get out of their
                  subscription
                </Typography>
                {paidPlanBenefits.map((benefit, index) => (
                  <TextField
                    key={index}
                    size="small"
                    value={benefit}
                    placeholder={
                      index === 2 ? "Add a third paid benefit..." : undefined
                    }
                    onChange={(e) =>
                      handlePaidBenefitChange(index, e.target.value)
                    }
                  />
                ))}
              </Box>
            </Paper>

            {!accountStatus.premium && (
              <Box
                sx={{
                  position: "sticky",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  bgcolor: "background.default",
                  pt: 2,
                  pb: 1,
                  m: "auto",
                }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  onClick={handleEnablePayment}
                  sx={{
                    color: "text.primary",
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                    py: 1,
                    textTransform: "none",
                    fontWeight: 500,
                  }}
                >
                  Enable payments
                </Button>

                <Button
                  fullWidth
                  onClick={() => {
                    router.push("/");
                  }}
                  sx={{
                    mt: 1,
                    bgcolor: "action.hover",
                    color: "text.primary",
                    "&:hover": {
                      bgcolor: "divider",
                    },
                    py: 1,
                    textTransform: "none",
                    fontWeight: 500,
                  }}
                >
                  Enable payments later
                </Button>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
