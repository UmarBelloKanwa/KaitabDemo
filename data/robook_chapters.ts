import bookData from "./book_data.json";
import comments from "./comments.json";

const brain = {
    "name": "Atomic Habits",
    "username": "atomichabits",
    "avatar": "/atomic-habits.jpg",
    "verified": true
};

const random = {
    "replies": 61,
    "retweets": 34,
    "likes": 389,
    "views": 30000
}; // make all those to random

const chapters = [
    {
        user: { ...brain },
        "timestamp": "2h", // use random
        content: "",
        usersComments: [...comments]
    }
];

export default chapters;

// "introduction_my_story"
//   "my_recovery":
// "how_i_learned_about_habits":
//   "how_this_book_will_benefit_you": 