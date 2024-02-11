import { likeProp } from "@/app/types";
import { PostProp } from "@/components/Post/model/types";

export interface PostCarProp {
  post: PostProp;
  isForAllUsers: boolean | undefined;
  deleteHandler: any;
  postLikes: Array<likeProp> | any;
  toolTipTitle: string | undefined;
}

export interface userMadePostDataProp {
  avatar: string;
  createdAt: string;
  email: string;
  id: number;
  password: string;
  role: string;
  updatedAt: string;
}
