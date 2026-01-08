export interface PlanFeature {
  text: string;
  subtext?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number | "Free";
  currency?: string;
  period?: string;
  buttonVariant: "outlined" | "contained";
  isPopular?: boolean;
  features: PlanFeature[];
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    name: "None",
    price: "Free",
    buttonVariant: "outlined",
    features: [
      { text: "Limited access to chat models" },
      { text: "Limited context memory" },
      { text: "Aurora image model" },
      { text: "Voice access" },
      { text: "Projects" },
      { text: "Tasks" },
    ],
  },
  {
    id: "supergrok",
    name: "Monthly",
    price: 30.0,
    currency: "USD",
    period: "month",
    buttonVariant: "contained",
    features: [
      {
        text: "Increased access to Cortex 4.1",
        subtext: "Improved reasoning and search capabilities",
      },
      { text: "Increased access to Cortex 3" },
      { text: "Extended memory 128,000 tokens" },
      { text: "Priority voice access" },
      { text: "Imagine image model" },
      { text: "Companions Ani and Valentine" },
      { text: "Everything in Basic" },
    ],
  },
  {
    id: "supergrok-heavy",
    name: "Annual",
    price: 300.0,
    currency: "USD",
    period: "month",
    buttonVariant: "contained",
    features: [
      { text: "Exclusive preview of Cortex 4 Heavy" },
      { text: "Extended access to Cortex 4.1" },
      { text: "Unlimited access to Cortex 3" },
      { text: "Longest memory 256,000 tokens" },
      { text: "Early access to new features" },
      { text: "Everything in Cortex" },
    ],
  },
];
