import { userSettingsApi } from "../../Api/FriendService/FriendService";
import { UserState } from "../../Models/UserState"

export async function SetDistance(distance: string): Promise<void> {


    try {

        //if (!UserState.Instance()._currentUser) {

        //    UserState.Instance()._currentUser = await userSettingsApi.fetchSettings()

        //}

        //return UserState.Instance()._currentUser.activities()

         await userSettingsApi.updateDistance(distance)


    } catch (e) {

        console.error('E: SetDistance ' + e.toString())

        UserState.Instance()._currentUser.setDistance(distance)
        return
        
        throw e

    }

}