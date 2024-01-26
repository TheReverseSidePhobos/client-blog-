"use client";
import React, { useRef, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../../../store";
import Header from "@/components/Header/ui/Header";
import Footer from "@/components/Footer/ui/Footer";
import { addLike, getAllLikes } from "../../../API/likeAPI";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { check } from "../../../API/userApi";
import { setAuth, setUser } from "../../../store/slices/authSlice";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { createPost } from "../../../API/postAPI";
import { addOneLike, setMyLikes } from "../../../store/slices/likesSlice";
import CircularProgress from "@mui/material/CircularProgress";
import ColorButtons from "@/components/ColorButtons/ui/ColorButtons";
import { addOneMyPosts } from "../../../store/slices/postsSlice";
import intl from "react-intl-universal";
import { initLocales } from "../locales/initLocales";
import Post from "@/components/Post";
import { DEFAULT_COLOR, RUSSIAN, colors } from "../constants";
import DropzoneComponent from "@/components/Dropzone/ui/DropzoneComponent";
import { getLNG, getPostsByUserId, makeFormDataPost } from "../utils";

// TODO REMOVE ANY
const Personal = () => {
  const [language, setLanguage] = useState<string>(RUSSIAN);
  const { user, isAuth } = useSelector((state: RootState) => state.auth);
  const { myPosts } = useSelector((state: RootState) => state.posts);
  const [file, setFile] = useState<object | null>(null);
  const dispatch = useDispatch();
  const [isGettingPosts, setisGettingPosts] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>(DEFAULT_COLOR);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { myLikes } = useSelector((state: RootState) => state.likes);
  const filePickerRef = useRef<HTMLInputElement>(null);
  initLocales(language);

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

  const onSubmit = async (data: any) => {
    const date = new Date();
    const uniquePostId = Math.floor(Math.random() * 10000) + 1;
    const formData = makeFormDataPost(
      data,
      date,
      uniquePostId,
      user,
      file,
      selectedColor
    );
    try {
      await createPost(formData).then((newPost) => {
        dispatch(addOneMyPosts(newPost));
        getPostsByUserId(setisGettingPosts, dispatch, user);
      });
    } catch (e) {
      console.log(e);
      alert("Something went wrong!");
    } finally {
      reset();
    }
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

  const handleChangeFile = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleDownloadClick = () => {
    if (filePickerRef.current) {
      filePickerRef?.current.click();
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userToken") || isAuth) {
      getPostsByUserId(setisGettingPosts, dispatch, user);
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

    getAllLikesHandler();

    getLNG(language, setLanguage);
  }, []);

  return (
    <Provider store={store}>
      <Header
        isLoading={isLoading}
        language={language}
        setLanguage={setLanguage}
      />

      <Box className="wrapper">
        <Container>
          <Typography typography="h6" textAlign="center" mt={3}>
            {intl.get("PERSONAL_AREA")}
          </Typography>
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
                {colors.map((item, id) => (
                  <ColorButtons
                    key={id}
                    setSelectedColor={setSelectedColor}
                    selectedColor={selectedColor}
                    item={item}
                  />
                ))}
              </Box>
              <DropzoneComponent
                filePickerRef={filePickerRef}
                handleChangeFile={handleChangeFile}
                handleDownloadClick={handleDownloadClick}
              />
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
