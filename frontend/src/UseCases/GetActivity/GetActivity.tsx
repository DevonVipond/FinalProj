import { api } from "../../Api/Api";
import { Activity } from "../../Models/Activity";
import { UserState } from "../../Models/UserState"

export async function GetActivies(): Promise<Array<Activity>> {


    try {

        //if (!UserState.Instance()._currentUser) {

        //    UserState.Instance()._currentUser = await userSettingsApi.fetchSettings()

        //}

        //return UserState.Instance()._currentUser.activities()

        return await api.get('/activities')


    } catch (e) {

        console.error('E: GetActivities ' + e.toString())

        return UserState.Instance()._currentUser.activities()
        
        throw e

    }

}