"use server";

import Container from "@mui/material/Container";
// import { useTheme } from "@mui/material";
import RobooksList from "@/components/ui/home/RobooksList";
import CategoriesList from "@/components/ui/home/CategoriesList";
import PostLists from "@/components/ui/home/PostList";
import Header from "@/components/ui/home/Header";
// import { useTheme, } from "@emotion/react";
import Box from "@mui/material/Box";
import { fetchUser } from "@/actions/user";

export default async function Home() {
  const user = await fetchUser(); // Catche data for 5 min.
  
  return (
    <Box
      sx={{
        color: "text.primary",
        bgcolor: "background.default",
        pt: { xs: 1, sm: 2.5 },
        //maxWidth: { xs: "100%", sm: "78.3vw" },
        // maxWidth: "79%",
      }}
    >
      {/* Header */}
      <Header user={user} />

      {/* Content */}
      <Container
        maxWidth="xl"
        disableGutters
        sx={{ width: "100%", py: 3, pt: 1, px: 1.7 }}
      >
        <CategoriesList />
        <RobooksList />
        <PostLists />
      </Container>
    </Box>
  );
}
