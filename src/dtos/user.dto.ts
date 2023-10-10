export interface UserUpdateDto{
    name?:string
    email?:string
    username?:string
    password?:string
    tokenAsString?:string | null
}