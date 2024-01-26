export interface PostCarProp {
  post: any;
  isForAllUsers: any;
  deleteHandler: any;
  myLikes: any;
  toolTipTitle: any;
  likeClickHandler: any;
}

export interface userMadePostDataProp {
  avatar: string;
  createdAt: string;
  email: string;
  id: number;
  password: string; // ?? какого хрена здесь пароль
  role: string;
  updatedAt: string;
}
