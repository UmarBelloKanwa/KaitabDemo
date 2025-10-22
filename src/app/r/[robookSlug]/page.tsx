"use server";

import React from "react";
import Container from "@mui/material/Container";
import ProfileInfo from "@/components/ui/robook/ProfileInfo";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ChaptersFeed from "@ui/robook/chapter/ChaptersFeed";
import { fetchRobookState } from "@/actions/robook";
import type { BookResponse, BookChapterResponse } from "@/types/book";


export default async function RobookProfilePage({
  params,
}: {
  params: { robookSlug: string };
}) {
  const p = await params;
  const slug = p.robookSlug;

  let robook: BookResponse | null = null,
    chapters: BookChapterResponse[] | null = null;

  try {
    ({ robook, chapters } = await fetchRobookState(slug));
    // console.log("Chapters", JSON.stringify(chapters));
  } catch (err) {
    console.log(err);
  }
  console.log(chapters);
  return (
    <Box
      sx={{
        width: "100%", // full width container
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container
        maxWidth="sm" // keeps md width on large screens
        disableGutters
        sx={{
          width: "100%", // ensures full width on mobile
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={0}>
            <Grid
              sx={{
                height: "100vh",
                overflowY: "auto",
                width: "100%",
                scrollbarWidth: "none", // Firefox
                "&::-webkit-scrollbar": { display: "none" }, // Chrome/Safari
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: { xs: "100%", sm: "100%" },
                  px: { xs: 2, sm: 2 },
                }}
              >
                <ProfileInfo robook={robook} />
                {/* {contentName == "Posts" && <ProfilePosts />} */}
                {robook && chapters ? (
                  <ChaptersFeed robook={robook} chapters={chapters} />
                ) : (
                  <h1> Login to be able to read the book </h1>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
