import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkoutForm";
import Complete from "./Complete";
import { createCheckoutSession } from "@/lib/api/subscription";
import Container from "@mui/material/Container";
import { appearance } from "@/theme";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const SubscribePlan = ({
  data,
  page,
  back,
}: {
    page: "plans" | "checkout" | "complete";
    back: () => void,
  data: {
    author_handle: string;
    interval: string;
  };
}) => {
  const [clientSecret, setClientSecret] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchIntent = async () => {
      const d = await createCheckoutSession(data);
      setClientSecret(d.clientSecret);
    };

    if (page === "checkout") fetchIntent();
  }, [data, page]);


  if (!clientSecret) return null;

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance,
      }}
    >
      <Container maxWidth={"sm"}>
        {page === "checkout" && <CheckoutForm back={back} />}
        {page === "complete" && <Complete />}
      </Container>
    </Elements>
  );
};

export default SubscribePlan;
