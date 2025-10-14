import axios from "@/lib/axios";
import useSWR from "swr";

export const useUserNotifications = () => {
  return useSWR("notification/user-notifications")
}