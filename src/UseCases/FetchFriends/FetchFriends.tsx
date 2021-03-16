import { api } from "../../Api/Api";
import { friendApi } from "../../Api/FriendService/FriendService";
import { Activity } from "../../Models/Activity";
import { Friend } from "../../Models/Friend";
import { FriendRequest } from "../../Models/FriendRequest";

export async function FetchFriends(): Promise<Array<Friend>> {

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

    const friends = [
        new FriendRequest({ id: '1', username: 'Karma', distance: '15km', activities: activitiesA }),
        new FriendRequest({ id: '1', username: 'Alexandro', distance: '10km', activities: activitiesB }),
        new FriendRequest({ id: '1', username: 'James', distance: '1km', activities: activitiesC }),
        new FriendRequest({ id: '1', username: 'Optimus', distance: '22km', activities: activitiesD }),
        new FriendRequest({ id: '1', username: 'Rocket Man', distance: '75km', activities: activitiesA }),
        new FriendRequest({ id: '1', username: 'Nas', distance: '45km', activities: activitiesA }),
    ]


    try {

        const payload = await api.get('/friends')

        const friends: Array<Friend> = payload.map((f: any) => {

            return new FriendRequest(f)

        })

        return friends

    } catch (e) {

        console.error('E: FetchFriends ' + e.toString())

        return friends

        throw e

    }

}
