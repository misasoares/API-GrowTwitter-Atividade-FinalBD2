"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Retweet = void 0;
const uuid_1 = require("uuid");
class Retweet {
    _content;
    _tweetId;
    _tokenAsString;
    _id;
    constructor(_content, _tweetId, _tokenAsString) {
        this._content = _content;
        this._tweetId = _tweetId;
        this._tokenAsString = _tokenAsString;
        this._id = (0, uuid_1.v4)();
    }
    get id() {
        return this._id;
    }
    get content() {
        return this._content;
    }
    get tweetId() {
        return this._tweetId;
    }
    get token() {
        return this._tokenAsString;
    }
}
exports.Retweet = Retweet;
