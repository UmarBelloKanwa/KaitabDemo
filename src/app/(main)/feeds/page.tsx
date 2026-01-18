"use server";

import ArticlesPreviewList from "@/components/ui/home/ArticlesPreviewList";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import StatusArea from "@/components/ui/editor/StatusArea";
import CategoriesList from "@/components/ui/home/CategoriesList";

export default async function FeedPage() {
  return (
    <Container
      maxWidth="sm"
      disableGutters
      sx={{
        color: "text.primary",
        bgcolor: "background.default",
        pt: { xs: 0, sm: 0 },
        width: "100%",
        py: 0,
        px: { xs: 0, md: 0 },
      }}
    >
      <Box
        sx={{
          m: "auto",
        //  mt: 3,
          width: { xs: "97%" },
          gap: 0,
        }}
      >
        <StatusArea />
        <CategoriesList />
      </Box>
      <ArticlesPreviewList />;
    </Container>
  );
}
