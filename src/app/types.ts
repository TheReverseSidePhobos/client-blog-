export interface likeProp {
  id: number;
  postId?: number;
  uniquePostId: number;
  userEmail: string;
  userId: number;
  [propName: string]: any;
}
export interface UserProp {
  email: string;
  exp: Date;
  iat: Date;
  id: number;
  role: string;
  avatar?: string;
}
