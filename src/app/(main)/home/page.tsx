"use server";

import ArticlesPreviewList from "@/components/ui/home/ArticlesPreviewList";
import StatusArea from "@/components/ui/editor/StatusArea";
import CategoriesList from "@/components/ui/home/CategoriesList";
import Box from "@mui/material/Box";
import AuthorsPreviews from "@/components/ui/home/AuthorsPreviews";

export default async function HomePage() {
  return (
    <>
      <Box
        sx={{
          mt: { md: 0, xs: 0 },
          m: "auto",
          width: { xs: "95%" },
          maxWidth: "sm",
        }}
      >
        <StatusArea />
        <CategoriesList />
      </Box>
      <AuthorsPreviews />
    </>
  );
}
