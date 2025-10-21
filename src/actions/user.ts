"use server";

import serverAxios from "@/actions/server-axios";

export const fetchUser = async () => {
  try {  
    const api = await serverAxios();
    const res = await api.get("/user/me");
    return res.data ?? null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

// const getUser = unstable_cache(
//   async (userId: string) => fetchUser(),
//   ['user'],
//   { revalidate: 3600 } // 1hr
// );
