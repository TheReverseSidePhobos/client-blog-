import { likeProp } from "@/app/types";
import { $host } from "./index";

export const getAllLikes = async () => {
  const { data } = await $host.get("api/like/getAllLikes");
  return data;
};

export async function deleteLike(like: likeProp): Promise<likeProp> {
  const { data } = await $host.post("api/like/delete", like);
  return data;
}
export async function createLike(like: likeProp): Promise<likeProp> {
  const { data } = await $host.post("api/like/create", like);
  return data;
}
