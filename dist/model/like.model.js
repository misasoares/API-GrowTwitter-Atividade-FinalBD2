"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Like = void 0;
const uuid_1 = require("uuid");
class Like {
    _userId;
    _tweetId;
    _retweetId;
    _id;
    constructor(_userId, _tweetId, _retweetId) {
        this._userId = _userId;
        this._tweetId = _tweetId;
        this._retweetId = _retweetId;
        this._id = (0, uuid_1.v4)();
    }
}
exports.Like = Like;
