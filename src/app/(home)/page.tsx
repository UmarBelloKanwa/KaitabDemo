"use server";

import RobooksList from "@/components/ui/home/MobileRobooksList";
import PostLists from "@/components/ui/home/PostList";
import Header from "@/components/ui/home/Header";
// import { useTheme, } from "@emotion/react";
import Box from "@mui/material/Box";
import { fetchUser } from "@/actions/user";

export default async function Home() {
  const user = await fetchUser(); // Catche data for 5 min.

  return (
    <Box>
      <Header user={user} />
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
