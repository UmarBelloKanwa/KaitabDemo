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