export interface UserUpdateDto {
  userID?: string;
  name?: string;
  email?: string;
  username?: string;
  password?: string;
  token?: string | null;
}
