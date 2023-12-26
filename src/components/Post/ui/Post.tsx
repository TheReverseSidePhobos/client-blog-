import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deletePost, getAllPostsByUserId } from "../../../../API/postAPI";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import Tooltip from "@mui/material/Tooltip";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { setMyPosts } from "../../../../store/slices/postsSlice";
import { deleteLike } from "../../../../API/likeAPI";
import { isPreesedLike } from "../lib";

export interface CardComponentProp {
  myLikes?: any;
  post: any;
  isForAllUsers?: boolean;
  addLikeHandler?: any;
  getAllLikesHandler?: any;
}

// TODO REMOVE ANY
// TODO REMOVE ADUPLICATE CODE
export function Post({
  myLikes,
  addLikeHandler,
  getAllLikesHandler,
  post,
  isForAllUsers,
}: CardComponentProp) {
  const { user, isAuth } = useSelector((state: RootState) => state.auth);

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
    debugger;
    if (!isPreesedLike(myLikes, user)) {
      addLikeHandler(Number(uniquePostId));
    } else {
      deleteLike(uniquePostId, userId).then(() => {
        getAllLikesHandler();
      });
    }
  };
  return (
    <Card sx={{ backgroundColor: post.color, my: "16px" }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography gutterBottom variant="h5" component="div">
            {post.title}
          </Typography>
          {!isForAllUsers && (
            <Button onClick={() => deleteHandler(post)}>
              <DeleteIcon color="disabled" />
            </Button>
          )}
        </Box>
        <Typography variant="body2" color="text.secondary">
          {post.description}
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Tooltip
            title={
              isPreesedLike(myLikes, user) ? "you" : toolTipTitle.join(" and ")
            }
          >
            <IconButton
              disabled={!isAuth}
              onClick={() => likeClickHandler(post.uniquePostId, user.id)}
            >
              {isPreesedLike(myLikes, user) ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon />
              )}

              {myLikes.length}
            </IconButton>
          </Tooltip>
          <Typography variant="body2" color="text.secondary">
            {format(post.dueDate, "dd.MM.yyyy")}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
