
import Box from "@mui/material/Box";
import AuthorsLists from "./AuthorsList";
import PostCard from "./PostCard";
import robooks_posts from "@/data/robooks_posts.json";
import comments from "@/data/comments.json";
import type { PostCardProps } from "@/types";
import Grid from "@mui/material/Grid";

const posts = robooks_posts.map((post: PostCardProps) => ({
    ...post,
    usersComments: comments,
}));

export default function PostLists() {

    return (
        <Grid container spacing={{ sm: 2, }}
            sx={{
                width: { xs: "100%", md: "85%" },
                m: "auto", mt: 2,
                alignContent: "center",
                alignItems: "flex-start",
            }}
        >
            {/* Posts for user to scroll and view */}
            <Grid size={{ xs: 12, sm: 7 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    {posts.map((robook_post, index) => (
                        <PostCard key={index} {...robook_post} />
                    ))}
                </Box>
            </Grid>
            {/* A fixed side bar of authors (people) to follow */}
            <Grid
                size={{ xs: 0, sm: "grow" }}
                sx={{
                    display: { xs: "none", sm: "block" },
                    position: "sticky",
                    top: 0,
                    height: "100vh",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <AuthorsLists />
            </Grid>
        </Grid>
    );
}