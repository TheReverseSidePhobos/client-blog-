import * as React from "react";
import Drawer from "@mui/material/Drawer";

import { SidebarProp } from "../model/types";
import { toggleDrawer } from "../lib";
import { IconButtonStyled, LanguageIconStyled } from "./styled";
import List from "./List";

export default function Sidebar({ language, setLanguage }: SidebarProp) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <>
      <IconButtonStyled
        onClick={toggleDrawer(setIsOpen, isOpen)}
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
      >
        <LanguageIconStyled color="info" />
      </IconButtonStyled>
      <Drawer open={isOpen} onClose={toggleDrawer(setIsOpen, isOpen)}>
        <List
          language={language}
          toggleDrawer={toggleDrawer}
          setLanguage={setLanguage}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
      </Drawer>
    </>
  );
}
