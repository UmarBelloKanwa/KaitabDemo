"use server";

import RobooksList from "@/components/ui/home/MobileRobooksList";
import PostLists from "@/components/ui/home/PostList";
import Header from "@/components/ui/home/Header";
import Box from "@mui/material/Box";
import StatusArea from "@/components/ui/editor/StatusArea";

export default async function Home() {
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
        <StatusArea />
      </Box>
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
