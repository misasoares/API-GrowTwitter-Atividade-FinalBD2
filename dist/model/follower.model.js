"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Followed = void 0;
const uuid_1 = require("uuid");
class Followed {
    _idUsuario;
    _idFollowed;
    _id;
    constructor(_idUsuario, _idFollowed) {
        this._idUsuario = _idUsuario;
        this._idFollowed = _idFollowed;
        this._id = (0, uuid_1.v4)();
    }
    get idUsuario() {
        return this._idUsuario;
    }
    get idFollowed() {
        return this._idFollowed;
    }
    get id() {
        return this._id;
    }
}
exports.Followed = Followed;
