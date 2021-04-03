import {User, UserProps} from "./Interfaces/User";

export class Friend extends User {

    constructor({username, distance, activities, averageReviewScore}: UserProps) {
        super({username, distance, activities, averageReviewScore: averageReviewScore})
    }

    public toJSON(): UserProps{
        return super.toJSON()
    }
}