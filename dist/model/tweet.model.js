"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tweet = void 0;
const uuid_1 = require("uuid");
class Tweet {
    _content;
    _type;
    _userID;
    _id;
    constructor(_content, _type, _userID) {
        this._content = _content;
        this._type = _type;
        this._userID = _userID;
        this._id = (0, uuid_1.v4)();
    }
    get id() {
        return this._id;
    }
    get content() {
        return this._content;
    }
    get type() {
        return this._type;
    }
    get userId() {
        return this._userID;
    }
}
exports.Tweet = Tweet;
