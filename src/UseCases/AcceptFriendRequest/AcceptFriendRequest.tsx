import { friendApi } from "../../Api/FriendService/FriendService";
import { FriendRequest } from "../../Models/FriendRequest";


export async function AcceptFriendRequest(request: FriendRequest): Promise<void> {

    try {

        await friendApi.acceptFriendRequest(request)

    } catch (e) {

        console.error('E: AcceptFriendRequest ' + e)

        throw e

    }

}
