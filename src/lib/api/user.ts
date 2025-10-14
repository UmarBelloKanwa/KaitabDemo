import axios from "@/lib/axios";

export const getUserMe = async () => await axios.get("user/me");