import { likeProp } from "@/app/types";

export interface PostProp {
  id: number;
  color: string;
  countLikes?: number;
  description: string;
  dueDate?: Date;
  img: string;
  title: string;
  uniquePostId: number;
  userId: number;
  [propName: string]: any;
}
export interface CardComponentProp {
  postLikes?: Array<likeProp>;
  post: PostProp;
  isForAllUsers?: boolean;
}
