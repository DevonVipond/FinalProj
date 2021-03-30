import { api } from "../../Api/Api"
import authService from "../AuthService"
import locationService from "../LocationService"

export async function LoginUser(username: string, password: string): Promise<void> {

    try {

        const { latitude, longitude } = await locationService.getCoordinates()
        const body = {username, password, longitude, latitude}

        await api.post(`/user/login`, body)

        const { accountType }: any = await api.get(`/user/account-type`)

        authService.setAuth(accountType)
        authService.setUsername(username)


    } catch (e) {

        console.error('E: LoginUser ' + e.toString())

        authService.removeAuth()

        throw e

    }

}

export async function LoginAdmin(username: string, password: string): Promise<void> {

    try {

        const { latitude, longitude } = await locationService.getCoordinates()
        const body = {username, password, longitude, latitude}

        await api.post(`/admin/login`, body)

        authService.setAuth('Admin')
        authService.setUsername(username)


    } catch (e) {

        console.error('E: LoginAdmin ' + e.toString())

        authService.removeAuth()

        throw e

    }

}