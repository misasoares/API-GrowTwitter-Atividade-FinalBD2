export interface CreateLikeDto {
  userID: string;
  tweetId?: string;
  retweetId?: string
}

export interface DeleteLikeDto {
  id: string;
  userID: string;
}
