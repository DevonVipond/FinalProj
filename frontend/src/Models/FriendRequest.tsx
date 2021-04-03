
import {User, UserProps} from "./Interfaces/User";

type Props = {
    id: string,
    message: string
}

export class FriendRequest extends User {

    private _id: string = ""
    private _message: string = ""
    constructor({id, username, distance, activities, message, averageReviewScore}: UserProps & Props) {
        super({username, distance, activities, averageReviewScore})
        this._id = id || ""
        this._message = message || ""
    }

    public getId(): string { return this._id; }

    public message(): string { return this._message }

    public toJSON(): UserProps{
        return super.toJSON()
    }
}