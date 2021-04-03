import { api } from "../../Api/Api";
import { Activity } from "../../Models/Activity";
import { Friend } from "../../Models/Friend";
import { FriendRequest } from "../../Models/FriendRequest";
import { Match } from "../../Models/Match";

export type BoardT = {
    friends: Array<Friend>,
    matches: Array<Match>,
    friendRequests: Array<FriendRequest>
}

export async function GetHome(): Promise<BoardT> {
    try {

        const payload = await api.get('/user/home')

        const matches: Array<Match> =  payload['matches'].map( (match: any) => {

            const username = match['username']
            const distance = match['distance']
            const averageReviewScore = match['averageReviewScore']

            const activities: Array<Activity> = match['activities'].map((activity: any) => {

                return new Activity(activity)

            })

            return new Match({username, distance, activities, averageReviewScore})
        })

        const friendRequests: Array<FriendRequest> = payload['incomingFriendRequests'].map((f: any) => {

            const id = "1"
            const username = f['username']
            const distance = f['distance']
            const message = f['message']
            const averageReviewScore = f['averageReviewScore']
            const activities: Array<Activity> = f['activities'].map((activity: any) => {

                return new Activity(activity)

            })

            return new FriendRequest({id, username, distance, activities, message, averageReviewScore})

        })

        const friends: Array<Friend> = payload['friends'].map((f: any) => {

            const username = f['username']
            const distance = f['distance']
            const averageReviewScore = f['averageReviewScore']
            const activities: Array<Activity> = f['activities'].map((activity: any) => {

                return new Activity(activity)

            })

            return new Friend({username, distance, activities, averageReviewScore})

        })

        return Promise.resolve({ matches, friendRequests, friends })

    } catch (e) {

        console.error('E: GetHome ' + e.toString())

        throw e

    }

}