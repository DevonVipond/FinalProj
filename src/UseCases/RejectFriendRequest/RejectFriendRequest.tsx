import { FriendRequest } from "../../Models/FriendRequest"
import { api } from "../../Api/Api"

export async function RejectFriendRequest(request: FriendRequest): Promise<void> {

    try {

        const id = request.getId()
        await api.post(`/friendRequests/:${id}/reject`)

    } catch (e) {

        console.error('E: GetBoard ' + e.toString())
        
        throw e

    }

}