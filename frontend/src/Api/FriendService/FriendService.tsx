import { Activity } from "../../Models/Activity"
import { Friend } from "../../Models/Friend"
import { FriendRequest } from "../../Models/FriendRequest"
import { Match } from "../../Models/Match"
import axios from "../../Axios/Axios"
import { PremiumUser } from "../../Models/PremiumUser"
import { RegularUser } from "../../Models/RegularUser"

export abstract class BaseApi {
    protected _api: any = axios

    protected async get(url: string): Promise<any> {

        try {

            const res = await this._api.get(url) 

            if (res.status !== 200) {
                throw Error('BaseApi -> get failed with url ' + url)
            }

            return res.data

        } catch (e) {

            throw e

        }
    }

    protected async post(url: string, body: any = {}): Promise<any> {

        try {

            const res = await this._api.post(url, body) 

            if (res.status !== 200) {
                throw Error('BaseApi->post failed with url ' + url)
            }

            return res.data

        } catch (e) {
            throw e
        }
    }

}

class FriendApi extends BaseApi {

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
   constructor() {
       super()
   }
    
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
    async acceptFriendRequest(request: FriendRequest): Promise<void> {
        try {

            const id = request.getId()
            await super.post(`/friendRequests/:${id}/accept`)

        } catch (e) {

            throw e
            
        }
    }

    /* None */
    async rejectFriendRequest(request: FriendRequest): Promise<void> {
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

class MatchesApi extends BaseApi{

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

class UserSettingsApi extends BaseApi {

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
    async fetchAccountDetails(): Promise<PremiumUser | RegularUser> {
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

    
    async fetchActivities(): Promise<Array<Activity>> {
        try {

            return await super.get('/activities')

        } catch (e) {

            throw e

        }
    }

    async fetchDistance(): Promise<string> {
        try {

            return await super.get('/distance')

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
    async addActivity(activity: Activity): Promise<void> {
        try {

            await super.post('/activities', activity.toJSON())

        } catch (e) {

            throw e
        }
    }

    async removeActivity(activity: Activity): Promise<void> {
        try {

            await super.post('/activities', activity.toJSON())

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

            await super.post('/accountType/upgrade', {'accountType': 'Premium'}) 


        } catch (e) {

            throw e
        }
    }

}

export const friendApi: FriendApi = new FriendApi()
export const matchesApi: MatchesApi = new MatchesApi()
export const userSettingsApi: UserSettingsApi = new UserSettingsApi()
