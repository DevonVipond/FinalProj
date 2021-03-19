import {UserProps} from "./Interfaces/User";
import {Activity} from "./Activity";
import {AuthenticatedUser} from "./Interfaces/AuthenticatedUser";

export class PremiumUser extends AuthenticatedUser {

    constructor({username, distance, activities}: UserProps) {
        super({username, distance, activities});
    }

    public addActivity(activity: Activity): void {
        this._activities.push(activity)
    }

    public removeActivity(activity: Activity): void {
        this._activities = this._activities.filter(item => item.name() !== activity.name())
    }
}
