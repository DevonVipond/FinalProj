import { api } from '../../Api/Api'
import { Match } from '../../Models/Match'


export async function ConnectWithMatch(match: Match, message: string): Promise<void> {

    try {

        const username: string = match.username()
        await api.post(`/matches/:${username}/connect`, message)

    } catch (e) {

        console.error('E: ConnectWithMatch ' + e)

        throw e

    }

}
