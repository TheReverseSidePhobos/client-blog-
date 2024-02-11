import { UserProp } from "@/app/types";

export interface HeaderProp {
  isLoading?: boolean;
  language: string;
  setLanguage?: (language: string) => void;
}

export interface EmailWithAvatarProp {
  user: UserProp;
  logOut: () => void;
}

export interface LoginButtonProp {
  handleClick: () => void;
}
