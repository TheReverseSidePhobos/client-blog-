import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Form from "../form/Form";
import intl from "react-intl-universal";

export interface ModalDialogProp {
  open: boolean;
  handleClickOpen: any;
  handleClose: any;
}

export default function ModalDialog({
  open,
  handleClickOpen,
  handleClose,
}: ModalDialogProp) {
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
          {!isLogin
            ? intl.get("REGISTRATION_FORM_TITLE")
            : intl.get("LOGIN_FORM_TITLE")}
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
