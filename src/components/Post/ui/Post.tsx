import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { deleteLike } from "../../../../API/likeAPI";
import { isPreesedLike } from "../lib";
import PostCard from "@/components/PostCard";
import { CardComponentProp } from "../model/types";
import { useMutation, useQueryClient } from "react-query";
import { $authHost } from "../../../../API";

export function Post({
  myLikes,
  addLikeHandler,
  getAllLikesHandler,
  post,
  isForAllUsers,
}: CardComponentProp) {
  const { user } = useSelector((state: RootState) => state.auth);

  const queryClient = useQueryClient();

  const deletePost = useMutation(
    (id: any) => {
      return $authHost.delete("/api/post/" + id.id);
    },
    {
      onSuccess: () => queryClient.invalidateQueries("postssById"),
    }
  );
  const deleteHandler = async (id: any) => {
    deletePost.mutateAsync(id);
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
