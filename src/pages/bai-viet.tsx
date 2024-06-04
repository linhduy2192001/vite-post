import { useQueryString } from "../hooks/useQueryString";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
// import { postService } from "../services/postService";
import Row from "../components/Row";
import { IPostData } from "../types/posts.type";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import Paginate from "../components/Pagination";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { usePosts } from "../hooks/use-posts";
import { useDeletePost } from "../hooks/use-delete-post";
import { postsKeys } from "../constants/postsKeys";

const LIMIT = 10;

const Post = () => {
  const queryString: { page?: string } = useQueryString();
  const page = Number(queryString.page) || 1;

  const queryClient = useQueryClient();

  // const { data: posts, isLoading } = useQuery({
  //   queryKey: ["posts", page],
  //   queryFn: () => postService.getPosts(page, LIMIT),
  //   staleTime: 60 * 1000,
  // });
  const { data, isLoading: isPostsLoading } = usePosts({ page, limit: LIMIT });
  const { mutate: deletePost, isPending: isDeletePostPending } =
    useDeletePost();

  const posts = data?.data ?? [];

  // const { mutate: deleteMutationPost } = useMutation({
  //   mutationFn: (id: number | string) => postService.deletePost(id),
  //   onSuccess: () => {
  //     toast.success("Xoá bài viết thành công");
  //     queryClient.invalidateQueries({ queryKey: ["posts", page], exact: true });
  //   },
  // });

  const totalCountPost = Number(data?.headers["x-total-count"]) || 0;
  const totalPage = Math.ceil(totalCountPost / LIMIT);

  const handleDelete = (id: number) => {
    deletePost(id, {
      onSuccess: () => {
        // cập nhật data khi xóa bài viết thành công
        queryClient.invalidateQueries({
          queryKey: postsKeys.list({ page, limit: LIMIT }),
        });
        toast.success("Xoá bài viết thành công");
      },
      onError: () => toast.error("Xoá bài viết thất bại"),
    });
    // deleteMutationPost(id);
  };

  const loading = isPostsLoading || isDeletePostPending;
  return (
    <>
      <h1 className="title">Posts</h1>
      <div className="d-flex ">
        <Link className="btn btn-primary " to="/posts/add">
          Add post
        </Link>
      </div>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">UserId</th>
            <th scope="col">Id</th>
            <th scope="col">Title</th>
            <th scope="col">Body</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <Spin
              className="justify-content-center "
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
          ) : (
            posts?.map((e: JSX.IntrinsicAttributes & IPostData) => (
              <Row key={e.id} {...e} onClick={() => handleDelete(e.id)} />
            ))
          )}
        </tbody>
      </table>
      <Paginate page={page} totalPage={totalPage} />
    </>
  );
};

export default Post;
