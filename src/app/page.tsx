"use server";

import AboutPage from "@/app/(info)/about/page";
import InfoLayout from "@/app/(info)/layout";

export default async function LandingPage() {
  return (
    <InfoLayout>
      <AboutPage />
    </InfoLayout>
  );
}
