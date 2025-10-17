"use server";

import React from "react";
import RobookChat from "@/components/ui/robook/chat/RobookChat";
import ProfilePosts from "@/components/ui/robook/post/ProfilePosts";
import Container from "@mui/material/Container";
import ProfileInfo from "@/components/ui/robook/ProfileInfo";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TableOfContent from "@ui/robook/chapter/TableOfContent";
import SocialPost from "@ui/robook/chapter/SocialMediaFeed";
import { fetchRobook } from "@/actions/robook";

export default async function RobookProfilePage({
  params,
}: {
  params: { robookSlug: string };
}) {
    let robook = null;
    const p = await params;
    const slug = p.robookSlug;
  try {
    robook = await fetchRobook(slug);
    console.log(robook);
  } catch (err) {
    console.log(err);
  }
  // const [contentName, setContentName] = React.useState("Chapters");
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
                              <ProfileInfo
                                  robook={robook}
                //   contentName={contentName}
                //   setContentName={setContentName}
                />
                {/* {contentName == "Posts" && <ProfilePosts />} */}
                {/* {contentName == "Messages" && <RobookChat />} */}
                {/* {contentName == "Chapters" && <SocialPost />} */}
              </Box>
            </Grid>
            {/* <Divider flexItem orientation="vertical" sx={{ display: { xs: "none", sm: "block", }, }} />
                        <Grid size="grow" sx={{
                            height: "90vh",
                            overflowY: "auto",
                            display: { xs: "none", sm: "block", },
                            scrollbarWidth: "none", // Firefox
                            p: 1,
                            width: "100%",

                            "&::-webkit-scrollbar": { display: "none" }, // Chrome/Safari
                        }}>
                            {contentName == "Chapters" ? (
                                <>
                                    <TableOfContent />
                                    <RobookChat />
                                </>
                            ) : <RobookChat />}
                        </Grid>
                        <Divider flexItem orientation="vertical" sx={{ display: { xs: "none", sm: "block", }, }} /> */}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
