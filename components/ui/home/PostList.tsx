import Box from "@mui/material/Box";
import AuthorsLists from "./AuthorsList";
import PostCard from "./PostCard";
import robooks_posts from "@/data/robooks_posts.json";
import comments from "@/data/comments.json";
import type { PostCardProps } from "@/types";



const posts = robooks_posts.map((post: PostCardProps) => ({
    ...post,
    usersComments: comments
}));

export default function PostLists() {
    return (
        <Box
            sx={{
                width: { xs: "100%", md: "85%" },
                m: "auto",
                height: "100vh", // full viewport height
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 40%" },
                gap: 2,
            }}
        >
            {/* Scrollable Post Feed */}
            <Box
                sx={{
                    height: "100%",
                    overflowY: "auto", // ✅ only this scrolls
                    mt: 2,
                    p: 0,
                    scrollbarWidth: "none", // Firefox
                    "&::-webkit-scrollbar": { display: "none" }, // Chrome/Safari
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    {posts.map((robook_post, index) => (
                        <PostCard
                            key={index}
                            {...robook_post}
                        />
                    ))}
                </Box>
            </Box>

            {/* Sticky Sidebar */}
            <Box
                sx={{
                    display: { xs: "none", sm: "block" },
                    position: "sticky",
                    top: 16, // ✅ stays fixed at 16px from top
                    alignSelf: "start",
                }}
            >
                <AuthorsLists />
            </Box>
        </Box>
    );
}
