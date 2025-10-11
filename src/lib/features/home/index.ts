import { api } from "@/lib/axios";


export const fetchPosts = async () => api.get("post/books-posts?limit=10&offset=0");

export const fetchRobooks = () => api.get("book/robooks");
