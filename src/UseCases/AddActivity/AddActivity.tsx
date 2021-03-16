import { api } from "../../Api/Api";
import { Activity } from "../../Models/Activity";
import { UserState } from "../../Models/UserState"


export async function AddActivity(activity: Activity): Promise<void> {

    console.log(activity)
    console.log('AddActivity -> ' + activity.toJSON())
    UserState.Instance()._currentUser.addActivity(activity)
    return;

    try {

        await api.post('/activities', activity.toJSON())

    } catch (e) {

        console.error('E: AddActivity ' + e.toString())

        throw e

    }

}
