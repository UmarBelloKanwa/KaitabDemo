"use client"

import type React from "react"

import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Chip,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import CloseIcon from "@mui/icons-material/Close"
import CheckIcon from "@mui/icons-material/Check"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined"
import MicNoneIcon from "@mui/icons-material/MicNone"
import WorkOutlineIcon from "@mui/icons-material/WorkOutline"
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined"
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined"
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined"
import AddIcon from "@mui/icons-material/Add"
import BoltIcon from "@mui/icons-material/Bolt"
import { useState } from "react"

interface PlanFeature {
  icon: React.ElementType
  text: string
  subtext?: string
}

interface PricingPlan {
  id: string
  name: string
  price: number | "Free"
  currency?: string
  period?: string
  buttonText: string
  buttonVariant: "outlined" | "contained"
  isPopular?: boolean
  features: PlanFeature[]
}

const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "Basic",
    price: "Free",
    buttonText: "Current Plan",
    buttonVariant: "outlined",
    features: [
      { icon: CheckIcon, text: "Limited access to chat models" },
      { icon: InfoOutlinedIcon, text: "Limited context memory" },
      { icon: PaletteOutlinedIcon, text: "Aurora image model" },
      { icon: MicNoneIcon, text: "Voice access" },
      { icon: WorkOutlineIcon, text: "Projects" },
      { icon: CheckBoxOutlinedIcon, text: "Tasks" },
    ],
  },
  {
    id: "supergrok",
    name: "Cortex",
    price: 30.0,
    currency: "USD",
    period: "month",
    buttonText: "Upgrade to Cortex",
    buttonVariant: "contained",
    isPopular: true,
    features: [
      {
        icon: CheckIcon,
        text: "Increased access to Cortex 4.1",
        subtext: "Improved reasoning and search capabilities",
      },
      { icon: CheckIcon, text: "Increased access to Cortex 3" },
      { icon: InfoOutlinedIcon, text: "Extended memory 128,000 tokens" },
      { icon: MicNoneIcon, text: "Priority voice access" },
      { icon: ImageOutlinedIcon, text: "Imagine image model" },
      { icon: AutoAwesomeOutlinedIcon, text: "Companions Ani and Valentine" },
      { icon: AddIcon, text: "Everything in Basic" },
    ],
  },
  {
    id: "supergrok-heavy",
    name: "Cortex Heavy",
    price: 300.0,
    currency: "USD",
    period: "month",
    buttonText: "Upgrade to Heavy",
    buttonVariant: "contained",
    features: [
      { icon: BoltIcon, text: "Exclusive preview of Cortex 4 Heavy" },
      { icon: CheckIcon, text: "Extended access to Cortex 4.1" },
      { icon: CheckIcon, text: "Unlimited access to Cortex 3" },
      { icon: InfoOutlinedIcon, text: "Longest memory 256,000 tokens" },
      { icon: BoltIcon, text: "Early access to new features" },
      { icon: AddIcon, text: "Everything in Cortex" },
    ],
  },
]

const StyledCard = styled(Card)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: 30,
  padding: theme.spacing(3),
  // border: `1px solid ${theme.palette.divider}`,
  position: "relative",
}))

const StarField = styled(Box)({
  position: "absolute",
  inset: 0,
  opacity: 0.5,
  overflow: "hidden",
  pointerEvents: "none",
})

const Star = styled("div")<{ left: number; top: number; opacity: number }>(({ left, top, opacity, theme }) => ({
  position: "absolute",
  width: 5,
  height: 5,
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  left: `${left}%`,
  top: `${top}%`,
  opacity,
}))

export default function PricingPage() {
  const [planType, setPlanType] = useState("individual")

  const stars = Array.from({ length: 50 }, () => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    opacity: Math.random() * 0.7 + 0.3,
  }))

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        position: "relative",
        overflow: "hidden",
        py: 8,
      }}
    >
      {/* Starry background */}
      <StarField>
        {stars.map((star, i) => (
          <Star key={i} left={star.left} top={star.top} opacity={star.opacity} />
        ))}
      </StarField>

      {/* Close button */}
      <IconButton
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          color: "text.primary",
          zIndex: 10,
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Content */}
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h1" sx={{ fontSize: { xs: "2.5rem", md: "3rem" }, mb: 2 }}>
            Cortex
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: "1.125rem" }}>Introducing Cortex</Typography>
          <Typography sx={{ color: "text.secondary", fontSize: "1.125rem" }}>Safe Personalized SuperIntelligence</Typography>
        </Box>

        {/* Tabs */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 6 }}
        >
          <ToggleButtonGroup
            value={planType} exclusive
            onChange={(e, value) => value && setPlanType(value)}
            size="small"
            sx={{
              borderRadius: 50,
              "& .MuiToggleButton-root": {
                borderRadius: 50,
                border: "none"
              },
              p: 0.2,
              bgcolor: "black"
            }}
          >
            <ToggleButton size="small" value="individual">Individual</ToggleButton>
            <ToggleButton size="small" value="business">Business</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Grid container spacing={3} sx={{ maxWidth: 1200, mx: "auto" }}>
          {pricingPlans.map((plan) => (
            <Grid size={{ xs: 12, md: 4 }} key={plan.id}>
              <StyledCard>
                {plan.isPopular && (
                  <Chip
                    label="Popular"
                    size="small"
                    sx={{
                      position: "absolute",
                      right: 24,
                    }}
                  />
                )}
                <CardContent sx={{ p: 0 }}>
                  <Typography sx={{ color: "text.secondary", fontSize: "0.875rem", mb: 1 }}>{plan.name}</Typography>

                  {/* Price Display */}
                  {plan.price === "Free" ? (
                    <Typography variant="h4" sx={{ mb: 1 }}>
                      Free
                    </Typography>
                  ) : (
                    <Box sx={{ mb: 1 }}>
                      <Typography component="span" sx={{ fontSize: "2rem", fontWeight: 700 }}>
                        ${plan.price.toFixed(2)}
                      </Typography>
                      <Typography component="span" sx={{ fontSize: "0.9rem", color: "text.secondary", ml: 1 }}>
                        {plan.currency}/{plan.period}
                      </Typography>
                    </Box>
                  )}

                  {/* Button */}
                  <Button
                    fullWidth
                    variant={plan.buttonVariant}
                    sx={{
                      mb: 4,
                      borderRadius: 50,
                      ...(plan.buttonVariant === "outlined" && {
                        bgcolor: "background.default",
                        color: "text.primary",
                      }),
                    }}
                  >
                    {plan.buttonText}
                  </Button>

                  {/* Features List */}
                  <Stack spacing={2}>
                    {plan.features.map((feature, index) => {
                      const IconComponent = feature.icon
                      return (
                        <Stack key={index} direction="row" spacing={1.5} alignItems="flex-start">
                          <IconComponent sx={{ fontSize: 20, color: "text.secondary", flexShrink: 0, mt: 0.25 }} />
                          {feature.subtext ? (
                            <Box>
                              <Typography sx={{ fontSize: "0.875rem", color: "grey.300", fontWeight: 500 }}>
                                {feature.text}
                              </Typography>
                              <Typography sx={{ fontSize: "0.75rem", color: "text.disabled" }}>
                                {feature.subtext}
                              </Typography>
                            </Box>
                          ) : (
                            <Typography sx={{ fontSize: "0.875rem", color: "grey.300" }}>{feature.text}</Typography>
                          )}
                        </Stack>
                      )
                    })}
                  </Stack>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
