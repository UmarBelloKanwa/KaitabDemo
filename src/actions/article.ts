import serverAxios from "@/actions/server-axios";

export const getAuthorArticle = async (author_handle: string, articleId: string) => {
  const api = await serverAxios();
  const res = await api.get(`/article/${author_handle}/articles/${articleId}`);
  return res.data;
}


