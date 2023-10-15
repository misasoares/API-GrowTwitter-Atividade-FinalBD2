export interface RetweetCreateDto{
    content:string
    tweetId:string
    userID:string 
}

export interface UpdateRetweetDto {
    id:string
    userID:string
    content:string
}

export interface DeleteRetweetDto extends Omit<UpdateRetweetDto, 'content'>{}