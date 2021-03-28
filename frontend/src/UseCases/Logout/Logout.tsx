import { api } from "../../Api/Api"
import authService from "../AuthService"

export async function Logout(): Promise<void> {

    try {

        await api.post('/logout')

        authService.removeAuth()

    } catch (e) {

        console.error('E: LogoutUser ' + e.toString())

        authService.removeAuth()

        throw e

    }

}

export default Logout