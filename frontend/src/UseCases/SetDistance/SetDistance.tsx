import { api } from "../../Api/Api";
import { UserState } from "../../Models/UserState"

export async function SetDistance(distance: string): Promise<void> {


    try {

        await api.post('/distance', distance)

    } catch (e) {

        console.error('E: SetDistance ' + e.toString())

        UserState.Instance()._currentUser.setDistance(distance)
        return
        
        throw e

    }

}