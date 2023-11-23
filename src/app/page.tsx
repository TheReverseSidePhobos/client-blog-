"use client";
import styles from "./page.module.css";
import { Provider, useDispatch } from "react-redux";
import { store } from "../../store";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useEffect } from "react";
import { check } from "../../API/userApi";
import { setAuth, setUser } from "../../store/slices/authSlice";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      check().then((data) => {
        dispatch(setUser(data));
        dispatch(setAuth(true));
      });
    }
  }, []);
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
        <div className="footer">
          <Footer />
        </div>
      </div>
    </Provider>
  );
}
