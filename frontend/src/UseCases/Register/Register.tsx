import { api } from "../../Api/Api"
import authService from "../AuthService"
import locationService from "../LocationService"
import { LoginUser } from "../Login/Login"

const REGULAR_ACCOUNT = 'Regular'
const PREMIUM_ACCOUNT = 'Premium'
export async function Register(username: string, password: string,
                               firstName: string, lastName: string,
                               phoneNumber: string, age: string,
                               about: string, accountType: string, gender: string ): Promise<void> {

    try {

        const { latitude, longitude } = await locationService.getCoordinates()


        if (accountType !== REGULAR_ACCOUNT && accountType !== PREMIUM_ACCOUNT ) {
            throw Error('Unknown account type: ' + accountType)
        }

        if (!firstName || !username || !lastName  || !accountType || !phoneNumber || !age || !about || !gender) {

            console.log(firstName,  username,  lastName,  accountType,  phoneNumber,  age,  about,  gender)
            throw new Error('UseCases-> Register -> Missing arguments! ')

        }

        const body = {username, password, firstName, lastName, phoneNumber, age, about, accountType, latitude, longitude, gender}

        await api.post(`/user/register`, body)

        authService.setAuth(accountType)
        authService.setUsername(username)

    } catch (e) {

        console.error('E: Register ' + e.toString())

        authService.removeAuth()
        
        throw e

    }

}