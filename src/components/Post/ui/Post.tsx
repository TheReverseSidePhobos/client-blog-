import * as React from "react";
import PostCard from "@/components/PostCard";
import { CardComponentProp, PostProp } from "../model/types";
import { useMutation, useQueryClient } from "react-query";
import { deletePostAPI } from "../../../../API/postAPI";
import { isPreesedLike } from "../lib";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { likeProp } from "@/app/types";

export function Post({ postLikes, post, isForAllUsers }: CardComponentProp) {
  const { user } = useSelector((state: RootState) => state.auth);

  const queryClient = useQueryClient();

  const deletePost = useMutation((id: PostProp) => deletePostAPI(id), {
    onSuccess: () => queryClient.invalidateQueries("postssById"),
  });
  const deleteHandler = async (id: PostProp) => {
    deletePost.mutateAsync(id);
  };

  const makeTooltipTitle = () => {
    let cuttedPostLikes: likeProp[] | undefined = [];
    if (postLikes && postLikes.length >= 3) {
      cuttedPostLikes = [postLikes[0], postLikes[1], postLikes[2]];
    } else {
      cuttedPostLikes = postLikes;
    }
    if (isPreesedLike(postLikes, user)) {
      return (
        "you " +
        cuttedPostLikes?.map((item) => {
          if (item.userEmail !== user.email) {
            return " and " + item.userEmail;
          }
        })
      );
    }
    return postLikes?.map((item) => item.userEmail)?.join(" and ");
  };

  return (
    <PostCard
      toolTipTitle={makeTooltipTitle()}
      postLikes={postLikes}
      post={post}
      isForAllUsers={isForAllUsers}
      deleteHandler={deleteHandler}
    />
  );
}
