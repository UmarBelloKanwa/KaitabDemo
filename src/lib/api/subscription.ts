import { api }  from "@/lib/axios";

export const connectAccountToStripe = async () => {
  const res = await api.post("subs/connect-account");
  return res.data;
}