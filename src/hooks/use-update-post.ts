import { useMutation } from "@tanstack/react-query";
import { postService } from "../services/postService";
import { Post } from "../types/Post";

interface Variables {
  id: number;
  post: Partial<Post>;
}

export const useUpdatePost = () => {
  return useMutation({
    mutationFn: (variables: Variables) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      postService.updatePost(variables.id, variables.post as any),
  });
};
