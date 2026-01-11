import serverAxios from "@/actions/server-axios";

export const checkStripeAccountStatus = async () => {
  const api = await serverAxios();
  const res = await api.get(`/subs/stripe/status`);
  return res.data;
}

export const getAccountSubscriptionData = async (handle: string) => {
  const api = await serverAxios();
  const res = await api.get(`/subs/${handle}/data`);
  return res.data;
}