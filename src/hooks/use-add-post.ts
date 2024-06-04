import { useMutation } from "@tanstack/react-query";
import { Post } from "../types/Post";
import { postService } from "../services/postService";

export const useAddPost = () => {
  return useMutation({
    mutationFn: (post: Post) => postService.addPost(post),
  });
};
