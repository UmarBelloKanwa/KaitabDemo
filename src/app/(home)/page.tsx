"use server";

import RobooksList from "@/components/ui/home/MobileRobooksList";
import PostLists from "@/components/ui/home/PostList";
import Header from "@/components/ui/home/Header";
import Box from "@mui/material/Box";
import { fetchUser } from "@/actions/user";

export default async function Home() {
  return (
    <Box
      sx={{
        mt: 2,
        px: { xs: 1 },
      }}
    >
      <Header />
      <RobooksList />
      <Box
        sx={{
          m: "auto",
          mt: 2,
          width: { xs: "99%", sm: "75%" },
        }}
      >
        <PostLists />
      </Box>
      </Box>
  );
}
