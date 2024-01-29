import { getAllPosts } from "../../API/postAPI";
import { setAllPosts } from "../../store/slices/postsSlice";
import { addLike, getAllLikes } from "../../API/likeAPI";
import { addOneLike, setMyLikes } from "../../store/slices/likesSlice";
import { getAllPostsByUserId } from "../../API/postAPI";
import { setMyPosts } from "../../store/slices/postsSlice";
import { NULL, RUSSIAN } from "./constants";
import { initLocales } from "./locales/initLocales";
import { UserProp } from "@/components/Header/model/types";
import { $host } from "../../API";

export const fetcher = (url: string) => $host.get(url).then((res) => res.data);

export const getAllLikesHandler = async (dispatch: any) => {
  try {
    await getAllLikes().then((likes) => dispatch(setMyLikes(likes)));
  } catch (error) {}
};
export const addLikeHandler = async (
  uniquePostId: number,
  user: UserProp,
  dispatch: any
) => {
  try {
    await addLike(uniquePostId, user.id, user.email).then((like) => {
      dispatch(addOneLike(like));
      getAllLikesHandler(dispatch);
    });
  } catch (e) {
    alert("Something went wrong!");
  }
};

export const getPostsByUserId = async (
  setisGettingPosts: (isGettingPosts: boolean) => void,
  dispatch: any,
  user: UserProp
) => {
  try {
    await getAllPostsByUserId(user.id).then((items: any) => {
      const myPosts = items.filter((item: any) => item.userId === user.id);
      dispatch(setMyPosts(myPosts));
    });
  } catch (error) {
    alert("Something went wrong!");
  } finally {
    setisGettingPosts(false);
  }
};

export const makeFormDataPost = (
  data: any,
  date: any,
  uniquePostId: any,
  user: any,
  file: any,
  selectedColor: string
) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("date", date);
  formData.append("uniquePostId", uniquePostId);
  formData.append("userId", user.id);
  if (file) {
    formData.append("img", file);
  }
  formData.append("selectedColor", selectedColor);
  if (NULL) {
    formData.append("countLikes", NULL);
  }
  return formData;
};

export const getLNG = (
  language: string,
  setLanguage: (language: string) => void
): void => {
  const lng = localStorage.getItem("lng");
  if (lng) {
    setLanguage(lng);
  } else {
    setLanguage(RUSSIAN);
  }
  initLocales(language);
};
