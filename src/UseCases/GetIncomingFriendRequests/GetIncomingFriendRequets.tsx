import { friendApi } from "../../Api/FriendService/FriendService";
import { Activity } from "../../Models/Activity";
import { FriendRequest } from "../../Models/FriendRequest";
import { UserState } from "../../Models/UserState";

export async function GetIncomingFriendRequests(): Promise<Array<FriendRequest>> {

    try {

        return await friendApi.fetchIncomingFriendRequests()

    } catch (e) {

        console.error('E: GetMatches ' + e.toString())

        return UserState.Instance()._incomingFriendRequests

        throw e

    }

}