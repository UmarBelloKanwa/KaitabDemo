import serverAxios, { serverCatcheAxios } from "@/actions/server-axios";
import { unstable_cache } from "next/cache";

export const fetchRobook = async (robookSlug: string) => {
  const axios = await serverAxios();
  const res = await axios.get(`book/${robookSlug}`);
  return res.data;
};

// export const fetchBookChapters = async (robookSlug: string) => {
//   const cookieHeader = await getAllCookiesAsString();
//   const axios = await serverCatcheAxios(cookieHeader);
//   const cachedFun = unstable_cache(
//     async (robookSlug: string) => {
//       const res = await axios.get(`book/${robookSlug}/chapters`);
//       return res.data;
//     },
//     [robookSlug],
//     { revalidate: 0 }
//   );

//   return cachedFun(robookSlug);
// };

export const fetchBookChapters = async (robookSlug: string) => {
  const axios = await serverAxios();
  const res = await axios.get(`book/${robookSlug}/chapters`);
  return res.data;
};

export const fetchInitialBookPosts = async (robookSlug: string) => {
  const axios = await serverAxios();
  const res = await axios.get(`post/book/${robookSlug}/posts?limit=10&offset=0`);
  return res.data;
};

export async function fetchRobookState(robookSlug: string) {
  try {
    const [robookRes, postsRes, chaptersRes] = await Promise.allSettled([
      fetchRobook(robookSlug),
      fetchInitialBookPosts(robookSlug),
      fetchBookChapters(robookSlug),
    ]);

    const robook = robookRes.status === "fulfilled" ? robookRes.value : null;
    const initialPosts = postsRes.status === "fulfilled" ? postsRes.value : null;
    
    const chapters =
      chaptersRes.status === "fulfilled" ? chaptersRes.value : [];

    return { robook, initialPosts, chapters };
  } catch (error) {
    console.log("Error fetching robook state:", error);
    throw new Error("Failed to load robook data");
  }
}

export const fetchBookChapter = async (public_id: string) => {
  const axios = await serverAxios();
  const res = await axios.get(`book/chapter/${public_id}`);
  return res.data;
};

export const fetchChapterComments = async (chapter_id: string) => {
  const axios = await serverAxios();
  const res = await axios.get(`book/chapter/${chapter_id}/comments`);
  return res.data;
};

export const fetchChapterState = async (chapter_id: string) => {
  try {
    const [chapterRes, commentsRes] = await Promise.allSettled([
      fetchBookChapter(chapter_id),
      fetchChapterComments(chapter_id),
    ]);

    const chapter = chapterRes.status === "fulfilled" ? chapterRes.value : null;
    const comments =
      commentsRes.status === "fulfilled" ? commentsRes.value : [];

    return { chapter, comments };
  } catch (error) {
    console.log("Error fetching chapter state:", error);
    throw new Error("Failed to load chapter data");
  }
};

export const fetchBookPostComments = async (book_slug: string, public_id: string) => {
  const axios = await serverAxios();
  const res = await axios.get(`post/${book_slug}/post/${public_id}/comments`);
  return res.data;
}

// Fetch book post for independent page of post

export const fetchBookPost = async (book_slug: string, public_id: string) => {
  const axios = await serverAxios();
  const res = await axios.get(`post/${book_slug}/post/${public_id}`);
  return res.data;
}

export const fetchBooks = async (offset?: number) => {
  const axios = await serverAxios();
  const res = await axios.get(`book/robooks?limit=10&offset=${offset || 0}`);
  return res.data;
}

export const fetchBooksPosts = async (offset?: number) => {
   const axios = await serverAxios();
  const res = await axios.get(`feed/books/posts?limit=10&offset=${offset || 0}`);
  return res.data;
}  