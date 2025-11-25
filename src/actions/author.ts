import serverAxios from "@/actions/server-axios";

export const getAuthorProfile = async (author_handle: string) => {
  const api = await serverAxios();
  const res = await api.get(`/author/${author_handle}/profile`);
  return res.data;
}

export const getAuthorBooks = async (author_handle: string, pageParam?: string) => {
  const api = await serverAxios();
  const res = await api.get(`/author/${author_handle}/books?limit=10&offset=${pageParam ?? 0}`);
  return res.data;
}

export const getAuthorBook = async (author_handle: string, robook_slug: string) => { 
  const api = await serverAxios();
  const res = await api.get(`/author/${author_handle}/book/${robook_slug}`);
  return res.data;
}

export const getAuthorBookComments = async (author_handle: string, robook_slug: string) => { 
  const api = await serverAxios();
  const res = await api.get(`/book/${robook_slug}/comments`);
  return res.data;
}

export const getCurrentAuthorProfile = async () => { 
  const api = await serverAxios();
  const res = await api.get(`/author/me`);
  return res.data;
}


export const fetchAuthors = async (offset?: number) => {
  const axios = await serverAxios();
  const res = await axios.get(`/author/authors/to-follow?limit=10&offset=${offset || 0}`);
  return res.data;
}

export const fetchInitialAuthorPosts = async (authorHandle: string) => {
  const axios = await serverAxios();
  const res = await axios.get(`post/author/${authorHandle}/posts?limit=10&offset=0`);
  return res.data;
};

// Fetch book post for independent page of post
export const fetchAuthorPost = async (author_handle: string, public_id: string) => {
  const axios = await serverAxios();
  const res = await axios.get(`post/${author_handle}/post/${public_id}`);
  return res.data;
}


export const fetchAuthorsPosts = async (offset?: number) => {
  const axios = await serverAxios();
  const res = await axios.get(`feed/authors/posts?limit=10&offset=${offset || 0}`);
  return res.data;
}  