"use server";

import ClientProvider from "./ClientProvider";
import serverAxios from "@/lib/server-axios";

export default async function ServerProvider({ children }: { children: React.ReactNode; }) {
  let user = null;

  try {
    const api = await serverAxios();
    const res = await api.get('user/me');
    user = res.data;
    // console.log(user);
  } catch {
    user = null
  }

  return (
    <ClientProvider user={user}>
      {children}
    </ClientProvider>
  );
}
