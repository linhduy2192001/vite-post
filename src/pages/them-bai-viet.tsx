import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useMatch, useNavigate, useParams } from "react-router-dom";
// import { postService } from "../services/postService";
import { IPostData } from "../types/posts.type";
import { toast } from "react-toastify";
import { useAddPost } from "../hooks/use-add-post";
import { Post } from "../types/Post";
import { useUpdatePost } from "../hooks/use-update-post";
import { postsKeys } from "../constants/postsKeys";
import { usePost } from "../hooks/use-post";

type FormStateType = Omit<IPostData, "id"> | IPostData;

const initialFormState: FormStateType = {
  body: "",
  title: "",
  userId: 0,
};

const AddPost = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState<FormStateType>(initialFormState);
  const addMatch = useMatch("/posts/add");
  const isAddMode = Boolean(addMatch);

  const { id } = useParams();

  const queryClient = useQueryClient();
  const {
    data,
    isLoading: isPostLoading,
    isError: isPostError,
    error: postError,
  } = usePost(Number(id));
  const { mutate: addPost, isPending: isAddPostPending } = useAddPost();
  const { mutate: updatePost, isPending: isUpdatePostPending } =
    useUpdatePost();

  // const {
  //   mutate: addMutationPost,
  //   data,
  //   reset,
  // } = useMutation({
  //   mutationFn: (body: FormStateType) => postService.addPost(body),
  // });

  // const { data: postData } = useQuery({
  //   queryKey: ["post", id],
  //   enabled: id !== undefined,
  //   queryFn: () => postService.getPost(id as string),
  // });

  useEffect(() => {
    if (data?.data) {
      setFormState(data.data);
    }
  }, [data?.data]);

  // const { mutate: updateMutatePost } = useMutation({
  //   mutationFn: (_) =>
  //     postService.updatePost(id as string, formState as IPostData),
  //   onSuccess: (data) => {
  //     queryClient.setQueryData(["post", id], data);
  //   },
  // });

  const handleChange =
    (name: keyof FormStateType) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({ ...prev, [name]: e.target.value }));
      // if (data) {
      //   reset();
      // }
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isAddMode) {
      addPost(formState as Post, {
        onSuccess: () => {
          // cập nhật data khi xóa bài viết thành công
          queryClient.invalidateQueries({ queryKey: postsKeys.all });
          toast.success("Thêm bài viết thành công!");
        },
        onError: () => toast.error("Thêm bài viết thất bại"),
      });
      // addMutationPost(formState, {
      //   onSuccess: () => {
      //     setFormState(initialFormState);
      //     toast.success("Thêm bài viết thành công!");
      //   },
      // });
    } else {
      updatePost(
        { id: Number(id!), post: formState as Post },
        {
          onSuccess: () => {
            // cập nhật data khi xóa bài viết thành công
            queryClient.invalidateQueries({ queryKey: postsKeys.all });
            toast.success("Update thành công!");
            // điều này là để chuyển đến trang bài viết
            navigate("/posts");
          },
          onError: () => toast.error("Update thất bại"),
        }
      );
      // updateMutatePost(undefined, {
      //   onSuccess: () => {
      //     queryClient.invalidateQueries({ queryKey: ["post"] });
      //     toast.success("Update thành công!");
      //   },
      // });
    }
  };

  const loading = isAddPostPending || isUpdatePostPending || isPostLoading;

  if (loading) return <div>Loading...</div>;
  if (isPostError) return <div>Error: {postError.message}</div>;

  return (
    <div>
      <h1>{isAddMode ? "Add" : "Edit"} Post</h1>
      <form
        className="d-flex flex-column justify-content-center w-50 p-3"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">UserId</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Userid"
            value={formState?.userId}
            onChange={handleChange("userId")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Title"
            value={formState?.title}
            onChange={handleChange("title")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Body</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Body"
            value={formState?.body}
            onChange={handleChange("body")}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          {isAddMode ? "Add" : "Update"}
        </button>
      </form>
    </div>
  );
};

export default AddPost;
