import axios from "@/lib/axios";
import useSWR from "swr";

export const getUserTopics = async (q?: string) =>
  await axios.get(`topic/search-topic${q ? `?q=${q}` : ""}`);

export function useUserTopics(q?: string) {
  return useSWR(`topic/search-topic${q ? `?q=${q}` : ""}`, {
    refreshInterval: 0, // no polling
    revalidateOnFocus: false, // avoid unnecessary fetches on tab change
  });
}
