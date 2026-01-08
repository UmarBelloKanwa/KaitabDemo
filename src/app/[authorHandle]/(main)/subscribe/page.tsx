"use client";

import type React from "react";

import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { pricingPlans } from "@/data/subsData";
import type { PlanFeature, PricingPlan } from "@/data/subsData";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useQueryClient } from "@tanstack/react-query";
import type { AccountStatus } from "@/types/subscription";

const StyledCard = styled(Card)(({ theme }) => ({
  background: theme.palette.background.default,
  borderRadius: 30,
  padding: theme.spacing(3),
  pb: 0,
  border: `1px solid ${theme.palette.divider}`,
  position: "relative",
}));

const StarField = styled(Box)({
  position: "absolute",
  inset: 0,
  opacity: 0.5,
  overflow: "hidden",
  pointerEvents: "none",
});

const Star = styled("div")<{ left: number; top: number; opacity: number }>(
  ({ left, top, opacity, theme }) => ({
    position: "absolute",
    width: 5,
    height: 5,
    borderRadius: "50%",
    backgroundColor: theme.palette.primary.main,
    left: `${left}%`,
    top: `${top}%`,
    opacity,
  })
);

export default function PricingPage() {
  const [planType, setPlanType] = useState("individual");
  const router = useRouter();
  const queryClient = useQueryClient();

  const accountData: AccountStatus = queryClient.getQueryData(["accountSubscriptionData"])!;
  if (!accountData) {
    return <></>
  }
  const plans = mapAccountStatusToPricingPlans(accountData);

  // const stars = Array.from({ length: 50 }, () => ({
  //   left: Math.random() * 100,
  //   top: Math.random() * 100,
  //   opacity: Math.random() * 0.7 + 0.3,
  // }));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        position: "relative",
        overflow: "hidden",
        py: 2,
      }}
    >
      {/* Starry background */}
      {/* <StarField>
        {stars.map((star, i) => (
          <Star
            key={i}
            left={star.left}
            top={star.top}
            opacity={star.opacity}
          />
        ))}
      </StarField> */}

      {/* Close button */}
      {/* <IconButton
        onClick={() => {
          router.back();
        }}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          color: "text.primary",
          zIndex: 10,
        }}
      >
        <CloseIcon />
      </IconButton> */}

      {/* Content */}
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 1 }}>
          {/* <Box
            component="img"
            src="umar.png"
            sx={{
              width: 51,
              height: 51,
              m: "auto",
              borderRadius: 1,
            }}
          /> */}
          {/* <Typography
            variant="h1"
            sx={{ fontSize: { xs: "2.5rem", md: "3rem" }, mb: 2 }}
          >
            Cortex
          </Typography> */}
          <Typography variant="h5" sx={{ color: "text.secondary" }}>
            Choose a subscription plan
          </Typography>
          {/* <Typography sx={{ color: "text.secondary", fontSize: "1.125rem" }}>
            Safe Personalized SuperIntelligence
          </Typography> */}
        </Box>

        {/* Tabs */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <ToggleButtonGroup
            value={planType}
            exclusive
            onChange={(e, value) => value && setPlanType(value)}
            size="small"
            sx={{
              borderRadius: 50,
              "& .MuiToggleButton-root": {
                borderRadius: 50,
                border: "none",
              },
            }}
          >
            <ToggleButton value="individual">Individual</ToggleButton>
            {/* <ToggleButton size="small" value="business">
              Business
            </ToggleButton> */}
          </ToggleButtonGroup>
        </Box>

        <Grid container spacing={3} sx={{ maxWidth: 1200, mx: "auto" }}>
          {plans.map((plan) => (
            <Grid size={{ xs: 12, md: 4 }} key={plan.id}>
              <StyledCard>
                <CardContent sx={{ p: 0, pb: 0,  }}>
                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontSize: "0.875rem",
                      mb: 1,
                    }}
                  >
                    {plan.name}
                  </Typography>

                  {/* Price Display */}
                  {plan.price === "Free" ? (
                    <Typography variant="h4" sx={{ mb: 1 }}>
                      Free
                    </Typography>
                  ) : (
                    <Box sx={{ mb: 1 }}>
                      <Typography
                        component="span"
                        sx={{ fontSize: "2rem", fontWeight: 700 }}
                      >
                        ${plan.price.toFixed(2)}
                      </Typography>
                      <Typography
                        component="span"
                        sx={{
                          fontSize: "0.9rem",
                          color: "text.secondary",
                          ml: 1,
                        }}
                      >
                        {plan.currency}/{plan.period}
                      </Typography>
                    </Box>
                  )}

                  {/* Features List */}
                  <Stack spacing={2}>
                    {plan.features.map((feature, index) => {
                      return (
                        <Stack
                          key={index}
                          direction="row"
                          spacing={1.5}
                          alignItems="flex-start"
                        >
                          <TaskAltIcon
                            sx={{
                              fontSize: 20,
                              color: "text.secondary",
                              flexShrink: 0,
                              mt: 0.25,
                            }}
                          />
                          {feature.subtext ? (
                            <Box>
                              <Typography
                                sx={{
                                  fontSize: "0.875rem",
                                  color: "grey.300",
                                  fontWeight: 500,
                                }}
                              >
                                {feature.text}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "0.75rem",
                                  color: "text.disabled",
                                }}
                              >
                                {feature.subtext}
                              </Typography>
                            </Box>
                          ) : (
                            <Typography
                              sx={{ fontSize: "0.875rem", color: "grey.300" }}
                            >
                              {feature.text}
                            </Typography>
                          )}
                        </Stack>
                      );
                    })}
                  </Stack>

                  {/* Button */}
                  <Button
                    fullWidth
                    variant={plan.buttonVariant}
                    sx={{
                      mt: 4,
                      mb: 0,
                      borderRadius: 50,
                      ...(plan.buttonVariant === "outlined" && {
                        bgcolor: "background.default",
                        color: "text.primary",
                      }),
                    }}
                  >
                    Select
                  </Button>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export function mapAccountStatusToPricingPlans(
  accountStatus: AccountStatus
): PricingPlan[] {
  const plans: PricingPlan[] = [];

  /** ---------- FREE PLAN ---------- */
  plans.push({
    id: "free",
    name: "Free",
    price: "Free",
    buttonVariant: "outlined",
    features: accountStatus.plans.free.benefits.map((benefit) => ({
      text: benefit,
    })),
  });

  /** ---------- PAID PLANS ---------- */
  if (
    accountStatus.premium &&
    accountStatus.monetization_enabled &&
    accountStatus.plans.paid?.plans?.length
  ) {
    for (const plan of accountStatus.plans.paid.plans) {
      plans.push({
        id: plan.id,
        name: plan.name,
        price: plan.price,
        currency: plan.currency,
        period: plan.interval,
        buttonVariant: "contained",
        isPopular: plan.name.toLowerCase() === "monthly",
        features: accountStatus.plans.paid.benefits.map((benefit) => ({
          text: benefit,
        })),
      });
    }
  }

  return plans;
}
