import { PostProp } from "@/components/Post/model/types";
import { $authHost, $host } from "./index";

export async function createPost(post: any) {
  const { data } = await $host.post("api/post/create", post);
  return data;
}
export const getAllPosts = async () => {
  const { data } = await $host.get("api/post/getAllPosts");
  return data;
};
export const deletePostAPI = (id: PostProp) =>
  $authHost.delete("/api/post/" + id.id);
