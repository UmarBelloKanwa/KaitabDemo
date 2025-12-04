"use client";

import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import type { BookResponse, BookChapterResponse, Chapter } from "@/types/book";
import GetContent from "./GetContent";
import LikeButton from "./ActionsButtons/LikeButton";
import ShareButton from "./ActionsButtons/ShareButton";
import CommentButton from "./ActionsButtons/CommentButton";
import ShowMoreButton from "./ActionsButtons/ShowMoreButton";
import { likeChapter, unLikeChapter } from "@/lib/api/book";

export default function Chapter({
  robook,
  chapter,
}: {
  chapter: BookChapterResponse;
  robook: BookResponse;
}) {
  // console.log(chapter);

  return (
    <Card
      sx={{
        maxWidth: "100%",
        bgcolor: "background.default",
        // p: 0,
        mx: "auto",
        mb: 1,
        // "&:hover": { boxShadow: 3 },
      }}
      elevation={1}
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
        action={<ShareButton id={`chapters/${chapter.public_id}`} />}
        title={
          <Typography variant="subtitle2" fontWeight="bold">
            {robook.name}
          </Typography>
        }
        subheader={
          <Typography variant="caption" color="text.secondary">
            Chapter {chapter.content.id} of {chapter.content.sections.length} •
            Page{" "}
            {chapter.content.pageNumber +
              Math.floor(
                chapter.content.pagesCount / chapter.content.sections.length
              )}
          </Typography>
        }
        sx={{ pb: 1 }}
      />

      <CardContent
        sx={{
          py: 0,
          width: "100%",
          maxWidth: "100%",
          overflow: "hidden", // prevent internal overflow
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            maxWidth: "100%",
            justifyContent: "center",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: "100%",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                maxHeight: "500px",
                width: "100%",
                overflow: "hidden",
              }}
            >
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

            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "80px",
                background:
                  "linear-gradient(to bottom, transparent 0%, rgba(26, 26, 26, 0.8) 50%, #1a1a1a 100%)",
                backdropFilter: "blur(2px)",
                pointerEvents: "none",
              }}
            />
            <ShowMoreButton
              chapterPublicId={chapter.public_id}
              robookSlug={robook.slug}
            />
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

            <CommentButton
              chapterPublicId={chapter.public_id}
              commentCount={chapter.comment_count}
              robookSlug={robook.slug}
            />
          </Box>
          <ShareButton id={`chapters/${chapter.public_id}`} />
        </Box>
      </CardContent>
    </Card>
  );
}
