export interface BookMetadata {
  title: string;
  language: string;
  totalChapters: number;
  totalPages: number;
  version: string;
}

export interface Chapter {
  id: number;
  title: string;
  pageNumber: number;
  pagesCount: number;
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  elements: Element[];
}

export type ElementType = "head" | "text" | "table" | "list" | "image";

export type ContentRole =
  | "paragraph"
  | "aside"
  | "figure"
  | "footnote"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "list"
  | "section";

export interface Element {
  type: ElementType;
  contentRole: ContentRole;
  text: string;
  style: ElementStyle;
  rows?: string[][];
  items?: string[];
  src?: string;
  alt?: string;
}

export interface ElementStyle {
  width: string;
  height: string;
  color: string;
  fontSize: string;
  fontWeight: string;
  // Optional additional CSS fields if you later want to support them:
  // fontStyle?: string;
  // textDecoration?: string;
  // textAlign?: string;
  // lineHeight?: string;
  // margin?: string;
  // padding?: string;
  // border?: string;
  // display?: string;
  // position?: string;
  // top?: string;
  // left?: string;
  // right?: string;
  // bottom?: string;
  // zIndex?: number;
}
export interface AuthorProfile {
  public_id: string; // UUID
  name: string;
  profile_photo_url?: string;
  // Optional fields if needed:
  // bio?: string;
  // username?: string;
}

export interface BookResponse {
  slug: string;
  public_id: string; // UUID
  extra_metadata: BookMetadata;

  author_public_id: string; // UUID
  user_public_id: string; // UUID

  // cover_photo_url: string;
  main_photo_url: string;
  name: string;
  description?: string;

  // Relationships
  // chapters: BookChapterResponse[];
  topics: string[];
  custom_topics: string[];

  author: AuthorProfile; // <--- added, optional because it may not always be loaded

  followers_count: number;
  can_follow: boolean;
  is_following: boolean;

