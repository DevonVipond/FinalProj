import { api } from '../../Api/Api'

export async function DeleteUser(username: string, primaryKey: string): Promise<void> {

    try {

        const body = {
            usernameOfUserToDelete: username,
            reportRowPrimaryKey: primaryKey
        }

        await api.post(`/users/delete`, body)

        return Promise.resolve()

    } catch (e) {

        console.error('E: DeleteUser ' + e)

        throw e

    }

}
