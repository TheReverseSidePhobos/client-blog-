import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { format } from "date-fns";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Image } from "react-bootstrap";
import { isPreesedLike } from "@/components/Post/lib";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { getUserById } from "../../../../API/userApi";
import { CardStyled } from "./styled";
import { PostCarProp, userMadePostDataProp } from "../model/types";

const PostCard = ({
  post,
  isForAllUsers,
  deleteHandler,
  myLikes,
  toolTipTitle,
  likeClickHandler,
}: PostCarProp) => {
  const { user, isAuth } = useSelector((state: RootState) => state.auth);
  const [userMadePostData, setUserMadePostData] =
    React.useState<userMadePostDataProp | null>(null);

  const getUserWhoMadePost = async (userId: any) => {
    try {
      await getUserById(userId).then((userData) => {
        setUserMadePostData(userData);
      });
    } catch (e) {
      alert("Something went wrong!");
    }
  };
  React.useEffect(() => {
    getUserWhoMadePost(post.userId);
  }, []);

  return (
    <CardStyled postColor={post.color}>
      <Box display="flex" mr={2}>
        <IconButton>
          <Avatar
            alt="Remy Sharp"
            src={`http://localhost:5001/${userMadePostData?.avatar}`}
          />
        </IconButton>
        <Typography>{userMadePostData?.email}</Typography>
      </Box>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Image
            src={`http://localhost:5001/${post.img}`}
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

              {myLikes && myLikes.length}
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </CardStyled>
  );
};

export default PostCard;
