import { friendApi } from "../../Api/FriendService/FriendService";
import { Activity } from "../../Models/Activity";
import { FriendRequest } from "../../Models/FriendRequest";

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
    
    const fake_req = [
        new FriendRequest({ id: '1', username: 'Tupac Shakir', distance: '15km', activities: activitiesA }),
        new FriendRequest({ id: '1', username: 'Biggie', distance: '10km', activities: activitiesB }),
        new FriendRequest({ id: '1', username: 'Zeus', distance: '1km', activities: activitiesC }),
        new FriendRequest({ id: '1', username: 'Charlie', distance: '22km', activities: activitiesD }),
        new FriendRequest({ id: '1', username: 'Cardi B', distance: '75km', activities: activitiesA }),
        new FriendRequest({ id: '1', username: 'Barack Obama', distance: '45km', activities: activitiesA }),
        new FriendRequest({ id: '1', username: 'Starhorse', distance: '1km', activities: activitiesC }),
        new FriendRequest({ id: '1', username: 'Mario', distance: '1km', activities: activitiesB }),
        new FriendRequest({ id: '1', username: 'Jonah', distance: '5km', activities: activitiesD }),
        new FriendRequest({ id: '1', username: 'Alex', distance: '7km', activities: activitiesB }),
    ]

    try {

        return await friendApi.fetchIncomingFriendRequests()

    } catch (e) {

        console.error('E: GetMatches ' + e.toString())

        return fake_req

        throw e

    }

}