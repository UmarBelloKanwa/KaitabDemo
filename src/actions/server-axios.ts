"use server";

import { createApi } from "@/lib/axios";
import { getAllCookiesAsString, isTokenExpired } from "./cookie";
import type { AxiosInstance } from "axios";

export interface CookieData {
  cookieString: string;
  accessToken?: string;
  refreshToken?: string;
}

export type ServerAxios = Promise<AxiosInstance>;

async function setupServerAxios({
  cookieString,
  accessToken,
  refreshToken,
}: CookieData): ServerAxios {
  let api = createApi(cookieString);

  if ((!accessToken || isTokenExpired(accessToken)) && refreshToken) {
    try {
      const res = await api.post("/auth/refresh");

      const setCookieHeader = res.headers["set-cookie"];

      if (setCookieHeader && Array.isArray(setCookieHeader)) {
        // Combine all cookies into one string
        const newCookieString = setCookieHeader
          .map((c) => c.split(";")[0]) // take only name=value part
          .join("; ");

        // Recreate axios with updated cookies
        api = createApi(newCookieString);
      } 

    } catch (err) {
      console.log("Refresh failed:", err);
    }
  }

  return api;
}

// Normal server-side axios (reads cookies directly)
const serverAxios = async (): ServerAxios => {
  const cookiesData = await getAllCookiesAsString();
  return setupServerAxios(cookiesData);
};

// Cached/server variant (accepts pre-fetched cookies)
export const serverCatcheAxios = async (
  cookiesData: CookieData
): ServerAxios => setupServerAxios(cookiesData);

export default serverAxios;
