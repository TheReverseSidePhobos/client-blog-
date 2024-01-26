export interface SidebarProp {
  language: string;
  setLanguage?: (language: string) => void;
}

export interface ListProp {
  language: string;
  toggleDrawer: any;
  setLanguage?: (language: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
}
