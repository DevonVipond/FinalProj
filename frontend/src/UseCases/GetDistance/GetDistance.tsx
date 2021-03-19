import { api } from "../../Api/Api";
import { UserState } from "../../Models/UserState"

export async function GetDistance(): Promise<string> {

    try {

        //if (!UserState.Instance()._currentUser) {

        //    UserState.Instance()._currentUser = await userSettingsApi.fetchSettings()

        //}

        //return UserState.Instance()._currentUser.activities()

        return await api.get('/distance')


    } catch (e) {

        console.error('E: GetActivities ' + e.toString())

        return UserState.Instance()._currentUser.distance()
        
        throw e

    }

}