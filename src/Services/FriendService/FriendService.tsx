import { Activity } from "../../Models/Activity"
import { Friend } from "../../Models/Friend"
import { FriendRequest } from "../../Models/FriendRequest"
import { Match } from "../../Models/Match"
import axios from "../../Axios/Axios"
import { AuthenticatedUser } from "../../Models/Interfaces/AuthenticatedUser"
import { PremiumUser } from "../../Models/PremiumUser"
import { RegularUser } from "../../Models/RegularUser"
import { stringify } from "querystring"

abstract class BaseService {
    private _api: any = axios

    async get(url: string): Promise<any> {

        try {

            const res = await this._api.get(url) 

            if (res.status !== 200) {
                throw Error('BaseService->get failed with url ' + url)
            }

            return res.data

        } catch (e) {
            throw e
        }
    }

    async post(url: string, body: any = {}): Promise<any> {

        try {

            const res = await this._api.post(url, body) 

            if (res.status !== 200) {
                throw Error('BaseService->post failed with url ' + url)
            }

            return res.data

        } catch (e) {
            throw e
        }
    }

}

class FriendService extends BaseService {

    /*
        {[
            {
                username: ...,
                distance: ...,
                activities: [
                    ...
                ]
            },
            {
                username: ...,
                distance: ...,
                activities: [
                    ...
                ]
            },
            ...
        ]}
    */
    
    async fetchIncomingFriendRequests(): Promise<Array<FriendRequest>> {
        try {

            const payload = await super.get('/incomingFriendRequests')

            const friendRequests: Array<FriendRequest> = payload.map((f: any) => {

                return new FriendRequest(f)

            })

            return friendRequests


        } catch (e) {

            throw e

        }
    }

    /* None */
    async fetchFriends(): Promise<Array<Friend>> {
        try {

            const payload = await super.get('/friends')

            const friends: Array<Friend> = payload.map((f: any) => {

                return new FriendRequest(f)

            })

            return friends


        } catch (e) {

            throw e

        }

    }

    /* None */
    async acceptIncomingFriendship(request: FriendRequest): Promise<void> {
        try {

            const id = request.getId()
            await super.post(`/friendRequests/:${id}/accept`)

        } catch (e) {

            throw e
            
        }
    }

    /* None */
    async rejectIncomingFriendship(request: FriendRequest): Promise<void> {
        try {

            const id = request.getId()
            await super.post(`/friendRequests/:${id}/reject`)

        } catch (e) {

            throw e
            
        }
    }

    /* 
        { username: ... }
    */
    async createFriendRequest(match: Match): Promise<void> {
        try {

            const recipientUsername = match.username()
            await super.post(`/friendRequests/create`, recipientUsername)

        } catch (e) {

            throw e
            
        }

    }
    //async destroyFriendship(): Promise<void> {}
}

class MatchesService extends BaseService{

    /* 
        {[
            {
                username: ...,
                distance: ...,
                activities: {[
                    {
                        name: string,
                        skillLevel: string,
                    },
                    {
                        name: string,
                        skillLevel: string,
                    },
                    ...
                ]}
            },
            {
                username: ...,
                distance: ...,
                activities: {[
                    {
                        name: string,
                        skillLevel: string,
                    },
                    {
                        name: string,
                        skillLevel: string,
                    },
                    ...
                ]}
            }
            ...
        ]}
    */

    async fetchMatches(): Promise<Array<Match>> {

        try {

        const payload = await super.get('/matches') 

        const matches: Array<Match> =  payload.map( (match: any) => {

            const username = match['username']
            const distance = match['distance']

            const activities: Array<Activity> = match['activities'].map((activity: any) => {

                return new Activity(activity)

            })

            return new Match({username, distance, activities})
        })

        return matches


        } catch (e) {
            throw e
        }

    }
}

class UserSettingsService extends BaseService {

    /*
        {
            distance: ...,
            accountType: ...,
            username: ...,
            activities: [
                {
                    name: ...,
                    skillLevel: ...
                },
                {
                    name: ...,
                    skillLevel: ...
                }
                ...
            ],
        }
    */ 
    async fetchUserSettings(): Promise<PremiumUser | RegularUser> {
        try {

            const payload = await super.get('/settings')

            const activities: Array<Activity> = payload['activities'].map( (elm:  any) => {

                const name = elm['name']
                const skillLevel = elm['skillLevel']

                return new Activity({name, skillLevel})

            })

            const distance = payload['distance']

            const accountType = payload['accountType']
            let username = ''

            switch (accountType) {

                case 'Premium':

                    return new PremiumUser({activities, distance, username})

                case 'Regular':

                    return new RegularUser({activities, distance, username})

                default:

                    throw Error('Unknown account type: ' + accountType)

            }

        } catch (e) {

            throw e
        }
    }

    /*
        {[
            {
                name: ...,
                skillLevel: ...
            },
            {
                name: ...,
                skillLevel: ...
            }
            ...
        ]}
    */
    async updateActivities(activities: Array<Activity>): Promise<void> {
        try {

            let activitiesJson = activities.map(activity => {
                return activity.toJSON()
            })

            await super.post('/activities', activitiesJson)


        } catch (e) {

            throw e
        }
    }

    /*
        { distance: ... }
    */
    async updateDistance(distance: string): Promise<void> {
        try {

            await super.post('/distance', distance)


        } catch (e) {

            throw e
        }
    }

    /*
        { accountType: Premium }
    */ 
    async upgradeToPremium(): Promise<void> {
        try {

            await super.post('/accountType', {'accountType': 'Premium'}) 


        } catch (e) {

            throw e
        }
    }

}

export const friendService: FriendService = Object.freeze(new FriendService())
export const matchesService: MatchesService = Object.freeze(new MatchesService())
export const userSettingsService: UserSettingsService = Object.freeze(new UserSettingsService())
