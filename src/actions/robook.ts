import serverAxios from "@/actions/server-axios";

export const fetchRobook = async (robooklSlug: string) => {
  const axios = await serverAxios();
  const res = await axios.get(`book/${robooklSlug}`);
  return res.data;
}