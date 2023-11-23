import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const createPost = async (
  description: string,
  title: string,
  userId: number,
  dueDate: Date,
  color: string,
  countLikes: number
) => {
  const { data } = await $host.post("api/post/create", {
    description,
    title,
    userId,
    dueDate,
    color,
    countLikes,
  });
};

export const getAllPostsByUserId = async (userId: number) => {
  const { data } = await $host.get("api/post/getAllByUserId/" + userId);
  return data;
};

export const deletePost = async (id: number) => {
  const { data } = await $authHost.delete("/api/post/" + id);
  return data;
};

export const addLike = async (id: number, countLikes: number) => {
  debugger;
  const cl = countLikes + 1;
  const { data } = await $authHost.put("/api/post/updatePostById/" + id, {
    cl,
  });
  debugger;
  return data;
};
