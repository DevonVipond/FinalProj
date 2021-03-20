import { FriendRequest } from "../../Models/FriendRequest"
import { api } from "../../Api/Api"
import { UserState } from "../../Models/UserState"

export async function RejectFriendRequest(request: FriendRequest): Promise<void> {

    try {

        const body = {
            requestorUsername: request.username()
        }

        await api.post(`/friend-requests/reject`, body)

        return Promise.resolve()

    } catch (e) {

        console.error('E: RejectFriendRequest ' + e.toString())

        UserState.Instance()._incomingFriendRequests = UserState.Instance()._incomingFriendRequests.filter((a: any) => {return a.getId() !== request.getId()})
        return;
        
        throw e

    }

}