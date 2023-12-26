"use client";
import React, { useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../../../store";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import {
  addLike,
  getAllLikes,
  getAllLikesByPostId,
} from "../../../API/likeAPI";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { check } from "../../../API/userApi";
import { setAuth, setUser } from "../../../store/slices/authSlice";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { createPost, getAllPostsByUserId } from "../../../API/postAPI";
import { addOneLike, setMyLikes } from "../../../store/slices/likesSlice";
import CircularProgress from "@mui/material/CircularProgress";

import ColorButtons from "@/components/ColorButtons/ColorButtons";
import { addOneMyPosts, setMyPosts } from "../../../store/slices/postsSlice";
import intl from "react-intl-universal";
import { initLocales } from "../locales/initLocales";
import Post from "@/components/Post";

// TODO REMOVE ANY
const Personal = () => {
  const [language, setLanguage] = useState("ru-RU");
  initLocales(language);
  useEffect(() => {
    const lng = localStorage.getItem("lng");

    if (lng) {
      setLanguage(lng);
    } else {
      setLanguage("ru-RU");
    }
    initLocales(language);
  }, []);
  const { user, isAuth, isOpenAuthModal } = useSelector(
    (state: RootState) => state.auth
  );
  const { myPosts } = useSelector((state: RootState) => state.posts);

  const dispatch = useDispatch();
  const [isGettingPosts, setisGettingPosts] = React.useState(false);

  const func = async () => {
    try {
      await getAllPostsByUserId(user.id).then((items) => {
        const myPosts = items.filter((item: any) => item.userId === user.id);
        dispatch(setMyPosts(myPosts));
      });
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

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      check().then((data) => {
        dispatch(setUser(data));
        dispatch(setAuth(true));
      });
    }
  }, []);
  const [selectedColor, setSelectedColor] = useState("#f1e7c5");

  const onSub = async (data: any) => {
    const date = new Date();
    const uniquePostId = Math.floor(Math.random() * 10000) + 1;
    try {
      await createPost(
        uniquePostId,
        data.description,
        data.title,
        user.id,
        date,
        selectedColor,
        0
      ).then((newPost) => {
        dispatch(addOneMyPosts(newPost));
        func();
      });
    } catch (e) {
      console.log(e);
      alert("Something went wrong!");
    } finally {
      reset();
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,

    formState: { isDirty, dirtyFields, touchedFields, errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const title = watch("title");
  const description = watch("description");
  const onSubmit = (data: any) => {
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
    "#fc8900",
  ];
  const { myLikes } = useSelector((state: RootState) => state.likes);

  const getAllLikesByPostIdHnadler = async (uniquePostId: number) => {
    try {
      await getAllLikesByPostId(uniquePostId).then((likes) =>
        dispatch(setMyLikes(likes))
      );
    } catch (error) {}
  };
  const getAllLikesHandler = async () => {
    try {
      await getAllLikes().then((likes) => dispatch(setMyLikes(likes)));
    } catch (error) {}
  };
  const addLikeHandler = async (uniquePostId: number) => {
    try {
      await addLike(uniquePostId, user.id, user.email).then((like) => {
        dispatch(addOneLike(like));
        getAllLikesHandler();
      });
    } catch (e) {
      alert("Something went wrong!");
    }
  };
  React.useEffect(() => {
    // getAllLikesByPostIdHnadler(post.uniquePostId);
    getAllLikesHandler();
  }, []);

  return (
    <Provider store={store}>
      <Header />
      <Box className="wrapper">
        <Container>
          <h2 style={{ marginTop: "24px", textAlign: "center" }}>
            {intl.get("PERSONAL_AREA")}
          </h2>
          {isGettingPosts && <CircularProgress />}
          <Typography textAlign="center">
            {intl.get("ALL_YOUR_POSTS")}
          </Typography>
          {myPosts &&
            myPosts.map((item: any, id) => (
              <Post
                key={id}
                myLikes={myLikes.filter(
                  (like) => like.uniquePostId === item.uniquePostId
                )}
                getAllLikesHandler={getAllLikesHandler}
                addLikeHandler={addLikeHandler}
                post={item}
              />
            ))}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" justifyContent="center" flexDirection="column">
              <TextField
                margin="normal"
                {...register("title")}
                id="title"
                label="Title"
                variant="outlined"
                helperText={
                  touchedFields.title && !title
                    ? "is required"
                    : "make up new title"
                }
                error={touchedFields.title && !title}
              />
              <TextField
                margin="normal"
                {...register("description")}
                id="description"
                label="Description"
                variant="outlined"
                multiline
                maxRows={5}
                error={touchedFields.description && !description}
                helperText={
                  touchedFields.title && !title
                    ? "is required"
                    : "type here what you did today"
                }
              />
              <Box display="flex">
                {colorArr.map((item, id) => (
                  <ColorButtons
                    key={id}
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
