import Box from "@mui/material/Box";
import AuthorsLists from "./AuthorsList";
import PostCard from "@/components/ui/home/PostCard";

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
        name: "Miracle Morning",
        avatar: "/miracle-morning.jpg",
        verified: true,
        timestamp: "12h",
        content: `Good morning, achievers! 🌅  

How you start your day shapes your entire life. Silence. Affirmations. Visualization. Exercise. Reading. Scribing.  

Which one are you skipping today? Be honest 😉`,
    },
    {
        id: 3,
        name: "No Excuses: The Power of Self-Discipline",
        avatar: "/no-excuse.png",
        verified: true,
        timestamp: "6h",
        username: "NoExcuses",
        content: `Stop waiting for motivation. Discipline beats motivation every single time. 

Decide what you want, and act like your life depends on it—because it does.  

What’s your biggest excuse right now? Let’s crush it.`,
    },
    {
        id: 4,
        name: "Zero to One",
        avatar: "/zero-to-one.jpg",
        verified: true,
        timestamp: "4h",
        content: `Going from zero to one means creating something the world has never seen before.  

The future isn’t built by copying others—it’s built by those who dare to think differently.  

What’s one crazy idea you believe in (but others don’t)?`,
    },
    {
        id: 5,
        name: "The Startup Playbook",
        avatar: "/startup-playbook.jpg",
        verified: true,
        timestamp: "2h",
        content: `Startups are hard, but you’re not alone.

Learn from the best—founders who failed, pivoted, and succeeded big.  

What’s your startup stage? Idea 💡 | MVP ⚡ | Scaling 🚀`,
    },
];

export default function PostLists() {
    return (
        <Box
            sx={{
                width: { md: "85%" },
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
