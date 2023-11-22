"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ModalDialog from "../Modal/Modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setAuth, setUser } from "../../../store/slices/authSlice";

export default function Header() {
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
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blog
          </Typography>
          {user.email ? (
            <>
              <Typography>{user.email}</Typography>
              <Button onClick={logOut}>log out</Button>
            </>
          ) : (
            <Button color="inherit" onClick={handleClickOpen}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
