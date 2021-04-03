import {UserProps} from "./Interfaces/User";
import {Activity} from "./Activity";
import { AuthenticatedUser } from './Interfaces/AuthenticatedUser'

export class RegularUser extends AuthenticatedUser {
    constructor({username, distance, activities, averageReviewScore}: UserProps) {
        super({username, distance, activities, averageReviewScore});
    }

    public addActivity(activity: Activity): void {
        this._activities = [ activity ]
    }

    public removeActivity(activity: Activity): void {
        this._activities = []
    }

}

