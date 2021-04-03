import {User, UserProps} from "./Interfaces/User";

export class Friend extends User {

    protected _phoneNumber: string
    constructor({username, distance, activities, averageReviewScore, phoneNumber}: UserProps & {phoneNumber: string}) {
        super({username, distance, activities, averageReviewScore: averageReviewScore})
        this._phoneNumber = phoneNumber
    }

    public toJSON(): UserProps{
        return super.toJSON()
    }

    public phoneNumber() : string {
        return this._phoneNumber
    }
}