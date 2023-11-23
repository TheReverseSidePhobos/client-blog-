import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deletePost, addLike } from "../../../API/postAPI";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function CardComponent({ post }) {
  const deleteHandler = async (id: number) => {
    debugger;
    try {
      await deletePost(id);
      window.location.reload();
    } catch (e) {
      alert("Something went wrong!");
    }
  };
  const addLikeHandler = async (id: number) => {
    debugger;
    try {
      await addLike(id, post.countLikes);
      window.location.reload();
    } catch (e) {
      alert("Something went wrong!");
    }
  };

  return (
    <Card sx={{ backgroundColor: post.color, my: "16px" }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography gutterBottom variant="h5" component="div">
            {post.title}
          </Typography>
          <Button onClick={() => deleteHandler(Number(post.id))}>
            <DeleteIcon color="disabled" />
          </Button>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {post.description}
        </Typography>
        <IconButton onClick={() => addLikeHandler(Number(post.id))}>
          <FavoriteBorderIcon />
          {post.countLikes}
        </IconButton>
      </CardContent>
    </Card>
  );
}
