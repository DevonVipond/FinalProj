import {User, UserProps} from "./User";
import {Activity} from "../Activity";

export type AuthenticatedUserProps = User & { accountType: string }

export abstract class AuthenticatedUser extends User {
    constructor({username, distance, activities}: UserProps) {
        super({username, distance, activities})
    }

    public setUsername(username: string): void { this._username = username }
    public setDistance(distance: string): void { this._distance = distance }

    protected addActivity(activity: Activity): void {}
    protected removeActivity(activity: Activity): void {}

    public toJSON(): UserProps{
        return super.toJSON()
    }
}
