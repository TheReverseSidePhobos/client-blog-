import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Form from "../form/Form";

export default function ModalDialog({ open, handleClickOpen, handleClose }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle textAlign="center">
          {!isLogin ? "Registration form" : "Login form"}
        </DialogTitle>
        <DialogContent>
          <Form
            handleClose={handleClose}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
