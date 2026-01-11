import { api } from "@/lib/axios";
import type { CreatorPlans } from "@/types/subscription";

export const connectAccountToStripe = async () => {
  const res = await api.post("subs/connect-account");
  return res.data;
}

export const enablePayment = async (data: CreatorPlans) => {
  const res = await api.post("subs/enable-payment", data);
  return res.data;
}

export const enableMonetization = async () => {
  const res = await api.post("subs/monetization/enable");
  return res.data;
}

export const disabledMonetization = async () => {
  const res = await api.post("subs/monetization/disable");
  return res.data;
}

export const createCheckoutSession = async (data: {
  author_handle: string;
  interval: string
}) => {
  const res = await api.post("subs/create-checkout-session", data);
  return res.data;
}

export const subscribeFree = async (handle: string) => {
  const res = await api.post(`subs/${handle}/free`);
  return res.data;
}