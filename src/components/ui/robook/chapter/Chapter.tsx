import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import type { BookResponse, BookChapterResponse, Chapter } from "@/types/book";
import { useRouter } from "next/navigation";
import useAuthCheck from "@/hooks/auth/useAuthCheck";
import GetContent from "./GetContent";
import {
  LikeButton,
  ShareButton,
} from "@/components/ui/robook/chapter/ActionsButtons";

export default function Chapter({
  robook,
  chapter,
}: {
  chapter: BookChapterResponse;
  robook: BookResponse;
}) {
  const [bookmarked, setBookmarked] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const [randomComments, setRandomComments] = React.useState(chapter.comments_count);
  const requireAuth = useAuthCheck();
  const router = useRouter();

  console.log(chapter)

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
            src={robook.main_photo_url}
            sx={{
              bgcolor: "primary.light",
              borderRadius: 1,
            }}
          >
            {robook.name.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton
            size="small"
            onClick={() => setBookmarked(!bookmarked)}
            sx={{
              color: bookmarked ? "warning.main" : "text.secondary",
              "&:hover": { bgcolor: "warning.light", color: "warning.main" },
            }}
          >
            {bookmarked ? (
              <BookmarkIcon fontSize="small" />
            ) : (
              <BookmarkBorderIcon />
            )}
          </IconButton>
        }
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

      <CardContent sx={{ py: 0 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                maxHeight: "500px",
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

            {!expanded && (
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
            )}

            <Button
              fullWidth
              onClick={() => {
                requireAuth(() =>
                  router.push(`/r/${robook.slug}/${chapter.public_id}`)
                );
              }}
              endIcon={
                <KeyboardArrowDownIcon
                  sx={{
                    transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s",
                  }}
                />
              }
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.05)",
                color: "text.primary",
                textTransform: "none",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.08)",
                },
              }}
            >
              {expanded ? "Show less" : "Show more"}
            </Button>
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
              chapterPublicId={chapter.public_id}
              isLikedByUser={chapter.liked_by_user}
              likesCount={chapter.reaction_count}
            />

            <Button
              variant="text"
              size="small"
              onClick={() => {
                requireAuth(() =>
                  router.push(`/r/${robook.slug}/${chapter.public_id}`)
                );
              }}
              startIcon={<ChatBubbleOutlineIcon />}
              sx={{
                color: "text.secondary",
                textTransform: "none",
              }}
            >
              {randomComments}
            </Button>

            <ShareButton />
          </Box>
          <IconButton
            onClick={() => setBookmarked(!bookmarked)}
            sx={{
              color: bookmarked ? "warning.main" : "text.secondary",
              "&:hover": { bgcolor: "warning.light", color: "warning.main" },
            }}
          >
            {bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}
