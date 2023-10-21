"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const uuid_1 = require("uuid");
class User {
    _name;
    _email;
    _username;
    _password;
    _id;
    constructor(_name, _email, _username, _password) {
        this._name = _name;
        this._email = _email;
        this._username = _username;
        this._password = _password;
        this._id = (0, uuid_1.v4)();
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get email() {
        return this._email;
    }
    get username() {
        return this._username;
    }
    get password() {
        return this._password;
    }
}
exports.User = User;
