
import { matchesApi } from "../../Api/FriendService/FriendService";
import { Activity } from "../../Models/Activity";
import { Match } from "../../Models/Match";
import { UserState } from "../../Models/UserState";

export async function GetMatches(): Promise<Array<Match>> {
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
    
    const fake_matches: Array<Match> = [
        new Match({ username: 'Tupac Shakir', distance: '15km', activities: activitiesA }),
        new Match({ username: 'Biggie', distance: '10km', activities: activitiesB }),
        new Match({ username: 'Zeus', distance: '1km', activities: activitiesC }),
        new Match({ username: 'Charlie', distance: '22km', activities: activitiesD }),
        new Match({ username: 'Cardi B', distance: '75km', activities: activitiesA }),
        new Match({ username: 'Barack Obama', distance: '45km', activities: activitiesA }),
        new Match({ username: 'Starhorse', distance: '1km', activities: activitiesC }),
        new Match({ username: 'Mario', distance: '1km', activities: activitiesB }),
        new Match({ username: 'Jonah', distance: '5km', activities: activitiesD }),
        new Match({ username: 'Alex', distance: '7km', activities: activitiesB }),
    ]

    try {

        return await matchesApi.fetchMatches()

    } catch (e) {

        console.error('E: GetMatches ' + e.toString())

        return UserState.Instance()._matches

        throw e

    }

}