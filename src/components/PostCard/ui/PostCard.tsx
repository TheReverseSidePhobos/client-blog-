import React, { useEffect, useState } from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Image } from "react-bootstrap";
import { isPreesedLike } from "@/components/Post/lib";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { getUserById } from "../../../../API/userApi";
import { CardStyled } from "./styled";
import { PostCarProp, userMadePostDataProp } from "../model/types";
import { useMutation, useQueryClient } from "react-query";
import { createLike, deleteLike } from "../../../../API/likeAPI";
import { base_url } from "@/app/constants";
import { likeProp } from "@/app/types";
import { getUserWhoMadePost } from "../lib";

const PostCard = ({
  post,
  isForAllUsers,
  deleteHandler,
  postLikes,
  toolTipTitle,
}: PostCarProp) => {
  const queryClient = useQueryClient();
  const { user, isAuth } = useSelector((state: RootState) => state.auth);
  const [userMadePostData, setUserMadePostData] =
    useState<userMadePostDataProp | null>(null);

  useEffect(() => {
    getUserWhoMadePost(post.userId, setUserMadePostData);
  }, []);

  const deleteMutation = useMutation(
    (newLike: likeProp) => deleteLike(newLike),
    {
      onSuccess: () => queryClient.invalidateQueries("allLikes"),
    }
  );
  const deleteLikeHandler = async (uniquePostId: number) => {
    deleteMutation.mutate({ uniquePostId, userId: user.id } as any);
  };
  const createLikeMutation = useMutation(
    (newLike: likeProp) => createLike(newLike),
    {
      onSuccess: () => queryClient.invalidateQueries("allLikes"),
    }
  );

  const likeHandler = (uniquePostId: number, user: any) => {
    const likeData = {
      uniquePostId: uniquePostId,
      userId: user.id,
      userEmail: user.email,
    } as any;

    if (!isPreesedLike(postLikes, user)) {
      createLikeMutation.mutate(likeData);
    } else {
      deleteLikeHandler(uniquePostId);
    }
  };
  return (
    <CardStyled postColor={post.color}>
      <Box display="flex" mr={2}>
        <IconButton>
          <Avatar
            alt="Remy Sharp"
            src={`${base_url}${userMadePostData?.avatar}`}
          />
        </IconButton>
        <Typography>{userMadePostData?.email}</Typography>
      </Box>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Image
            src={`${base_url}${post.img}`}
            width={300}
            height={300}
            alt="img"
          />

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
          <Tooltip title={toolTipTitle}>
            <IconButton
              disabled={!isAuth}
              onClick={() => likeHandler(post.uniquePostId, user)}
            >
              {isPreesedLike(postLikes, user) ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon />
              )}

              {postLikes && postLikes.length}
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </CardStyled>
  );
};

export default PostCard;
