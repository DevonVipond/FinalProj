import { api } from "../../Api/Api";
import { FriendRequest } from "../../Models/FriendRequest";
import { UserState } from "../../Models/UserState";
import {Activity} from "../../Models/Activity";
import {Friend} from "../../Models/Friend";

export async function GetIncomingFriendRequests(): Promise<Array<FriendRequest>> {
    const activitiesA = [
        new Activity({name: Activity.ActivityNames.SOCCER, skillLevel: 'beginner'}),
        new Activity({name: Activity.ActivityNames.FOOTBALL, skillLevel: 'advanced'}),
        new Activity({name: Activity.ActivityNames.SKIING, skillLevel: 'intermediate'}),
    ]
    const activitiesB = [
        new Activity({name: Activity.ActivityNames.SOCCER, skillLevel: 'advanced'}),
    ]

    const activitiesC = [
        new Activity({name: Activity.ActivityNames.FOOTBALL, skillLevel: 'intermediate'}),
    ]

    const activitiesD = [
        new Activity({name: Activity.ActivityNames.SKIING, skillLevel: 'advanced'}),
        new Activity({name: Activity.ActivityNames.SOCCER, skillLevel: 'beginner'}),
    ]

    const fake_req: Array<FriendRequest> = [
        new FriendRequest({ id: '1', username: 'Starhorse', distance: '1km', activities: activitiesC }),
        new FriendRequest({ id: '1', username: 'Mario', distance: '1km', activities: activitiesB }),
        new FriendRequest({ id: '1', username: 'Jonah', distance: '5km', activities: activitiesD }),
        new FriendRequest({ id: '1', username: 'Alex', distance: '7km', activities: activitiesB }),
    ]

    try {

        const payload = await api.get('/incomingFriendRequests')

        const friendRequests: Array<FriendRequest> = payload.map((f: any) => {

            return new FriendRequest(f)

        })

        return friendRequests

    } catch (e) {

        console.error('E: GetIncomingFriendRequests ' + e.toString())

        return fake_req

        throw e

    }

}