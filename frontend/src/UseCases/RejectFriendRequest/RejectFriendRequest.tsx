import { FriendRequest } from "../../Models/FriendRequest"
import { api } from "../../Api/Api"

export async function RejectFriendRequest(request: FriendRequest): Promise<void> {

    try {

        const body = {
            requestorUsername: request.username()
        }

        await api.post(`/friend-requests/reject`, body)

        return Promise.resolve()

    } catch (e) {

        console.error('E: RejectFriendRequest ' + e.toString())

        throw e

    }

}