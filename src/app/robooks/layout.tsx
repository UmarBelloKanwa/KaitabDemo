"use server";

import AuthorsAndRobooksListLayout from "@/app/authors/layout";

import React from "react";

export default async function RobooksListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 

  return (
    <AuthorsAndRobooksListLayout>
      {children}
    </AuthorsAndRobooksListLayout>
  );
}
