import { api } from "../../Api/Api";
import { FriendRequest } from "../../Models/FriendRequest";
import { UserState } from "../../Models/UserState";


export async function AcceptFriendRequest(request: FriendRequest): Promise<void> {

    try {

        const id = request.getId()
        await api.post(`/friendRequests/${id}/accept`)

    } catch (e) {

        console.error('E: AcceptFriendRequest ' + e)

        UserState.Instance()._incomingFriendRequests = UserState.Instance()._incomingFriendRequests.filter((a: any) => {return a.getId() !== request.getId()})
        return;

        throw e

    }

}
