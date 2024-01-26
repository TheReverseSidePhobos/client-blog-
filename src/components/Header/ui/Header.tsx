"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import ModalDialog from "../../Modal/ui/Modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { setAuth, setUser } from "../../../../store/slices/authSlice";
import Sidebar from "../../Sidebar/ui/Sidebar";
import intl from "react-intl-universal";
import { CircularProgress, IconButton } from "@mui/material";
import {
  EmailWithAvatarProp,
  HeaderProp,
  LoginButtonProp,
} from "../model/types";
import { BoxHeaderStyled, LinkStyled, ToolbarStyled } from "./styled";

const EmailWithAvatar = ({ user, logOut }: EmailWithAvatarProp) => {
  return (
    <>
      <Box mr={2}>
        <IconButton>
          <Avatar alt="Avatar" src={`http://localhost:5001/${user.avatar}`} />
        </IconButton>
      </Box>
      <Typography variant="h6" mt={1.3} mr={1}>
        {user.email}
      </Typography>
      <Button onClick={logOut}> {intl.get("LOGOUT")}</Button>
    </>
  );
};

const LoginButton = ({ handleClick }: LoginButtonProp) => (
  <Button color="inherit" onClick={handleClick}>
    {intl.get("LOGIN")}
  </Button>
);

export default function Header({
  isLoading,
  language,
  setLanguage,
}: HeaderProp) {
  const [open, setOpen] = useState<boolean>(false);
  const { user, isAuth } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleClickOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const logOut = (): void => {
    dispatch(setUser({}));
    dispatch(setAuth(false));
    localStorage.removeItem("userToken");
  };

  return (
    <BoxHeaderStyled>
      <ModalDialog
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
      <AppBar color="transparent" position="static">
        <ToolbarStyled>
          <Box display="flex">
            <Sidebar language={language} setLanguage={setLanguage} />
            <Typography mt={1} variant="h6">
              <LinkStyled color="success" href="/">
                {intl.get("HOME")}
              </LinkStyled>
            </Typography>
            <Typography mt={1} ml={2} variant="h6">
              {isAuth && (
                <LinkStyled color="success" href="/personal">
                  {intl.get("PERSONAL_AREA")}
                </LinkStyled>
              )}
            </Typography>
          </Box>

          <Box display="flex">
            {isLoading ? (
              <CircularProgress />
            ) : user.email ? (
              <EmailWithAvatar user={user} logOut={logOut} />
            ) : (
              <LoginButton handleClick={handleClickOpen} />
            )}
          </Box>
        </ToolbarStyled>
      </AppBar>
    </BoxHeaderStyled>
  );
}
