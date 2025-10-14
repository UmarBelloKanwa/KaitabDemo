import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const JWT_SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);
const ALGORITHM = process.env.ALGORITHM!;

export default async function decodeCookie(cookieName: string = "auth_flow") {
  const cookieStore = await cookies(); // no need to await, cookies() is synchronous
  const cookie = cookieStore.get(cookieName)?.value;
  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify(cookie, JWT_SECRET_KEY, { algorithms: [ALGORITHM] });
    return JSON.parse(JSON.stringify(payload)); // your session object
  } catch {
    return null;
  }
}


export async function getAllCookiesAsString() {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();

    return allCookies.map(({ name, value }) => `${name}=${value}`).join('; ');
}