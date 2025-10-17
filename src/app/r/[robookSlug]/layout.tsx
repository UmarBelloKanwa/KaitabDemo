import React from "react";
import { fetchRobook } from "@/actions/robook";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { robookSlug: string };
  }) {
  
  // let robook = null;
  // try {
  //   robook = await fetchRobook(params.robookSlug);
  //   console.log(robook);
  // } catch (err) {
  //   console.log(err);
  // }
  
  return (
    <>
      <main>{children}</main>
    </>
  );
}
