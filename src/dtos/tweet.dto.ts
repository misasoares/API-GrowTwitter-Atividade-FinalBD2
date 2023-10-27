export interface CreateTweet {
  userID: string;
  content: string;
  type: string;
  originalTweetId?:string 
}

export interface UpdateTweetDto extends Omit<CreateTweet, 'type'> {
    id: string;
  }

export interface DeleteTweetDto extends Omit<CreateTweet, 'content' | 'type'>{
    id:string
}