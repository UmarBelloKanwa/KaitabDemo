import Box from "@mui/material/Box";
import PostCard from "@/components/ui/robook/RobookProfilePostCard";

const robooks = [
    {
        id: 1,
        name: "Atomic Habits",
        avatar: "/atomic-habits.jpg",
        verified: true,
        timestamp: "18h",
        content: `Small changes, big results! 💡  

Every habit you repeat daily is a vote for the person you want to become.  

What habit are you working on today? Drop it below, and let's make it stick together!`,
    },
    {
        id: 2,
        name: "Atomic Habits",
        avatar: "/atomic-habits.jpg",
        verified: true,
        timestamp: "12h",
        content: `Good morning, achievers! 🌅  

How you start your day shapes your entire life. Silence. Affirmations. Visualization. Exercise. Reading. Scribing.  

Which one are you skipping today? Be honest 😉`,
    },
    {
        id: 3,
        name: "Atomic Habits",
        avatar: "/atomic-habits.jpg",
        verified: true,
        timestamp: "6h",
        username: "NoExcuses",
        content: `Stop waiting for motivation. Discipline beats motivation every single time. 

Decide what you want, and act like your life depends on it—because it does.  

What’s your biggest excuse right now? Let’s crush it.`,
    },
    {
        id: 4,
        name: "Atomic Habits",
        avatar: "/atomic-habits.jpg",
        verified: true,
        timestamp: "4h",
        content: `Going from zero to one means creating something the world has never seen before.  

The future isn’t built by copying others—it’s built by those who dare to think differently.  

What’s one crazy idea you believe in (but others don’t)?`,
    },
    {
        id: 5,
        name: "Atomic Habits",
        avatar: "/atomic-habits.jpg",
        verified: true,
        timestamp: "2h",
        content: `Startups are hard, but you’re not alone.

Learn from the best—founders who failed, pivoted, and succeeded big.  

What’s your startup stage? Idea 💡 | MVP ⚡ | Scaling 🚀`,
    },
];


export default function RobookProfilePosts() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
            }}
        >
            {robooks.map((book) => (
                <PostCard
                    key={book.id}
                    user={{
                        name: book.name,
                        username: book.username || book.name.replace(/\s+/g, ""), // fake username
                        avatar: book.avatar,
                        verified: book.verified,
                    }}
                    timestamp={book.timestamp}
                    content={book.content}
                    image={undefined}
                    metrics={{
                        replies: 818,
                        retweets: 74,
                        likes: 297,
                        views: 33000,
                    }}
                />
            ))}
        </Box>
    )
}