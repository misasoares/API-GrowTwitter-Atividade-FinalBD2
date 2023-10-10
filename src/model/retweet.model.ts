
import { v4 as uuid} from 'uuid'

export class Retweet{
    private _id:string
    constructor(private _content:string, private _tweetId:string, private _tokenAsString:string){
        this._id = uuid()
    }

    public get id(){
        return this._id
    }

    public get content(){
        return this._content
    }

    public get tweetId(){
        return this._tweetId
    }
    public get token(){
        return this._tokenAsString
    }
}