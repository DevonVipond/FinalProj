import { api } from "../../Api/Api"
import { LoginUser } from "../Login/Login"

const REGULAR_ACCOUNT = 'Regular'
const PREMIUM_ACCOUNT = 'Premium'
export async function Register(username: string, password: string, accountType: string): Promise<void> {

    try {

        if (accountType !== REGULAR_ACCOUNT && accountType !== PREMIUM_ACCOUNT ) {

            throw Error('Unknown account type: ' + accountType)

        }

        const body = {username, password, accountType}

        await api.post(`/register`, body)

        sessionStorage.setItem('auth', accountType)

    } catch (e) {

        console.error('E: GetBoard ' + e.toString())

        sessionStorage.removeItem('auth')
        
        throw e

    }

}