  uploaded_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export interface BookChapterResponse {
  public_id: string; // UUID
  book_public_id?: string; // UUID, optional if not set
  title: string;

  // JSON content of the chapter (mirrors your `content: Dict` field)
  content: ChapterContent;

  // Relationships
  book?: BookResponse; // optional circular reference
  // comments?: BookChapterComment[];
  // reactions?: BookChapterReaction[];

  // Reaction counts: { "like": 10, "love": 5, ... }
  reaction_counts: {}; // // Record<string, number>;

  comment_count: number;
  reaction_count: number;

  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  // comments: [];
  liked_by_user: boolean;
}

// Example structure for the content JSON
export interface ChapterContent {
  id: number;
  title: string;
  pageNumber: number;
  pagesCount: number;
  sections: Section[];
}

// Already defined Section and Element from your previous code
export interface Section {
  id: string;
  title: string;
  elements: Element[];
}

export interface Element {
  type: ElementType;
  contentRole: ContentRole;
  text: string;
  style: ElementStyle;
  rows?: string[][];
  items?: string[];
  src?: string;
  alt?: string;
  id?: number;
}

export interface IndependentChapter extends BookChapterResponse {
  book: BookResponse;
}

export const fakeBook: BookResponse = {
  slug: "zero_to_one",
  name: "Zero To One",
  author: {
    name: "Peter Theil",
    public_id: "heyyyy",
    profile_photo_url: "/brian-tracy.jpg",
  },
  author_public_id: "hhhhh",
  main_photo_url: "/zero-to-one.jpg",
  custom_topics: ["Technology", "Startup", "Enterprenuership"],
  topics: ["Productivity"],
  can_follow: true,
  is_following: true,
  followers_count: 0,
  updated_at: "1/1/2005",
  uploaded_at: "1/1/2004",
  extra_metadata: {
    title: "Zero To One",
    language: "English",
    totalChapters: 10,
    totalPages: 11,
    version: "1.0",
  },
  public_id: "mmm",
  user_public_id: "aaq",
  description:
    "A great book for building startup from Zero to One by Peter Theil, the book is for founders and enterprenuers, and anyone who want to learn to buid innovative technologies.",
};

export const fakeChapters: BookChapterResponse[] = [
  {
    public_id: "3e2b4366-f8a4-469f-b010-8bbd58f3d9b7",
    title: "Introduction",
    updated_at: "2025-10-17 20:32:08.823702",
    book_public_id: "b4c7fe77-ef19-4e71-ba7f-59675a18430f",
    content: {
      id: 1,
      title: "Introduction",
      pageNumber: 1,
      pagesCount: 1,
      sections: [
        {
          id: "sec-1",
          title: "A Summary of the Philosophy for True Innovation",
          elements: [
            {
              type: "head",
              text: "A Summary of the Philosophy for True Innovation",
              contentRole: "h2",
              style: {
                width: "100%",
                height: "auto",
                color: "#333333",
                fontSize: "20px",
                fontWeight: "bold",
              },
              id: 1,
            },
            {
              type: "head",
              text: "The Core Idea: Go from Zero to One",
              contentRole: "h2",
              style: {
                width: "100%",
                height: "auto",
                color: "#333333",
                fontSize: "20px",
                fontWeight: "bold",
              },
              id: 2,
            },
            {
              type: "text",
              text: "The most important takeaway from Zero to One is the distinction between two types of progress:",
              contentRole: "paragraph",
              style: {
                width: "100%",
                height: "auto",
                color: "#333333",
                fontSize: "12px",
                fontWeight: "normal",
              },
              id: 3,
            },
            {
              type: "list",
              text: "Horizontal Progress (1 to n): This means copying things that work and scaling them.\nIt\u2019s about taking one successful product and making more of it, or taking an existing idea and globalizing it. This is easy to imagine, but it often leads to fierce competition and shrinking profits.\nVertical Progress (0 to 1): This means creating something entirely new. It's an act of invention and innovation. The single word for vertical progress is Technology. This is the hard path, but it is the one that generates massive new value, creates new markets, and changes the world.",
              contentRole: "list",
              style: {
                width: "100%",
                height: "auto",
                color: "#333333",
                fontSize: "12px",
                fontWeight: "normal",
              },
              id: 4,
            },
            {
              type: "text",
              text: 'The Contrarian Question: Every great business is built around a secret truth. Thiel suggests asking: "What important truth do very few people agree with you on?" The answer to this question is where the "zero to one" opportunity lies.',
              contentRole: "paragraph",
              style: {
                width: "100%",
                height: "auto",
                color: "#333333",
                fontSize: "12px",
                fontWeight: "normal",
              },
              id: 5,
            },
          ],
        },
      ],
    },
    created_at: "2025-10-17 20:32:08.823676",
    reaction_counts: {},
    reaction_count: 1,
    comment_count: 0,
    liked_by_user: true,
  },
  {
    public_id: "a8e24723-ab79-4d2f-ae3f-4e6e4cb2c4fc",
    title: "Part II: Building a Monopoly (The Seven Questions)",
    updated_at: "2025-10-17 20:32:08.824406",
    book_public_id: "b4c7fe77-ef19-4e71-ba7f-59675a18430f",
    content: {
      id: 3,
      title: "Part II: Building a Monopoly (The Seven Questions)",
      pageNumber: 2,
      pagesCount: 1,
      sections: [
        {
          id: "sec-4",
          title: "Part II: Building a Monopoly (The Seven Questions)",
          elements: [
            {
              type: "head",
              text: "Part II: Building a Monopoly (The Seven Questions)",
              contentRole: "h2",
              style: {
                width: "100%",
                height: "auto",
                color: "#333333",
                fontSize: "20px",
                fontWeight: "bold",
              },
              id: 13,
            },
            {
              type: "text",
              text: "Thiel outlines a framework for entrepreneurs to assess a potential new venture. A startup must be able to confidently answer YES to all seven questions:",
              contentRole: "paragraph",
              style: {
                width: "100%",
                height: "auto",
                color: "#333333",
                fontSize: "12px",
                fontWeight: "normal",
              },
              id: 14,
            },
            {
              type: "table",
              text: "|Question|Focus|Explanation|\n|---|---|---|\n|1. The Engineering Question|Technology|Can you create breakthrough technology instead of incremental improvements? Your solution must be 10x beter.|\n|2. The Timing Question|Momentum|Is now the right time to start your particular business? (Are the conditions ripe for your invention?)|\n|3. The Monopoly Question|Market Size|Are you starting with a large share of asmall market?Start small and monopolize. (Avoid the mistake of targeting 1% of a $100 billion market).|\n|4. The People Question|Team/Founders|Do you have the right people? Cofounders should have a deep, pre-existing relationship and a shared, fanatical mission.|",
              contentRole: "section",
              style: {
                width: "468.25px",
                height: "303.50px",
                color: "#333333",
                fontSize: "12px",
                fontWeight: "normal",
              },
              id: 15,
            },
          ],
        },
        {
          id: "sec-5",
          title: "The Distribution Question",
          elements: [
            {
              type: "table",
              text: "|5. The Distribution Question|Sales|Do you have a way to not just<br>create but also deliver your<br>product? (Superior sales and<br>distribution can, by itself,<br>create a monopoly).|\n|---|---|---|\n|6. The Durability Question|Future|Will your market position be<br>defensible 10 and 20 years into<br>the future? (Will you still be the<br>last mover?)|\n|7. The Secret Question|Vision|Have you identifed a unique<br>opportunity that others don't<br>see? (What important truth<br>does almost nobody agree<br>with you on?)|",
              contentRole: "section",
              style: {
                width: "468.25px",
                height: "212.50px",
                color: "#333333",
                fontSize: "12px",
                fontWeight: "normal",
              },
              id: 16,
            },
          ],
        },
      ],
    },
    created_at: "2025-10-17 20:32:08.824386",
    reaction_counts: {},
    reaction_count: 0,
    comment_count: 0,
    liked_by_user: false,
  },
  {
    public_id: "cb2eba02-b8ca-46b8-8987-cef7d35d9983",
    title:
      "Part I: Why Competition is for Losers (The Power of Creative Monopoly)",
    updated_at: "2025-10-17 20:32:08.824112",
    book_public_id: "b4c7fe77-ef19-4e71-ba7f-59675a18430f",
    content: {
      id: 2,
      title:
        "Part I: Why Competition is for Losers (The Power of Creative Monopoly)",
      pageNumber: 1,
      pagesCount: 1,
      sections: [
        {
          id: "sec-2",
          title:
            "Part I: Why Competition is for Losers (The Power of Creative Monopoly)",
          elements: [
            {
              type: "head",
              text: "Part I: Why Competition is for Losers (The Power of Creative Monopoly)",
              contentRole: "h2",
              style: {
                width: "100%",
                height: "auto",
                color: "#333333",
                fontSize: "20px",
                fontWeight: "bold",
              },
              id: 6,
            },
            {
              type: "text",
              text: "Thiel argues that perfect competition\u2014the economic ideal where all profit is driven to zero\u2014is bad for society, whereas creative monopolies are engines for progress.",
              contentRole: "paragraph",
              style: {
                width: "100%",
                height: "auto",
                color: "#333333",
                fontSize: "12px",
                fontWeight: "normal",
              },
              id: 7,
            },
            {
              type: "table",
              text: "|bad for society, whereas creative monopolies|are engines for progress.|\n|---|---|\n|Monopolies (Good)|Competition (Bad)|\n|Focus on long-term planning, product quality, and company culture.|Forced to focus on short-term survival and marginal gains.|\n|Able to invest in ambitious research (e.g., Google's long-term bets).|Profts are competed away; litle money remains for R&D.|\n|Create new categories of abundance for the world.|Creates a brutal struggle where no company can aford to care about anything other than|",
              contentRole: "section",
              style: {
                width: "468.25px",
                height: "123.07px",
                color: "#333333",
                fontSize: "12px",
                fontWeight: "normal",
              },
              id: 8,
            },
          ],
        },
        {
          id: "sec-3",
          title: "the fight. Characteristics of a Creative Monopoly:",
          elements: [
            {
              type: "text",
              text: "the fight.",
              contentRole: "paragraph",
              style: {
                width: "100%",
                height: "auto",
                color: "#333333",
                fontSize: "12px",
                fontWeight: "normal",
              },
              id: 9,
            },
            {
              type: "text",
              text: "Characteristics of a Creative Monopoly: A valuable company needs to create and capture value. To do this sustainably, it must possess four traits:",
              contentRole: "paragraph",
              style: {
                width: "100%",
                height: "auto",
                color: "#333333",
                fontSize: "12px",
                fontWeight: "normal",
              },
              id: 10,
            },
            {
              type: "list",
              text: "Proprietary Technology: Must be at least 10x better than its closest substitute.\nAnything less is just an incremental improvement.\nNetwork Effects: The product becomes more valuable as more people use it (e.g., Facebook, WhatsApp).\nEconomies of Scale: The business becomes stronger as it gets bigger (e.g., lower production costs per unit).\nBranding: A strong, unique brand that creates an emotional attachment and monopoly on perception (e.g., Apple).",
              contentRole: "list",
              style: {
                width: "100%",
                height: "auto",
                color: "#333333",
                fontSize: "12px",
                fontWeight: "normal",
              },
              id: 11,
            },
            {
              type: "text",
              text: "Last Mover Advantage: Thiel believes the goal isn't just to be the First Mover but the Last Mover \u2014the one who achieves the final, long-lasting creative monopoly by perfecting the technology and dominating the market.",
              contentRole: "paragraph",
              style: {
                width: "100%",
                height: "auto",
                color: "#333333",
                fontSize: "12px",
                fontWeight: "normal",
              },
              id: 12,
            },
          ],
        },
      ],
    },
    created_at: "2025-10-17 20:32:08.824090",
    reaction_counts: {},
    reaction_count: 0,
    comment_count: 0,
    liked_by_user: false,
  },
  {
    public_id: "1289044a-276c-4084-9b73-f9b04b0333b9",
    title: "Part III: The Definite Future",
    updated_at: "2025-10-17 20:32:08.824643",
    book_public_id: "b4c7fe77-ef19-4e71-ba7f-59675a18430f",
    content: {
      id: 4,
      title: "Part III: The Definite Future",
      pageNumber: 3,
      pagesCount: 1,
      sections: [
        {
          id: "sec-6",
          title: "Part III: The Definite Future",
          elements: [
            {
              type: "head",
              text: "Part III: The Definite Future",
              contentRole: "h2",
              style: {
                width: "100%",
                height: "auto",
                color: "#333333",
                fontSize: "20px",
                fontWeight: "bold",
              },
              id: 17,
            },
            {
              type: "text",
              text: "Thiel argues for the importance of having a definite vision for the future.",
              contentRole: "paragraph",
              style: {
                width: "100%",
                height: "auto",
                color: "#333333",
                fontSize: "12px",
                fontWeight: "normal",
              },
              id: 18,
            },
            {
              type: "list",
              text: "Definite Optimists plan for a better future and work to make it happen (e.g., 1950s America, building the space program). This is the founder's mindset.\nIndefinite Optimists believe the future will be better but have no plan, instead relying on chance or a broad \u201cportfolio\u201d of ideas (e.g., modern Silicon Valley venture capital).",
              contentRole: "list",
              style: {
                width: "100%",
                height: "auto",
                color: "#333333",
                fontSize: "12px",
                fontWeight: "normal",
              },
              id: 19,
            },
            {
              type: "text",
              text: "The Founder's Paradox: The most successful companies are often founded by individuals with eccentric, visionary, and sometimes borderline odd personalities (like Steve Jobs or Elon Musk). This is because the kind of person who can question the most fundamental aspects of a market to find the \u201csecret\u201d (the 0 to 1 idea) is rarely the kind of person who fits neatly into social convention. These founders need to be embraced because they are the ones with the singular vision required for a creative monopoly.",
              contentRole: "paragraph",
              style: {
                width: "100%",
                height: "auto",
                color: "#333333",
                fontSize: "12px",
                fontWeight: "normal",
              },
              id: 20,
            },
            {
              type: "text",
              text: "Final Takeaway: The task of every entrepreneur is to find singular ways to create new things\u2014to go from 0 to 1\u2014and build a better future rather than merely replicating the past.",
              contentRole: "paragraph",
              style: {
                width: "100%",
                height: "auto",
                color: "#333333",
                fontSize: "12px",
                fontWeight: "normal",
              },
              id: 21,
            },
          ],
        },
      ],
    },
    created_at: "2025-10-17 20:32:08.824623",
    reaction_counts: {},
    reaction_count: 0,
    comment_count: 0,
    liked_by_user: false,
  },
];

export const fakeIndependentChapter = {
  ...fakeChapters[3],
  book: { ...fakeBook },
};
