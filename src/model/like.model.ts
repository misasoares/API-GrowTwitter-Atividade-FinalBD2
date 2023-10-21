import { v4 as uuid } from "uuid";

export class Like {
  private _id: string;
  constructor(private _userId: string, private _tweetId?: string, private _retweetId?:string) {
    this._id = uuid();
  }
}
