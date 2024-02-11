import { getUserById } from "../../../../API/userApi";
import { userMadePostDataProp } from "../model/types";

export const getUserWhoMadePost = async (
  userId: number,
  setUserMadePostData: (userMadePostData: userMadePostDataProp | null) => void
) => {
  try {
    await getUserById(userId).then((userData) => {
      setUserMadePostData(userData);
    });
  } catch (e) {
    alert("Something went wrong!");
  }
};
