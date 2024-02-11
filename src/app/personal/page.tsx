"use client";
import React, { useRef, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../../../store";
import Header from "@/components/Header/ui/Header";
import Footer from "@/components/Footer/ui/Footer";
import { getAllLikes } from "../../../API/likeAPI";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { check } from "../../../API/userApi";
import { setAuth, setUser } from "../../../store/slices/authSlice";
import { useForm } from "react-hook-form";
import { createPost, getAllPosts } from "../../../API/postAPI";
import ColorButtons from "@/components/ColorButtons/ui/ColorButtons";
import intl from "react-intl-universal";
import { initLocales } from "../locales/initLocales";
import Post from "@/components/Post";
import { DEFAULT_COLOR, RUSSIAN, colors } from "../constants";
import DropzoneComponent from "@/components/Dropzone/ui/DropzoneComponent";
import { getLNG, makeFormDataPost } from "../utils";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { $host } from "../../../API";
import { likeProp } from "../types";

// TODO REMOVE ANY
const Personal = () => {
  const [language, setLanguage] = useState<string>(RUSSIAN);
  const { user, isAuth } = useSelector((state: RootState) => state.auth);

  const [file, setFile] = useState<object | null>(null);
  const dispatch = useDispatch();

  const [selectedColor, setSelectedColor] = useState<string>(DEFAULT_COLOR);

  const filePickerRef = useRef<HTMLInputElement>(null);
  initLocales(language);
  const queryClient = useQueryClient();
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

  const mutation = useMutation((newPost) => createPost(newPost), {
    onSuccess: () => queryClient.invalidateQueries("postssById"),
  });

  const { error, data: allPostsById } = useQuery(
    "postssById",
    () => getAllPosts(),
    {
      refetchOnMount: true,
      staleTime: 100,
    }
  );

  const { data: allLikes } = useQuery("allLikes", () => getAllLikes(), {
    refetchOnMount: true,
    staleTime: 100,
  });

  const onSubmit = async (data: any) => {
    const date = new Date();
    const uniquePostId = Math.floor(Math.random() * 10000) + 1;
    const post = makeFormDataPost(
      data,
      date,
      uniquePostId,
      user,
      file,
      selectedColor
    ) as any;
    mutation.mutate(post);
    reset();
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
    if (localStorage.getItem("userToken")) {
      check().then((data) => {
        dispatch(setUser(data));
        dispatch(setAuth(true));
      });
    }

    getLNG(language, setLanguage);
  }, []);

  return (
    <Provider store={store}>
      <Header language={language} setLanguage={setLanguage} />

      <Box className="wrapper">
        <Container>
          <Typography typography="h6" textAlign="center" mt={3}>
            {intl.get("PERSONAL_AREA")}
          </Typography>
          <Typography textAlign="center">
            {intl.get("ALL_YOUR_POSTS")}
          </Typography>
          {allPostsById &&
            allPostsById
              .filter((item: any) => item.userId === user.id)
              .map((item: any, id: any) => (
                <Post
                  key={id}
                  postLikes={allLikes.filter(
                    (like: likeProp) => like.uniquePostId === item.uniquePostId
                  )}
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
