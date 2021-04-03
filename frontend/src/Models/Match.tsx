import {User, UserProps} from "./Interfaces/User";

export class Match extends User {

    constructor({username, distance, activities, averageReviewScore}: UserProps) {
        super({username, distance, activities, averageReviewScore})
    }

    public toJSON(): UserProps{
        return super.toJSON()
    }
}