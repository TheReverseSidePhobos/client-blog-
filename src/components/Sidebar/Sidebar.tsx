import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

import Divider from "@mui/material/Divider";

import { IconButton, Typography } from "@mui/material";

import intl from "react-intl-universal";
import LanguageIcon from "@mui/icons-material/Language";

export interface SidebarProp {
  setLanguage?: (language: string) => void;
}

export default function Sidebar({ setLanguage }: SidebarProp) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setIsOpen(!isOpen);
    };

  const list = () => (
    <Box
      width={250}
      mt={2}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Typography textAlign="center">{intl.get("SELECT_LANGUAGE")}</Typography>
      <Box display="flex" justifyContent="space-between">
        <Button
          fullWidth
          onClick={() => {
            localStorage.setItem("lng", "en-US");
            if (setLanguage) {
              setLanguage("en-US");
            }
          }}
        >
          eng
        </Button>
        <Button
          fullWidth
          onClick={() => {
            localStorage.setItem("lng", "ru-RU");
            if (setLanguage) {
              setLanguage("ru-RU");
            }
          }}
        >
          ru
        </Button>
      </Box>
      <Divider />
    </Box>
  );

  return (
    <div>
      <>
        <IconButton
          onClick={toggleDrawer(true)}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <LanguageIcon color="info" />
        </IconButton>
        <Drawer open={isOpen} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </>
    </div>
  );
}
