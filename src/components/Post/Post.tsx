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
import { deletePost, getAllPostsByUserId } from "../../../API/postAPI";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { addLike, getAllLikesByPostId } from "../../../API/likeAPI";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import Tooltip from "@mui/material/Tooltip";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { setMyPosts } from "../../../store/slices/postsSlice";

export default function CardComponent({ post, isForAllUsers }) {
  const { user, isAuth, isOpenAuthModal } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();
  const func = async () => {
    try {
      await getAllPostsByUserId(user.id).then((items) => {
        const myPosts = items.filter((item) => item.userId === user.id);
        dispatch(setMyPosts(myPosts));
      });
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  const deleteHandler = async (id: number) => {
    try {
      await deletePost(id);
      func();
    } catch (e) {
      alert("Something went wrong!");
    }
  };
  const addLikeHandler = async (id: number) => {
    try {
      await addLike(id, user.id, user.email);
      window.location.reload();
    } catch (e) {
      alert("Something went wrong!");
    }
  };
  const [postLikes, setPostLikes] = React.useState([]);
  const getAllLikesByPostIdHnadler = async (postId: number) => {
    try {
      await getAllLikesByPostId(postId).then((likes) => setPostLikes(likes));
    } catch (error) {}
  };
  React.useEffect(() => {
    getAllLikesByPostIdHnadler(post.id);
  }, []);
  if (postLikes.length) {
  }
  let toolTipTitle = [];
  for (let i = 0; i < postLikes.length; i++) {
    toolTipTitle.push(postLikes[i].userEmail);
  }

  const isPreesedLike = () => {
    const emailArr = [];
    for (let i = 0; i < postLikes.length; i++) {
      emailArr.push(postLikes[i].userEmail);
    }
    if (emailArr.includes(user.email)) {
      return true;
    }
    return false;
  };
  return (
    <Card sx={{ backgroundColor: post.color, my: "16px" }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography gutterBottom variant="h5" component="div">
            {post.title}
          </Typography>
          {!isForAllUsers && (
            <Button onClick={() => deleteHandler(Number(post.id))}>
              <DeleteIcon color="disabled" />
            </Button>
          )}
        </Box>
        <Typography variant="body2" color="text.secondary">
          {post.description}
        </Typography>
        <Tooltip title={toolTipTitle.join(" and ")}>
          <IconButton
            disabled={isPreesedLike()}
            onClick={() => addLikeHandler(Number(post.id))}
          >
            {isPreesedLike() ? <FavoriteIcon /> : <FavoriteBorderIcon />}

            {postLikes.length}
          </IconButton>
        </Tooltip>
      </CardContent>
    </Card>
  );
}
