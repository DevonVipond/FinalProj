import { api } from '../../Api/Api'
import { Match } from '../../Models/Match'
import { UserState } from '../../Models/UserState'


export async function ConnectWithMatch(match: Match, message: string): Promise<void> {

    try {

        const username: string = match.username()
        await api.post(`/matches/:${username}/connect`, message)

    } catch (e) {

        console.error('E: ConnectWithMatch ' + e)

        UserState.Instance()._matches = UserState.Instance()._matches.filter((a: Match) => {return a.username() !== match.username()})
        return;

        throw e

    }

}
