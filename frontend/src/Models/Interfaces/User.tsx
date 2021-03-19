import {Activity} from "../Activity";

export type UserProps = {
    username: string,
    distance: string
    activities: Array<Activity>
}

export abstract class User {
    protected _username: string
    protected _distance: string
    protected _activities: Array<Activity>

    protected constructor({username, distance, activities}: UserProps) {
        if (!username || !distance || !activities)
            throw new Error('Class User: Invalid Arguments')

        this._username = username
        this._distance = distance
        this._activities = activities
    }

    public username(): string { return this._username }
    public distance(): string { return this._distance }
    public activities(): Array<Activity> { return this._activities }

    public toJSON(): UserProps {
        return {
            username: this._username,
            distance: this._distance,
            activities: this._activities
        }
    }
}