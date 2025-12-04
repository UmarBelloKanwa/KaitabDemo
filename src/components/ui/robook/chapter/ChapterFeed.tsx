"use client";

import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import GetContent from "@/components/ui/robook/chapter/GetContent";
import Button from "@mui/material/Button";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import LikeButton from "./ActionsButtons/LikeButton";
import ShareButton from "./ActionsButtons/ShareButton";
import { likeChapter, unLikeChapter } from "@/lib/api/book";
import { CreateCommentToChapter, fetchChapterComments } from "@/lib/api/book";

import type { IndependentChapter } from "@/types/book";
import CommentSection from "./CommentSection";

export default function ChapterFeed({
  chapter,
}: {
  chapter: IndependentChapter | null;
}) {
  if (!chapter) {
    return <h1> No chapter, please login to be able to read the chapter </h1>;
  }
  console.log(chapter);

  const robook = chapter.book;

  return (
    <>
      <Card
        sx={(theme) => ({
          border: "1px solid",
          borderColor: "divider",
          maxWidth: "100%",
          bgcolor: "background.default",
          boxShadow: { sm: 2, xs: 0 },
          p: { xs: 0, sm: 1, md: 2 },
          pt: 1,
          mx: "auto",
          mb: 1,
          [theme.breakpoints.down("sm")]: {
            border: "none", // override border on small screens
            boxShadow: 0, // optional: remove shadow on small screens
            p: 0, // optional: adjust padding
          },
          // "&:hover": { boxShadow: 3 },
        })}
        elevation={0}
      >
        <CardHeader
          avatar={
            <Avatar
              src={robook.cover_photo_url}
              sx={{
                bgcolor: "primary.light",
                borderRadius: 1,
              }}
            >
              {robook.name.charAt(0)}
            </Avatar>
          }
          title={
            <Typography variant="subtitle2" fontWeight="bold">
              {robook.name}
            </Typography>
          }
          subheader={
            <Typography variant="caption" color="text.secondary">
              Chapter {chapter.content.id} of {chapter.content.sections.length}{" "}
              • Page{" "}
              {chapter.content.pageNumber +
                Math.floor(
                  chapter.content.pagesCount / chapter.content.sections.length
                )}
            </Typography>
          }
          sx={{ p: 0, pb: 1 }}
        />

        <CardContent sx={{ p: 0 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ position: "relative" }}>
              <Box>
                {chapter.content.sections.map((section, id: number) => {
                  return (
                    <React.Fragment key={id}>
                      {section.elements.map((element, id) => {
                        return <GetContent element={element} key={id} />;
                      })}
                    </React.Fragment>
                  );
                })}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2.5,
            }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <LikeButton
                createLike={async () => await likeChapter(chapter.public_id)}
                removeLike={async () => await unLikeChapter(chapter.public_id)}
                isLikedByUser={chapter.liked_by_user}
                likesCount={chapter.reaction_count}
              />

              <Button
                variant="text"
                size="small"
                //onClick={() => { setShowExpandedPost((prev) => !prev) }}
                startIcon={<ChatBubbleOutlineIcon />}
                sx={{
                  color: "text.secondary",
                  textTransform: "none",
                }}
              >
                {chapter.comment_count}
              </Button>
            </Box>
            <ShareButton />
          </Box>
        </CardContent>
      </Card>
      <CommentSection
        createComment={async (txt: string) =>
          CreateCommentToChapter(chapter.public_id, txt)
        }
        fetchComments={async () => fetchChapterComments(chapter.public_id)}
      />
    </>
  );
}
