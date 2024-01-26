import { $host } from "./index";

export const addLike = async (
  uniquePostId: number,
  userId: number,
  userEmail: string
) => {
  const { data } = await $host.post("api/like/create", {
    uniquePostId,
    userId,
    userEmail,
  });
  return data;
};
export const deleteLike = async (uniquePostId: number, userId: number) => {
  const { data } = await $host.post("api/like/delete", {
    uniquePostId,
    userId,
  });
  return data;
};
export const getAllLikes = async () => {
  const { data } = await $host.get("api/like/getAllLikes");
  return data;
};
export const getAllLikesByPostId = async (uniquePostId: number) => {
  const { data } = await $host.get(
    "api/like/getAllLikesByPostId/" + uniquePostId
  );

  return data;
};
