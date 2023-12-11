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
import { Container } from "@mui/material";
import { setAllPosts } from "../../store/slices/postsSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { user, isAuth, isOpenAuthModal } = useSelector(
    (state: RootState) => state.auth
  );
  const { allPosts } = useSelector((state: RootState) => state.posts);
  console.log("allPosts: ", allPosts);
  // const [allPosts, setAllPosts] = useState([]);
  const start = async () => {
    try {
      await getAllPosts().then((posts) => {
        // setAllPosts(posts);
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

  console.log("allPosts: ", allPosts);
  return (
    <Provider store={store}>
      <Header />

      <div className="wrapper">
        <main>
          <h2 className={styles.mainTitle}>
            You are on the main page of the site
          </h2>
          <h5 className={styles.subTitle}>Please login for using app</h5>
        </main>
        <Container>
          {allPosts.map((item, id) => (
            <CardComponent key={id} post={item} isForAllUsers={true} />
          ))}
        </Container>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </Provider>
  );
}
