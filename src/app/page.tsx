"use client";
import styles from "./page.module.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../../store";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useEffect, useState } from "react";
import { check } from "../../API/userApi";
import { setAuth, setUser } from "../../store/slices/authSlice";
import { getAllPosts } from "../../API/postAPI";
import CardComponent from "@/components/Post/Post";
import { Box, Button, ButtonGroup, Container } from "@mui/material";
import { setAllPosts } from "../../store/slices/postsSlice";
import { initLocales } from "./locales/initLocales";
import intl from "react-intl-universal";
import LinearProgress from "@mui/material/LinearProgress";

export default function Home() {
  const dispatch = useDispatch();
  const { user, isAuth, isOpenAuthModal } = useSelector(
    (state: RootState) => state.auth
  );
  const [language, setLanguage] = useState("ru-RU");

  const { allPosts } = useSelector((state: RootState) => state.posts);

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

  const start = async () => {
    try {
      await getAllPosts().then((posts) => {
        dispatch(setAllPosts(posts));
      });
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      check().then((data) => {
        dispatch(setUser(data));
        dispatch(setAuth(true));
      });
    }
    start();
  }, []);

  return (
    <Provider store={store}>
      <Header setLanguage={setLanguage} />

      <div className="wrapper">
        {!isAuth && !user ? (
          <Container>
            <Box marginTop="20%">
              <LinearProgress />
            </Box>
          </Container>
        ) : (
          <>
            <main>
              <h2 className={styles.mainTitle}>{intl.get("MAIN_TITLE")}</h2>
              {!isAuth && !user && (
                <h5 className={styles.subTitle}>{intl.get("PLEASE_LOGIN")}</h5>
              )}
            </main>
            <Container>
              {allPosts.map((item, id) => (
                <CardComponent key={id} post={item} isForAllUsers={true} />
              ))}
            </Container>
            <div className="footer">
              <Footer />
            </div>
          </>
        )}
      </div>
    </Provider>
  );
}
