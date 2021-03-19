import { api } from "../../Api/Api";
import { FriendRequest } from "../../Models/FriendRequest";
import { UserState } from "../../Models/UserState";

export async function GetIncomingFriendRequests(): Promise<Array<FriendRequest>> {

    try {

        const payload = await api.get('/incomingFriendRequests')

        const friendRequests: Array<FriendRequest> = payload.map((f: any) => {

            return new FriendRequest(f)

        })

        return friendRequests

    } catch (e) {

        console.error('E: GetMatches ' + e.toString())

        return UserState.Instance()._incomingFriendRequests

        throw e

    }

}