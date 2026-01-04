import { redirect } from "next/navigation";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const creator_id = searchParams.get("creator_id");

  const res = await fetch(
    `${process.env.BACKEND_URL}/subs/reauth?creator_id=${creator_id}`,
    { method: "POST" }
  );

  const data = await res.json();

  redirect(data.url); // Stripe onboarding link
}
