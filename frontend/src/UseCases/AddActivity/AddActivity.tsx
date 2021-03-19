import { api } from "../../Api/Api";
import { Activity } from "../../Models/Activity";
import { UserState } from "../../Models/UserState"


export async function AddActivity(activity: Activity): Promise<void> {


    try {

        const activityName = activity.name()
        const skillLevel = activity.skillLevel()
        await api.post(`/activities/${activityName}/add?skillLevel=${skillLevel}`)

    } catch (e) {
        
        console.log('AddActivity -> ' + activity.toJSON())
        UserState.Instance()._currentUser.addActivity(activity)
        return;

        console.error('E: AddActivity ' + e.toString())

        throw e

    }

}
