"use client";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { registration, login } from "../../../../API/userApi";
import { useDispatch } from "react-redux";
import { setAuth, setUser } from "../../../../store/slices/authSlice";
import intl from "react-intl-universal";
import { useRef, useState } from "react";
import DropzoneComponent from "../../Dropzone/ui/DropzoneComponent";
import {
  BoxFormStyled,
  ButtonChangeModalStyled,
  ButtonSubmitStyled,
} from "./styled";
import { FormProp, dataProp } from "../lib/types";

const Form = ({ handleClose, isLogin, setIsLogin }: FormProp) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const filePickerRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  const makeFormData = (data: dataProp) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("role", "ADMIN");
    if (avatar) {
      formData.append("avatar", avatar);
    }
    return formData;
  };

  const handleChangeModal = () => {
    setIsLogin(!isLogin);
  };
  const onSubmit = async (data: any) => {
    const formData = makeFormData(data);
    try {
      let userdata;
      if (isLogin) {
        userdata = await login(data.email, data.password);
      } else {
        userdata = await registration(formData);
      }

      dispatch(setUser(userdata));
      dispatch(setAuth(true));
      handleClose();
    } catch (e) {
      console.log(e);
      alert("Something went wrong!");
    }
  };
  const handleChangeFile = (e: any) => {
    setAvatar(e.target.files[0]);
  };

  const handleDownloadClick = () => {
    if (filePickerRef.current) {
      filePickerRef?.current.click();
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BoxFormStyled>
        <TextField
          margin="normal"
          {...register("email")}
          id="email"
          label={intl.get("EMAIL")}
          variant="outlined"
        />
        <TextField
          type="password"
          autoComplete="false"
          margin="normal"
          {...register("password")}
          id="password"
          label={intl.get("PASSWORD")}
          variant="outlined"
        />
        <DropzoneComponent
          filePickerRef={filePickerRef}
          handleChangeFile={handleChangeFile}
          handleDownloadClick={handleDownloadClick}
        />
        <ButtonSubmitStyled color="success" variant="contained" type="submit">
          {intl.get("SUBMIT")}
        </ButtonSubmitStyled>

        <ButtonChangeModalStyled
          variant="contained"
          color="primary"
          onClick={handleChangeModal}
        >
          {isLogin ? intl.get("GO_TO_REG") : intl.get("ALREADY_HAVE_ACC")}
        </ButtonChangeModalStyled>
      </BoxFormStyled>
    </form>
  );
};

export default Form;
