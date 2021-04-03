import {Activity} from "../Activity";

export type UserProps = {
    username: string,
    distance: string,
    averageReviewScore?: string | null,
    activities: Array<Activity>
}

export abstract class User {
    protected _username: string
    protected _distance: string
    protected _averageReviewScore: string| null = '-1'
    protected _activities: Array<Activity> = []

    protected constructor({username, distance, activities, averageReviewScore}: UserProps) {
        if (!username || distance === null || distance === undefined || !activities)
            throw new Error(`Class User: Invalid Arguments! Username: ${username}, Distance: ${distance}, activities: ${JSON.stringify(activities)}`)

        this._username = username
        this._distance = distance
        this._activities = activities
        if (!averageReviewScore) {
            this._averageReviewScore = null
        } else {
            this._averageReviewScore = averageReviewScore
        }
    }

    public username(): string { return this._username }
    public distance(): string { return this._distance + ' km' }
    public activities(): Array<Activity> { return this._activities }
    public averageReviewScore(): string | null { return this._averageReviewScore }

    public toJSON(): UserProps {
        return {
            username: this._username,
            distance: this._distance,
            activities: this._activities
        }
    }
}