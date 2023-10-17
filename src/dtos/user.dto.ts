export interface UserUpdateDto {
  userID?: string;
  name?: string;
  email?: string;
  password?: string;
  username?: string;
  token?: string | null;
}

export interface CreateUserDto{
  name:string
  email:string
  username:string
  password:string
}