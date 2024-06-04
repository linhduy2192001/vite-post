import { useMutation } from "@tanstack/react-query";
import { postService } from "../services/postService";

export const useDeletePost = () => {
  return useMutation({
    mutationFn: (id: number) => postService.deletePost(id),
  });
};
