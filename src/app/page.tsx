"use client";
import { Provider, useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../../store";
import Header from "@/components/Header/ui/Header";
import Footer from "@/components/Footer/ui/Footer";
import { useEffect, useState } from "react";
import { check } from "../../API/userApi";
import { setAuth, setUser } from "../../store/slices/authSlice";

import { Box, Container, Typography } from "@mui/material";

import { initLocales } from "./locales/initLocales";
import intl from "react-intl-universal";
import LinearProgress from "@mui/material/LinearProgress";

import Post from "@/components/Post";
import { addLikeHandler, getAllLikesHandler, getLNG, start } from "./utils";
import { RUSSIAN } from "./constants";

export default function Home() {
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((state: RootState) => state.auth);
  const { allPosts } = useSelector((state: RootState) => state.posts);
  const { myLikes } = useSelector((state: RootState) => state.likes);
  const [language, setLanguage] = useState<string>(RUSSIAN);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  initLocales(language);

  useEffect(() => {
    getLNG(language, setLanguage);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setIsLoading(true);
      check()
        .then((data) => {
          dispatch(setUser(data));
          dispatch(setAuth(true));
        })
        .catch(() => console.log("unauthorized"))
        .finally(() => {});
    }
    start(dispatch, setIsLoading);
  }, []);

  useEffect(() => {
    getAllLikesHandler(dispatch);
  }, []);
  return (
    <Provider store={store}>
      <Header
        isLoading={isLoading}
        language={language}
        setLanguage={setLanguage}
      />
      <Box className="wrapper">
        {isLoading ? (
          <Container>
            <Box marginTop="20%">
              <LinearProgress />
            </Box>
          </Container>
        ) : (
          <>
            <Box>
              <Typography textAlign="center" typography="h6">
                {intl.get("MAIN_TITLE")}
              </Typography>
              {!isAuth && isLoading && (
                <Typography typography="body" textAlign="center" mt={3}>
                  {intl.get("PLEASE_LOGIN")}
                </Typography>
              )}
            </Box>
            <Container>
              {allPosts.map((item: any, id) => (
                <Post
                  getAllLikesHandler={() => getAllLikesHandler(dispatch)}
                  myLikes={myLikes.filter(
                    (like) => like.uniquePostId === item.uniquePostId
                  )}
                  addLikeHandler={() =>
                    addLikeHandler(item.uniquePostId, user, dispatch)
                  }
                  key={id}
                  post={item}
                  isForAllUsers={true}
                />
              ))}
            </Container>
            <div className="footer">
              <Footer />
            </div>
          </>
        )}
      </Box>
    </Provider>
  );
}
