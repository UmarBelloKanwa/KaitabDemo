"use client"

import PostCard from "@/components/ui/robook/post/OldPostCard";
import robook_chapters_posts from "@/data/robook_chapters_posts.json";
import comments from "@/data/comments.json";
import Box from "@mui/material/Box";
import type { PostCardProps } from "@/types";
import TableOfContents from "./TableOfContent";


const samplePost: PostCardProps = {
    ...robook_chapters_posts,
    usersComments: [...comments] // Attach comments to each post
};

export default function Home() {
    return (
        <Box>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
                <TableOfContents />
            </Box>
            <PostCard {...samplePost} />
        </Box>
    )
}
