import { IPostData, Posts } from "./../types/posts.type";
import { POST_API } from "../config/path";
import http from "../utils/http";

export const postService = {
  getPosts(page: number | string, limit: number | string) {
    return http.get<Posts>(POST_API, {
      params: {
        _page: page,
        _limit: limit,
      },
    });
  },
  addPost(post: Omit<IPostData, "id">) {
    return http.post<IPostData>(`${POST_API}`, post);
  },
  getPost(id: number | string) {
    return http.get<IPostData>(`${POST_API}/${id}`);
  },
  updatePost(id: number | string, post: IPostData) {
    return http.put<IPostData>(`${POST_API}/${id}`, post);
  },
  deletePost(id: number | string) {
    return http.delete(`${POST_API}/${id}`);
  },
};
