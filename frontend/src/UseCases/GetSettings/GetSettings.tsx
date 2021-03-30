
import { api } from "../../Api/Api";
import { Activity } from "../../Models/Activity";

export type GetSettingsT = {
    activities: Array<Activity>,
    distance: string,
}


export async function GetSettings(): Promise<GetSettingsT> {
    try {

        const payload = await api.get('/settings') 

        const activities: Array<Activity> = payload['activities'].map((activity: any) => {
            return new Activity(activity)
        })

        const distance = payload['distance']

        return Promise.resolve({ distance, activities})

    } catch (e) {

        console.error('E: GetSettings ' + e.toString())

        throw e

    }

}