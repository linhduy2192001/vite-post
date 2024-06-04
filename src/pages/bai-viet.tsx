import { useQueryString } from "../hooks/useQueryString";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postService } from "../services/postService";
import Row from "../components/Row";
import { IPostData } from "../types/posts.type";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import Paginate from "../components/Pagination";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const LIMIT = 10;

const Post = () => {
  const queryString: { page?: string } = useQueryString();
  const page = Number(queryString.page) || 1;

  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => postService.getPosts(page, LIMIT),
    staleTime: 60 * 1000,
  });

  const { mutate: deleteMutationPost } = useMutation({
    mutationFn: (id: number | string) => postService.deletePost(id),
    onSuccess: () => {
      toast.success("Xoá bài viết thành công");
      queryClient.invalidateQueries({ queryKey: ["posts", page], exact: true });
    },
  });

  const totalCountPost = Number(posts?.headers["x-total-count"]) || 0;
  const totalPage = Math.ceil(totalCountPost / LIMIT);

  const handleDelete = (id: number) => {
    deleteMutationPost(id);
  };
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
          {isLoading ? (
            <Spin
              className="justify-content-center "
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            />
          ) : (
            posts?.data.map((e: JSX.IntrinsicAttributes & IPostData) => (
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
