"use client";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import { registration, login } from "../../../API/userApi";
import { useDispatch } from "react-redux";
import { setAuth, setUser } from "../../../store/slices/authSlice";
import { useState } from "react";

const Form = ({ handleClose, isLogin, setIsLogin }) => {
  const dispatch = useDispatch();
  const onSub = async (data) => {
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
  const onSubmit = (data) => onSub(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" justifyContent="center" flexDirection="column">
        <TextField
          margin="normal"
          {...register("email")}
          id="email"
          label="Email"
          variant="outlined"
        />
        <TextField
          margin="normal"
          {...register("password")}
          id="password"
          label="Password"
          variant="outlined"
        />

        <Button
          sx={{ my: "10px" }}
          color="success"
          variant="contained"
          type="submit"
        >
          Submit
        </Button>

        <Button
          sx={{ my: "10px" }}
          variant="contained"
          color="primary"
          onClick={handleChangeModal}
        >
          {isLogin ? "Go to registration" : "already have an acc?"}
        </Button>
      </Box>
    </form>
  );
};

export default Form;
