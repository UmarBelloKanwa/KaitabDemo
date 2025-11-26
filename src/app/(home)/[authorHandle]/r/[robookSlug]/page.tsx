"use server";

import React from "react";
import RobookIndieCard from "@/components/ui/author/RobookIndieCard";
import Box from "@mui/material/Box";

export default async function RobookCard({
  params,
}: {
  params: Promise<{
    authorHandle: string;
    robookSlug: string;
  }>;
}) {
  const p = await params;
  return (
    <Box
      sx={{
        m: "auto",
        width: "100%",
        position: "relative",
        p: 0,
        ml: {md: -3}
      }}
    >
      <RobookIndieCard
        authorHandle={p.authorHandle}
        robookSlug={p.robookSlug}
      />
    </Box>
  );
}
