import {UserProps} from "./Interfaces/User";
import {Activity} from "./Activity";
import { AuthenticatedUser } from './Interfaces/AuthenticatedUser'

export class RegularUser extends AuthenticatedUser {
    constructor({username, distance, activities}: UserProps) {
        super({username, distance, activities});
    }

    public addActivity(activity: Activity): void {
        this._activities = [ activity ]
    }

    public removeActivity(activity: Activity): void {
        this._activities = []
    }

}

