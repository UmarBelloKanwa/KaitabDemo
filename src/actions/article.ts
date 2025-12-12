import serverAxios from "@/actions/server-axios";

export const getAuthorArticle = async (author_handle: string, articleId: string) => {
  const api = await serverAxios();
  const res = await api.get(`/article/${author_handle}/articles/${articleId}`);
  return res.data;
}


export const getArticlesPreviews = async (pageParam?: string) => {
  const api = await serverAxios();
  const res = await api.get(`/feed/articles?limit=10&offset=${pageParam ?? 0}`);
  return res.data;
}
