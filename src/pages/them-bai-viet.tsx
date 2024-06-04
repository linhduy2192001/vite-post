import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useMatch, useParams } from "react-router-dom";
import { postService } from "../services/postService";
import { IPostData } from "../types/posts.type";
import { toast } from "react-toastify";

type FormStateType = Omit<IPostData, "id"> | IPostData;

const initialFormState: FormStateType = {
  body: "",
  title: "",
  userId: 0,
};

const AddPost = () => {
  const [formState, setFormState] = useState<FormStateType>(initialFormState);
  const addMatch = useMatch("/posts/add");
  const isAddMode = Boolean(addMatch);

  const { id } = useParams();

  const queryClient = useQueryClient();

  const {
    mutate: addMutationPost,
    data,
    reset,
  } = useMutation({
    mutationFn: (body: FormStateType) => postService.addPost(body),
  });

  const { data: postData } = useQuery({
    queryKey: ["post", id],
    enabled: id !== undefined,
    queryFn: () => postService.getPost(id as string),
  });

  useEffect(() => {
    if (postData?.data) {
      setFormState(postData?.data);
    }
  }, [postData?.data]);

  const { mutate: updateMutatePost } = useMutation({
    mutationFn: (_) =>
      postService.updatePost(id as string, formState as IPostData),
    onSuccess: (data) => {
      queryClient.setQueryData(["post", id], data);
    },
  });

  const handleChange =
    (name: keyof FormStateType) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({ ...prev, [name]: e.target.value }));
      if (data) {
        reset();
      }
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isAddMode) {
      addMutationPost(formState, {
        onSuccess: () => {
          setFormState(initialFormState);
          toast.success("Thêm bài viết thành công!");
        },
      });
    } else {
      updateMutatePost(undefined, {
        onSuccess: () => {
          toast.success("Update thành công!");
        },
      });
    }
  };
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
