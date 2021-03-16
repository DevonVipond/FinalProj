import { Friend } from "../../Models/Friend";
import { FriendRequest } from "../../Models/FriendRequest";
import { Match } from "../../Models/Match";
import { FetchFriends } from "../FetchFriends/FetchFriends";
import { GetIncomingFriendRequests } from "../GetIncomingFriendRequests/GetIncomingFriendRequets";
import { GetMatches } from "../GetMatches/GetMatches";

export type BoardT = {
    friends: Array<Friend>,
    matches: Array<Match>,
    friendRequests: Array<FriendRequest>
}

export async function GetBoard(): Promise<BoardT> {

    try {

        const friends: Array<Friend> = await FetchFriends()
        const matches: Array<Match> = await GetMatches()
        const friendRequests: Array<FriendRequest> = await GetIncomingFriendRequests()

        return { friends, matches, friendRequests }

    } catch (e) {

        console.error('E: GetBoard ' + e.toString())
        
        throw e

    }

}