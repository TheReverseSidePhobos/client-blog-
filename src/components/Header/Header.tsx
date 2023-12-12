"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import ModalDialog from "../Modal/Modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setAuth, setUser } from "../../../store/slices/authSlice";
import Link from "next/link";
import Sidebar from "../Sidebar/Sidebar";
import intl from "react-intl-universal";
import { CircularProgress } from "@mui/material";

export interface HeaderProp {
  setLanguage?: (language: string) => void;
}

export default function Header({ setLanguage }: HeaderProp) {
  const [open, setOpen] = useState(false);
  const { user, isAuth, isOpenAuthModal } = useSelector(
    (state: RootState) => state.auth
  );
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(setUser({}));
    dispatch(setAuth(false));
    localStorage.removeItem("userToken");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ModalDialog
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
      <AppBar color="transparent" position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box display="flex">
            <Sidebar setLanguage={setLanguage} />

            <Typography mt={1} variant="h6">
              <Link
                style={{
                  textDecoration: "none",
                }}
                color="success"
                href="/"
              >
                {intl.get("HOME")}
              </Link>
            </Typography>
            <Typography mt={1} ml={2} variant="h6">
              {isAuth && (
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                  color="success"
                  href="/personal"
                >
                  {intl.get("PERSONAL_AREA")}
                </Link>
              )}
            </Typography>
          </Box>

          <Box display="flex">
            {user.email ? (
              <>
                <Typography variant="h6" mr={1}>
                  {user.email}
                </Typography>
                <Button onClick={logOut}> {intl.get("LOGOUT")}</Button>
              </>
            ) : !isAuth && !user ? (
              <CircularProgress />
            ) : (
              <Button color="inherit" onClick={handleClickOpen}>
                {intl.get("LOGIN")}
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
