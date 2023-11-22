"use client";
import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { registration, login } from "../../../API/userApi";

const Form = () => {
  const onSub = async (data) => {
    try {
      let userdata;
      if (false) {
        userdata = await login(data.email, data.password);
      } else {
        userdata = await registration(data.email, data.password);
      }
    } catch (e) {
      console.log(e);
      //error
      alert("Something went wrong!");
    }
  };
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => onSub(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register("email")}
        id="email"
        label="Email"
        variant="outlined"
      />
      <TextField
        {...register("password")}
        id="password"
        label="Password"
        variant="outlined"
      />

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Form;
