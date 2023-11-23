"use client";
import React, { useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../../../store";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import {
  Box,
  Button,
  Container,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { check } from "../../../API/userApi";
import { setAuth, setUser } from "../../../store/slices/authSlice";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { createPost, getAllPostsByUserId } from "../../../API/postAPI";

import CircularProgress from "@mui/material/CircularProgress";
import CardComponent from "@/components/Post/Post";
import { BoxColorStyled } from "./styled";
import ColorButtons from "@/components/ColorButtons/ColorButtons";
const Personal = () => {
  const { user, isAuth, isOpenAuthModal } = useSelector(
    (state: RootState) => state.auth
  );
  const [posts, setposts] = React.useState([]);
  const [isGettingPosts, setisGettingPosts] = React.useState(false);
  const func = async () => {
    try {
      await getAllPostsByUserId(user.id).then((items) => setposts(items));
    } catch (error) {
      alert("Something went wrong!");
    } finally {
      setisGettingPosts(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userToken") || isAuth) {
      func();
    } else {
      redirect("/");
    }
  }, [isAuth]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      check().then((data) => {
        dispatch(setUser(data));
        dispatch(setAuth(true));
      });
    }
  }, []);
  const [selectedColor, setSelectedColor] = useState("#f1e7c5");

  const onSub = async (data) => {
    const date = new Date();

    try {
      debugger;
      await createPost(
        data.description,
        data.title,
        user.id,
        date,
        selectedColor,
        0
      );
    } catch (e) {
      console.log(e);
      alert("Something went wrong!");
    }
  };

  const { register, handleSubmit, watch } = useForm();
  const title = watch("title");
  const description = watch("description");
  const onSubmit = (data) => {
    onSub(data);
  };
  const colorArr = [
    "#f1e7c5",
    "#f0c3b9",
    "#bfefc5",
    "#b4d4ee",
    "#e9e88e",
    "#179c98",
    "#ea98d6",
    "#cacaca",
    "#16bb44",
    "#ea200b",
    "#163471",
  ];
  return (
    <Provider store={store}>
      <Header />
      <Box className="wrapper">
        <Container>
          <h2 style={{ marginTop: "24px", textAlign: "center" }}>
            Personal area
          </h2>
          {isGettingPosts && <CircularProgress />}
          <Typography textAlign="center">ALL YOUR POSTS</Typography>
          {posts &&
            posts.map((item, id) => (
              <>
                <CardComponent post={item} />
              </>
            ))}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" justifyContent="center" flexDirection="column">
              <TextField
                margin="normal"
                {...register("title")}
                id="title"
                label="Title"
                variant="outlined"
              />
              <TextField
                margin="normal"
                {...register("description")}
                id="description"
                label="Description"
                variant="outlined"
              />
              <Box display="flex">
                {colorArr.map((item, id) => (
                  <ColorButtons
                    setSelectedColor={setSelectedColor}
                    selectedColor={selectedColor}
                    item={item}
                  />
                ))}
              </Box>

              <Button
                disabled={!title || !description}
                onClick={() => {
                  setisGettingPosts(true);
                  window.location.reload();
                }}
                sx={{ my: "10px" }}
                color="success"
                variant="contained"
                type="submit"
              >
                Share
              </Button>
            </Box>
          </form>
        </Container>
        <Box className="footer">
          <Footer />
        </Box>
      </Box>
    </Provider>
  );
};

export default Personal;