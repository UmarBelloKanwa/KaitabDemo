"use server";

import MainPagesLayout from "@/app/(main)/home/layout";
import HomePage from "@/app/(main)/home/page";

export default async function Page() {
  return (
    <MainPagesLayout>
      <HomePage />
    </MainPagesLayout>
  );
}
