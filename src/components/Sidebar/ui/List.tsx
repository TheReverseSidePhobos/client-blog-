import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import intl from "react-intl-universal";
import { ListProp } from "../model/types";
import { ENGLISH, RUSSIAN } from "@/app/constants";

const List = ({
  language,
  toggleDrawer,
  setLanguage,
  setIsOpen,
  isOpen,
}: ListProp) => (
  <Box
    width={250}
    mt={2}
    role="presentation"
    onClick={toggleDrawer(setIsOpen, isOpen)}
    onKeyDown={toggleDrawer(setIsOpen, isOpen)}
  >
    <Typography textAlign="center">{intl.get("SELECT_LANGUAGE")}</Typography>
    <Box display="flex" justifyContent="space-between">
      <Button
        variant="contained"
        color={language === ENGLISH ? "primary" : "inherit"}
        fullWidth
        onClick={() => {
          localStorage.setItem("lng", ENGLISH);
          if (setLanguage) {
            setLanguage(ENGLISH);
          }
        }}
      >
        {intl.get("LANGUAGE_ENG")}
      </Button>
      <Button
        variant="contained"
        color={language === RUSSIAN ? "primary" : "inherit"}
        fullWidth
        onClick={() => {
          localStorage.setItem("lng", RUSSIAN);
          if (setLanguage) {
            setLanguage(RUSSIAN);
          }
        }}
      >
        {intl.get("LANGUAGE_RU")}
      </Button>
    </Box>
    <Divider />
  </Box>
);

export default List;
