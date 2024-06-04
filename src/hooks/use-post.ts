import { useQuery } from "@tanstack/react-query";
import { postsKeys } from "../constants/postsKeys";
import { postService } from "../services/postService";

export const usePost = (id?: number) => {
  return useQuery({
    queryKey: postsKeys.detail(id!),
    queryFn: () => postService.getPost(id!),
    enabled: Boolean(id),
  });
};
