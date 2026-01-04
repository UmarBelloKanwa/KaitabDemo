import { redirect } from "next/navigation";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const creator_id = searchParams.get("creator_id");

  // Call backend
  await fetch(
    `${process.env.BACKEND_URL}/subs/stripe-return?creator_id=${creator_id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  // Redirect user to final UI
  redirect("/dashboard/payments?stripe=success");
}
