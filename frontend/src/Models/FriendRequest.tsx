
import {User, UserProps} from "./Interfaces/User";

type Props = {
    id: string, 
}

export class FriendRequest extends User {

    private _id: string
    constructor({id, username, distance, activities}: UserProps & Props) {
        super({username, distance, activities})
        this._id = id
    }

    public getId(): string { return this._id; }

    public toJSON(): UserProps{
        return super.toJSON()
    }
}