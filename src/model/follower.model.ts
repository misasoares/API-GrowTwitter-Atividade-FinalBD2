import { v4 as uuid } from "uuid";
export class Followed {
    private _id: string;
    constructor(private _idUsuario:string, private _idFollowed:string){
        this._id = uuid()
    }

    public get idUsuario(){
        return this._idUsuario
    }

    public get idFollowed(){
        return this._idFollowed
    }

    public get id(){
        return this._id
    }
}