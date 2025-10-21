"use client";

import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import ButtonBase from "@mui/material/ButtonBase";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import LanguageIcon from "@mui/icons-material/Language";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import usersComments from "@/data/comments.json";
import type {
  BookResponse,
  BookChapterResponse,
  IndependentChapter,
  Chapter,
  ChapterContent,
  ContentRole,
  ElementType,
  Element,
} from "@/types/book";
import CommentSection from "./CommentSection";

export default function ChapterFeed({
  chapter,
}: {
  chapter: IndependentChapter;
}) {
  const robook = chapter.book;
  const [showExpandedPost, setShowExpandedPost] = React.useState(false);

  const [liked, setLiked] = React.useState(false);
  const [bookmarked, setBookmarked] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const [randomLikes, setRandomLikes] = React.useState(0);
  const [randomComments, setRandomComments] = React.useState(0);

  React.useLayoutEffect(() => {
    setRandomLikes(Math.floor(Math.random() * 200) + 50);
    setRandomComments(Math.floor(Math.random() * 30) + 5);
  }, []);
  return (
    <>
      <Card
        sx={{
          maxWidth: "100%",
          bgcolor: "background.default",
          boxShadow: { sm: 7, xs: 0 },
          // borderRadius: 2,
          //       border: "1px solid",
          //       borderColor: "divider",
          p: { xs: 0, sm: 1, md: 2 },
          pt: 1,
          mx: "auto",
          mb: 1,
          // "&:hover": { boxShadow: 3 },
        }}
        elevation={0}
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
              <Button
                variant="text"
                size="small"
                startIcon={liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                onClick={() => setLiked(!liked)}
                sx={{
                  color: liked ? "" : "text.secondary",
                  textTransform: "none",
                }}
              >
                {liked ? randomLikes + 1 : randomLikes}
              </Button>

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
                {randomComments}
              </Button>

              <Button
                variant="text"
                size="small"
                startIcon={<ShareIcon />}
                sx={{
                  color: "text.secondary",
                  textTransform: "none",
                }}
              >
                Share
              </Button>
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
      <CommentSection
        timestamp="2"
        image={undefined}
        user={{
          name: "Atomic Habits",
          username: "Atomic Habits",
          avatar: "/atomic-habits.jpg",
          verified: true,
        }}
        content={"Null"}
        metrics={{
          replies: 45,
          retweets: 120,
          likes: 986,
          views: 5421,
        }}
        onClose={() => setShowExpandedPost(false)}
        usersComments={usersComments}
      />
    </>
  );
}

function GetContent({ element }: { element: Element }) {
  const { type, contentRole } = element;
  if (type === "head") {
    return (
      <Typography
        variant="h6"
        component={contentRole}
        fontWeight="bold"
        sx={{ mb: 1 }}
      >
        {element.text}
      </Typography>
    );
  } else if (type === "text") {
    return (
      <Typography component="div" variant="body2" sx={{ mb: 1, }}>
        {element.text}
      </Typography>
    );
  } else if (type === "image") {
    return (
      <Box component="img" src={element.src} alt={element.alt} sx={{ mb: 1 }} />
    );
  } else if (type === "list") {
    return (
      <Typography component="div" variant="body2" sx={{ mb: 1 }}>
        {element.text}
      </Typography>
    );
  } else if (type === "table") {
    return (
      <Typography component="div" variant="body2" sx={{ mb: 1 }}>
        {element.text}
      </Typography>
    );
  }
  return <></>;
}
