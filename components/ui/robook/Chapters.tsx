"use client"

import { PostCard } from "@ui/robook/chapter/PostCard";
import Box from "@mui/material/Box";


interface Comment {
    id: string
    user: {
        name: string
        username: string
        avatar: string
        verified?: boolean
    }
    timestamp: string
    content: string
    metrics: {
        replies: number
        likes: number
    }
}


const sampleComments: Comment[] = [
    {
        id: "1",
        user: {
            name: "Sarah Johnson",
            username: "sarahj_dev",
            avatar: "/woman-developer.png",
            verified: false,
        },
        timestamp: "1h",
        content:
            "This is so true! I've been tracking my coding habits for 6 months and the improvement is incredible. Small daily practice really adds up.",
        metrics: { replies: 3, likes: 12 },
    },
    {
        id: "2",
        user: {
            name: "Mike Chen",
            username: "mikechen",
            avatar: "/professional-man.png",
            verified: true,
        },
        timestamp: "45m",
        content:
            "The plateau concept is key. Most people quit right before they would see results. Patience and consistency are everything.",
        metrics: { replies: 1, likes: 8 },
    },
    {
        id: "3",
        user: {
            name: "Emma Wilson",
            username: "emmaw_writes",
            avatar: "/woman-writer.png",
            verified: false,
        },
        timestamp: "30m",
        content:
            "I needed to hear this today. Been feeling discouraged about my writing progress but this reminds me to keep going! 📝",
        metrics: { replies: 0, likes: 5 },
    },
]


const samplePost = {
    user: {
        name: "Atomic Habits",
        username: "atomichabits",
        avatar: "/atomic-habits.jpg",
        verified: true,
    },
    timestamp: "2h",
    content: `The compound effect of small habits is remarkable.

If you get 1% better each day for one year, you'll end up thirty-seven times better by the time you're done.

Conversely, if you get 1% worse each day for one year, you'll decline nearly down to zero.

Small changes appear to make no difference until you cross a critical threshold. The most powerful outcomes of any compounding process are delayed. You need to be patient.

This is one of the core reasons why it's so hard to build habits that last. People make a few small changes, fail to see a tangible result, and decide to stop.

You think, "I've been running every day for a month, so why can't I see a change in my body?" Once this kind of thinking takes over, it's easy to let good habits fall by the wayside.

But in order to make a meaningful difference, habits need to persist long enough to break through this plateau—what I call the Plateau of Latent Potential.`,
    image: "/book.png",
    metrics: {
        replies: 61,
        retweets: 34,
        likes: 389,
        views: 30000,
    },
    usersComments: sampleComments
}

export default function Home() {
    return (
        <PostCard {...samplePost} />
    )
}
