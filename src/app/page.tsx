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
import { RUSSIAN } from "./constants";
import { useQuery } from "react-query";
import { getAllPosts } from "../../API/postAPI";
import { getAllLikes } from "../../API/likeAPI";
import { likeProp } from "./types";
import { getLNG } from "./utils";

export default function Home() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state: RootState) => state.auth);
  const [language, setLanguage] = useState<string>(RUSSIAN);
  initLocales(language);

  const { data: allLikes } = useQuery("allLikes", () => getAllLikes(), {
    refetchOnMount: true,
    staleTime: 100,
  });

  const {
    isLoading,
    error,
    data: allPosts,
  } = useQuery("allPost", getAllPosts, {
    keepPreviousData: true,
  });

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
    getLNG(language, setLanguage);
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
                postLikes={
                  allLikes &&
                  allLikes.filter(
                    (like: likeProp) => like.uniquePostId === item.uniquePostId
                  )
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
