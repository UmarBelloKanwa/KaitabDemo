import { api }  from "@/lib/axios";

export const getUserMe = async () => await api.get("user/me");