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
import { addLikeHandler, getAllLikesHandler, getLNG } from "./utils";
import { RUSSIAN } from "./constants";
import { useQuery } from "react-query";
import { getAllPosts } from "../../API/postAPI";

interface likeProp {
  id: number;
  postId?: number;
  uniquePostId: number;
  userEmail: string;
  userId: number;
}

export default function Home() {
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((state: RootState) => state.auth);
  const { myLikes } = useSelector((state: RootState) => state.likes);
  const [language, setLanguage] = useState<string>(RUSSIAN);

  const {
    isLoading,
    error,
    data: allPosts,
  } = useQuery("allPost", getAllPosts, {
    keepPreviousData: true,
  });
  initLocales(language);

  useEffect(() => {
    getLNG(language, setLanguage);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      check()
        .then((data) => {
          dispatch(setUser(data));
          dispatch(setAuth(true));
        })
        .catch(() => console.log("unauthorized"))
        .finally(() => {});
    }
  }, []);
  useEffect(() => {
    getAllLikesHandler(dispatch);
  }, []);

  if (error) {
    return (
      <Typography typography="subtitle1" textAlign="center">
        {intl.get("SOMTHING_WENT_WRONG")}
      </Typography>
    );
  }

  return (
    <Provider store={store}>
      <Header isLoading={false} language={language} setLanguage={setLanguage} />
      {isLoading ? (
        <Box mt={36}>
          <LinearProgress />
        </Box>
      ) : (
        <Box className="wrapper">
          (
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
            {allPosts.map((item: any, id: number) => (
              <Post
                getAllLikesHandler={() => getAllLikesHandler(dispatch)}
                myLikes={
                  myLikes &&
                  myLikes.filter(
                    (like: likeProp) => like.uniquePostId === item.uniquePostId
                  )
                }
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
          )
        </Box>
      )}
    </Provider>
  );
}
