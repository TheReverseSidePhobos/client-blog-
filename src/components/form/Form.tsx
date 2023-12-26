"use client";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import { registration, login } from "../../../API/userApi";
import { useDispatch } from "react-redux";
import { setAuth, setUser } from "../../../store/slices/authSlice";
import intl from "react-intl-universal";

export interface FormProp {
  handleClose: any;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}
export interface dataProp {
  email: string;
  password: string;
}

const Form = ({ handleClose, isLogin, setIsLogin }: FormProp) => {
  const dispatch = useDispatch();
  const onSub = async (data: dataProp) => {
    try {
      let userdata;
      if (isLogin) {
        userdata = await login(data.email, data.password);
      } else {
        userdata = await registration(data.email, data.password);
      }
      dispatch(setUser(userdata));
      dispatch(setAuth(true));
      handleClose();
    } catch (e) {
      console.log(e);
      alert("Something went wrong!");
    }
  };
  const handleChangeModal = () => {
    setIsLogin(!isLogin);
  };
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => onSub(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" justifyContent="center" flexDirection="column">
        <TextField
          margin="normal"
          {...register("email")}
          id="email"
          label={intl.get("EMAIL")}
          variant="outlined"
        />
        <TextField
          type="password"
          margin="normal"
          {...register("password")}
          id="password"
          label={intl.get("PASSWORD")}
          variant="outlined"
        />

        <Button
          sx={{ my: "10px" }}
          color="success"
          variant="contained"
          type="submit"
        >
          {intl.get("SUBMIT")}
        </Button>

        <Button
          sx={{ my: "10px" }}
          variant="contained"
          color="primary"
          onClick={handleChangeModal}
        >
          {isLogin ? intl.get("GO_TO_REG") : intl.get("ALREADY_HAVE_ACC")}
        </Button>
      </Box>
    </form>
  );
};

export default Form;
