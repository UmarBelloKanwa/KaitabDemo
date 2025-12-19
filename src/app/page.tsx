"use server";

import AboutPage from "@/app/(info)/about/page";
import InfoLayout from "@/app/(info)/layout";
// import MainPagesLayout from "@/app/(main)/layout";
// import HomeLayout from "@/app/(main)/(home)/layout";
// import HomePage from "@/app/(main)/(home)/home/page";
import { cookies } from "next/headers"; // <-- Next.js server headers API
import { redirect } from "next/navigation";

export default async function LandingPage() {
  // Get cookies from the request
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("refresh_token")?.value;

  // If no access token → show public info page
  if (accessToken) {
    redirect("/home");
  }

  // If access token exists → show main app
  return (
    <InfoLayout>
      <AboutPage />
    </InfoLayout>
  );
}
