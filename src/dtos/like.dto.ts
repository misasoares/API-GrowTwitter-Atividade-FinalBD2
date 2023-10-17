export interface CreateLikeDto {
  userID: string;
  tweetId: string;
}

export interface DeleteLikeDto {
  id: string;
  userID: string;
}
