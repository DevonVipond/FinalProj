import { api } from "../../Api/Api"
import { Friend } from "../../Models/Friend"

export async function ReportFriend(friend: Friend, message: string): Promise<void> {

    try {

        const body = {
            reportedFriendUsername: friend.username(),
            message
        }

        await api.post(`/friends/report`, body)

        return Promise.resolve()

    } catch (e) {

        console.error('E: ReportFriend ' + e.toString())
        
        throw e

    }

}