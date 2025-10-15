"use server";

import serverAxios from "@/actions/server-axios";

export const fetchUser = async () => {
  try {
    const api = await serverAxios();
    const res = await api.get("user/me");
    return res.data;
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
