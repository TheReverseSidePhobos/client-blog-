export interface HeaderProp {
  isLoading?: boolean;
  language: string;
  setLanguage?: (language: string) => void;
}

export interface UserProp {
  email: string;
  exp: Date;
  iat: Date;
  id: number;
  role: string;
  avatar?: string;
}

export interface EmailWithAvatarProp {
  user: UserProp;
  logOut: () => void;
}

export interface LoginButtonProp {
  handleClick: () => void;
}
