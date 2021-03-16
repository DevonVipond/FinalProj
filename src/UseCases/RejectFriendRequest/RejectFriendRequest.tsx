import { FriendRequest } from "../../Models/FriendRequest"
import { api } from "../../Api/Api"
import { UserState } from "../../Models/UserState"

export async function RejectFriendRequest(request: FriendRequest): Promise<void> {

    try {

        const id = request.getId()
        await api.post(`/friendRequests/${id}/reject`)

    } catch (e) {

        console.error('E: GetBoard ' + e.toString())

        UserState.Instance()._incomingFriendRequests = UserState.Instance()._incomingFriendRequests.filter((a: any) => {return a.getId() !== request.getId()})
        return;
        
        throw e

    }

}