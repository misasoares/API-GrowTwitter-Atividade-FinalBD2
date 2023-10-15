import { v4 as uuid } from "uuid"

export class Tweet{
    private _id:string
    constructor(private _content:string, private _type:string, private _userID:string){
        this._id = uuid()
    }
    
    public get id(){
        return this._id
    }

    public get content(){
        return this._content
    }

    public get type(){
        return this._type
    }

    public get userId(){
        return this._userID
    }
}