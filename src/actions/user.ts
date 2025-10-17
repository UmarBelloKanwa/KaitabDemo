"use server";

import serverAxios from "@/actions/server-axios";

export const fetchUser = async () => {
  try {
    const api = await serverAxios();

    try {
      // First attempt
      const res = await api.get("/user/me");
      return res.data ?? null;
    } catch (err: any) {
      // If 401 → refresh token
      if (err.response?.status === 401) {
        try {
          await api.post("/auth/refresh"); // use same cookies via serverAxios
          // Retry original request
          const retryRes = await api.get("/user/me");
          return retryRes.data ?? null;
        } catch {
          // Refresh failed → user is not logged in
          return null;
        }
      }
      throw err; // rethrow other errors
    }
  } catch (err) {
    console.log("Failed to fetch user:", err);
    return null;
  }
};


// export async function fetchSharedUserState(userId?: string) {
//   if (!userId) return { user: null, settings: null };

//   // Parallel fetches (faster!)
//   const [user, /*settings*/] = await Promise.all([
//     fetchUser(),
//     //fetchSettings(userId)
//   ]);

//   return { user, /*settings*/ };
// }

// const getUser = unstable_cache(
//   async (userId: string) => fetchUser(),
//   ['user'],
//   { revalidate: 3600 } // 1hr
// );
