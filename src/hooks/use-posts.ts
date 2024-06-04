import { useQuery } from "@tanstack/react-query";
import { postsKeys } from "../constants/postsKeys";
import { postService } from "../services/postService";

interface UsePostsProps {
  page?: number;
  limit?: number;
}

export const usePosts = ({ page = 1, limit = 10 }: UsePostsProps = {}) => {
  return useQuery({
    queryKey: postsKeys.list({ page, limit }),
    queryFn: () => postService.getPosts(page, limit),
  });
};
