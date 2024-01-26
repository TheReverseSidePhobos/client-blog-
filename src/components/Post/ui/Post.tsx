import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { format } from "date-fns";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { deletePost, getAllPostsByUserId } from "../../../../API/postAPI";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { setMyPosts } from "../../../../store/slices/postsSlice";
import { deleteLike } from "../../../../API/likeAPI";
import { isPreesedLike } from "../lib";
import PostCard from "@/components/PostCard";
import { CardComponentProp } from "../model/types";

export function Post({
  myLikes,
  addLikeHandler,
  getAllLikesHandler,
  post,
  isForAllUsers,
}: CardComponentProp) {
  const { user, isAuth } = useSelector((state: RootState) => state.auth);
  const [isGettingPosts, setisGettingPosts] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  // TODO: Rename
  const func = async () => {
    try {
      await getAllPostsByUserId(user.id).then((items) => {
        const myPosts = items.filter((item: any) => item.userId === user.id);
        dispatch(setMyPosts(myPosts));
      });
    } catch (error) {
      alert("Something went wrong!");
    } finally {
      setisGettingPosts(false);
    }
  };

  const deleteHandler = async (post: any) => {
    try {
      await deletePost(post.id);
      deleteLike(post.uniquePostId, post.userId).then(() => {
        getAllLikesHandler();
      });
      func();
    } catch (e) {
      alert("Something went wrong!");
    }
  };

  let toolTipTitle = [];
  for (let i = 0; i < myLikes?.length; i++) {
    toolTipTitle.push(myLikes[i].userEmail);
  }

  const likeClickHandler = (uniquePostId: number, userId: number) => {
    if (!isPreesedLike(myLikes, user)) {
      addLikeHandler(Number(uniquePostId));
    } else {
      deleteLike(uniquePostId, userId).then(() => {
        getAllLikesHandler();
      });
    }
  };
  return (
    <PostCard
      likeClickHandler={likeClickHandler}
      toolTipTitle={toolTipTitle}
      myLikes={myLikes}
      post={post}
      isForAllUsers={isForAllUsers}
      deleteHandler={deleteHandler}
    />
  );
}
