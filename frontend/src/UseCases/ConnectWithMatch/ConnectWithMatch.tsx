import { api } from '../../Api/Api'
import { Match } from '../../Models/Match'
import { UserState } from '../../Models/UserState'


export async function ConnectWithMatch(match: Match, message: string): Promise<void> {

    try {

        const body = {
            message,
            recipientUsername: match.username()
        }

        await api.post(`/matches/connect`, body)

        return Promise.resolve()

    } catch (e) {

        console.error('E: ConnectWithMatch ' + e)

        throw e

    }

}
