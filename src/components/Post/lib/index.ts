export const isPreesedLike = (myLikes: any, user: any) => {
  const emailArr = [];
  for (let i = 0; i < myLikes?.length; i++) {
    emailArr.push(myLikes[i].userEmail);
  }
  if (emailArr.includes(user.email)) {
    return true;
  }
  return false;
};
