import {User, UserProps} from "./Interfaces/User";

export class Match extends User {

    constructor({username, distance, activities}: UserProps) {
        super({username, distance, activities})
    }

    public toJSON(): UserProps{
        return super.toJSON()
    }
}