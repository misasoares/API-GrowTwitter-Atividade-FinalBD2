import { v4 as uuid } from "uuid";
export class Follower {
    private _id: string;
    constructor(private _token:string, private _followerId:string){
        this._id = uuid()
    }
}