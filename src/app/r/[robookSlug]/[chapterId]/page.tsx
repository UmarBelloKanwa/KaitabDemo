import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import AppBar from "@/components/ui/robook/chapter/ChapterAppBar";
import { fakeIndependentChapter } from "@/types/book";
import ChapterFeed from "@/components/ui/robook/chapter/ChapterFeed";

export default function ChapterPage() {
  return (
    <Box sx={{ minHeight: "100vh", width: "100%" }}>
      <AppBar />
      <Container maxWidth={false} sx={{ py: 3, maxWidth: 805 }}>
        <ChapterFeed chapter={fakeIndependentChapter} />
      </Container>
    </Box>
  );
}
