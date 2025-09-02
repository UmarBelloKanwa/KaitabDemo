import Box from "@mui/material/Box";
import PostCard from "@/components/ui/robook/post/PostCard";
import robooks_posts from "@/data/robook_posts.json";
import comments from "@/data/comments.json";
import type { PostCardProps } from "@/types";


const posts = robooks_posts.map((post: PostCardProps) => ({
    ...post,
    usersComments: comments
}));

export default function RobookProfilePosts() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
            }}
        >
            {posts.map((post, index) => (
                <PostCard
                    key={index}
                    {...post}
                />
            ))}
        </Box>
    )
}