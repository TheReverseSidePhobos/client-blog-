import { Dispatch, SetStateAction } from "react";

export const toggleDrawer =
  (setIsOpen: Dispatch<SetStateAction<boolean>>, isOpen: boolean) =>
  (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setIsOpen(!isOpen);
  };
