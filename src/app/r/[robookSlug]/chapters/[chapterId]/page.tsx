"use server";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import AppBar from "@/components/ui/robook/chapter/AppBar";
import ChapterFeed from "@/components/ui/robook/chapter/ChapterFeed";
import { fetchChapterState } from "@/actions/robook";
import type { IndependentChapter, Comment } from "@/types/book";

export default async function ChapterPage({
  params,
}: {
  params: { chapterId: string };
}) {
  const p = await params;
  const chapterId = p.chapterId;
  let chapter: IndependentChapter | null = null,
    comments: Comment[] | null = null;

  try {
    ({ chapter, comments } = await fetchChapterState(chapterId));
  } catch (err) {
    console.log(err);
  }
  // console.log("Comments", comments);

  return (
    <Box sx={{ minHeight: "100vh", width: "100%", position: "relative" }}>
      {/* Full-width AppBar */}
      {chapter?.book && <AppBar robook={chapter.book} backTo="chapters" />}

      {/* Centered content but not restricted by layout container */}
      <Container maxWidth={false} sx={{ py: 3, maxWidth: 805, mx: "auto" }}>
        <ChapterFeed chapter={chapter} comments={comments} />
      </Container>
    </Box>
  );
}
