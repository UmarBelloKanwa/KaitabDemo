import serverAxios from "@/actions/server-axios";

export const checkStripeAccountStatus = async () => {
  const api = await serverAxios();
  const res = await api.get(`/subs/stripe/status`);
  return res.data;
}
