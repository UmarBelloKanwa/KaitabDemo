"use client";
// Separate data object for all payment settings
export const currencies = [
  "USD",
  "EUR",
  "GBP",
  "CAD",
  "AUD",
  "NZD",
  "BRL",
  "MXN",
  "INR",
  "PLN",
];

const plans = [
  {
    id: "monthly",
    name: "Monthly",
    label: "Monthly plan price",
    description: "The amount monthly paid subscribers pay per month.",
    price: 29.0,
    currency: "USD",
  },
  {
    id: "annual",
    name: "Annual",
    label: "Annual plan price",
    description: "The amount annual paid subscribers pay per year.",
    price: 290.0,
    currency: "USD",
  },
  // {
  //   id: "founding",
  //   label: "Founding plan price",
  //   description: "The amount founding members pay per year. ",
  //   price: 150.00,
  //   currency: "USD",
  // },
];

export const paymentsData = {
  stripe: {
    title: "Connect Stripe",
    description:
      "Takes about 5 minutes. This is how money from subscribers gets to your bank account. Stripe may display your business phone number and address on subscriber invoices unless hidden.",
    learnMoreUrl: "#",
    buttonText: "Connect with stripe",
  },
  pledges: {
    title: "Enable paid subscriptions",
    description: "Let your audience pay to subscribe to your Feedple.",
    enabled: true,
    plans,
  },
};
