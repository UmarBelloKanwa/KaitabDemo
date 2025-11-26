import serverAxios, { serverCatcheAxios } from "@/actions/server-axios";

export const fetchRobook = async (robookSlug: string) => {
  const axios = await serverAxios();
  const res = await axios.get(`book/${robookSlug}`);
  return res.data;
};

export const fetchBookChapters = async (robookSlug: string) => {
  const axios = await serverAxios();
  const res = await axios.get(`book/${robookSlug}/chapters`);
  return res.data;
};


export async function fetchRobookState(robookSlug: string) {
  try {
    const [robookRes, chaptersRes] = await Promise.allSettled([
      fetchRobook(robookSlug),
      fetchBookChapters(robookSlug),
    ]);

    const robook = robookRes.status === "fulfilled" ? robookRes.value : null;
    
    const chapters =
      chaptersRes.status === "fulfilled" ? chaptersRes.value : [];

    return { robook, chapters };
  } catch (error) {
    console.log("Error fetching robook state:", error);
    throw new Error("Failed to load robook data");
  }
}


export const fetchBooks = async (offset?: number) => {
  const axios = await serverAxios();
  const res = await axios.get(`book/robooks?limit=10&offset=${offset || 0}`);
  return res.data;
}



export const fetchBookChapter = async (public_id: string) => {
  const api = await serverAxios();
  const res = await api.get(`book/chapter/${public_id}`);
  return res.data;
};
