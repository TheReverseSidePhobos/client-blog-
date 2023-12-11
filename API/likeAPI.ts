import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const addLike = async (
  postId: number,
  userId: number,
  userEmail: string
) => {
  const { data } = await $host.post("api/like/create", {
    postId,
    userId,
    userEmail,
  });
};
export const getAllLikesByPostId = async (postId: number) => {
  const { data } = await $host.get("api/like/getAllLikesByPostId/" + postId);

  return data;
};
