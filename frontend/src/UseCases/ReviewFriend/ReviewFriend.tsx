import { api } from "../../Api/Api"
import { Friend } from "../../Models/Friend"

export async function ReviewFriend(friend: Friend, rating: string): Promise<void> {

    try {

        const body = {
            friendUsername: friend.username(),
            rating
        }

        await api.post(`/friends/review`, body)

        return Promise.resolve()

    } catch (e) {

        console.error('E: ReviewFriend ' + e.toString())
        
        throw e

    }

}