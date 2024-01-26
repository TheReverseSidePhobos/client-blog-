import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Form from "../../Form/ui/Form";
import intl from "react-intl-universal";
import { ModalDialogProp } from "../model/types";

export default function ModalDialog({
  open,
  handleClickOpen,
  handleClose,
}: ModalDialogProp) {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <>
      <Dialog fullWidth open={open} onClose={handleClose}>
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
