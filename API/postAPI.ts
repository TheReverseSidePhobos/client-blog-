import { $authHost, $host } from "./index";

export const createPost = async (post: any) => {
  const { data } = await $host.post("api/post/create", post);
  return data;
};

export const getAllPostsByUserId = async (userId: number) => {
  const { data } = await $host.get("api/post/getAllByUserId/" + userId);
  return data;
};
export const getAllPosts = async () => {
  const { data } = await $host.get("api/post/getAllPosts");
  return data;
};
export const deletePost = async (id: number) => {
  const { data } = await $authHost.delete("/api/post/" + id);
  return data;
};

export const addLike = async (id: number, countLikes: number) => {
  const cl = countLikes + 1;
  const { data } = await $authHost.put("/api/post/updatePostById/" + id, {
    cl,
  });

  return data;
};
