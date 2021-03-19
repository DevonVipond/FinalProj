import { Activity } from "./Activity";
import { Friend } from "./Friend";
import { FriendRequest } from "./FriendRequest";
import { Match } from "./Match";
import { PremiumUser } from "./PremiumUser";
import { RegularUser } from "./RegularUser";

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



const matches = [
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

const friendReqs = [
    new FriendRequest({ id: '1', username: 'Tupac Shakir', distance: '15km', activities: activitiesA }),
    new FriendRequest({ id: '2', username: 'Biggie', distance: '10km', activities: activitiesB }),
    new FriendRequest({ id: '3', username: 'Zeus', distance: '1km', activities: activitiesC }),
    new FriendRequest({ id: '4', username: 'Charlie', distance: '22km', activities: activitiesD }),
    new FriendRequest({ id: '5', username: 'Cardi B', distance: '75km', activities: activitiesA }),
    new FriendRequest({ id: '6', username: 'Barack Obama', distance: '45km', activities: activitiesA }),
    new FriendRequest({ id: '7', username: 'Starhorse', distance: '1km', activities: activitiesC }),
    new FriendRequest({ id: '8', username: 'Mario', distance: '1km', activities: activitiesB }),
    new FriendRequest({ id: '9', username: 'Jonah', distance: '5km', activities: activitiesD }),
    new FriendRequest({ id: '10', username: 'Alex', distance: '7km', activities: activitiesB }),
]


const friends = [
    new Friend({ username: 'Karma', distance: '15km', activities: activitiesA }),
    new Friend({ username: 'Alexandro', distance: '10km', activities: activitiesB }),
    new Friend({ username: 'James', distance: '1km', activities: activitiesC }),
    new Friend({ username: 'Optimus', distance: '22km', activities: activitiesD }),
    new Friend({ username: 'Rocket Man', distance: '75km', activities: activitiesA }),
    new Friend({ username: 'Nas', distance: '45km', activities: activitiesA }),

]

export class UserState {

    private static instance: UserState;
    public _currentUser: PremiumUser | RegularUser 
    public _incomingFriendRequests: Array<FriendRequest> = friendReqs
    public _friends: Array<Friend> = friends
    public _matches: Array<Match> = matches

    constructor() {
        if (UserState.instance) {
            throw new Error("Error - use UserState.getInstance()");
        }

        const username: string = 'Zeus'
        const distance: string = '10'
        const activities: Array<Activity> = [
            new Activity({name: Activity.ActivityNames.SOCCER, skillLevel: 'beginner'}),
            new Activity({name: Activity.ActivityNames.FOOTBALL, skillLevel: 'advanced'}),
        ]

        this._currentUser = new PremiumUser({username, distance, activities})
    }

    static Instance(): UserState {
        UserState.instance = UserState.instance || new UserState();
        const a = UserState.instance._currentUser.activities().length
        console.log('UserState -> current user activites: ' + a)
        return UserState.instance;
    }

}