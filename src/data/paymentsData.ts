"use client";
// Separate data object for all payment settings
export const paymentsData = {
  stripe: {
    title: "Connect Stripe",
    description: "Takes about 5 minutes. This is how money from subscribers gets to your bank account. Stripe may display your business phone number and address on subscriber invoices unless hidden.",
    learnMoreUrl: "#",
    buttonText: "Connect with stripe",
  },
  pledges: {
    title: "Allow readers to pledge subscriptions",
    description: "When turned on, readers of Feedple will be able to pledge to pay for a future paid subscription to you.",
    enabled: true,
    amounts: [
      {
        id: "monthly",
        label: "Monthly pledge amount",
        description: "The amount pledged subscribers are asked to pay per month.",
        value: "8.00",
        currency: "USD",
      },
      {
        id: "annual",
        label: "Annual pledge amount",
        description: "The amount pledged subscribers are asked to pay per year.",
        value: "80.00",
        currency: "USD",
      },
      {
        id: "founding",
        label: "Founding pledge amount",
        description: "The amount pledged founding members are asked to pay per year.",
        value: "150.00",
        currency: "USD",
      },
    ],
  },
};
