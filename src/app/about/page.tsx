import React from "react";
import { Provider } from "react-redux";
import { store } from "../../../store";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Button, TextField } from "@mui/material";

const About = () => {
  return (
    <>
      <div className="wrapper">
        <main>
          Hello in your blog Let's do new note
          <TextField />
          <Button>Save</Button>
        </main>
      </div>
    </>
  );
};

export default About;
