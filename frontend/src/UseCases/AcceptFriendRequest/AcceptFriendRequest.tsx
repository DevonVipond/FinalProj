import { api } from "../../Api/Api";
import { FriendRequest } from "../../Models/FriendRequest";
import { UserState } from "../../Models/UserState";


export async function AcceptFriendRequest(request: FriendRequest, message: string): Promise<void> {

    try {

        const body = {
            requestorUsername: request.username(),
            message
        }

        await api.post(`/friend-requests/accept`, body)

        return Promise.resolve()

    } catch (e) {

        console.error('E: AcceptFriendRequest ' + e)

        throw e

    }

}
