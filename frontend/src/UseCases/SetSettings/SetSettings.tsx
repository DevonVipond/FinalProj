import { api } from "../../Api/Api";
import { Activity } from "../../Models/Activity";
import { UserState } from "../../Models/UserState"


export async function SetSettings(activities: Array<Activity>, distance: string | null = null): Promise<void> {


    try {

        let body: any = {
            activities: activities.map((activity: Activity) => (activity.toJSON()))
        }

        if (distance) {
            body['distance'] = distance
        }

        await api.post('/settings', body)

    } catch (e) {

        console.error('E: SetSettings ' + e.toString())

        throw e

    }

}
