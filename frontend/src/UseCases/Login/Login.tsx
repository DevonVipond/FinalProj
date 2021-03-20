import { api } from "../../Api/Api"
import authService from "../AuthService"

export async function LoginUser(username: string, password: string): Promise<void> {

    try {

        const longitude = '0'
        const latitude  = '0'
        const body = {username, password, longitude, latitude}

        await api.post(`/user/login`, body)

        const accountType: string = await api.get(`/user/account-type`)

        authService.setAuth(accountType)


    } catch (e) {

        console.error('E: Login ' + e.toString())

        authService.removeAuth()

        throw e

    }

}