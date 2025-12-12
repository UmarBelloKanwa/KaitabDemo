"use server";

import React from "react";
import RobooksList from "@/components/ui/home/MobileRobooksList";
import PostLists from "@/components/ui/home/PostList";
import Header from "@/components/ui/home/Header";
import Box from "@mui/material/Box";
import StatusArea from "@/components/ui/editor/StatusArea";
import CategoriesList from "@/components/ui/home/CategoriesList";

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        mt: 2,
        px: { xs: 1 },
      }}
    >
      <Box
        sx={{
          m: "auto",
          mt: {xs: -2},
          width: "100%",
        }}
      >
        <Header />
       
      </Box>
      {/* <RobooksList /> */}
      <Box
        sx={{
          m: "auto",
          //mt: 2,
          width: { xs: "99%", sm: "81%" },
        }}
      >
        <StatusArea />
        <CategoriesList />
        {children}
      </Box>
    </Box>
  );
}
