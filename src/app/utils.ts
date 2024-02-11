import { NULL, RUSSIAN } from "./constants";
import { initLocales } from "./locales/initLocales";

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
