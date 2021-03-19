import { api } from "../../Api/Api"

export async function LoginUser(username: string, password: string): Promise<void> {

    try {

        const body = {username, password}

        await api.post(`login`, body)

        const accountType: string = await api.get(`/accountType`)

        sessionStorage.setItem('auth', accountType)


    } catch (e) {

        console.error('E: Login ' + e.toString())

        sessionStorage.removeItem('auth')

        // TODO: REMOVE
        sessionStorage.setItem('auth', 'regular')
        return;
        
        throw e

    }

}