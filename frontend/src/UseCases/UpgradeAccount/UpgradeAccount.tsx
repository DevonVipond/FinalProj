import { api } from "../../Api/Api";


export async function UpgradeAccount(): Promise<void> {

    try {

        await api.post('/accountType', {'accountType': 'Premium'}) 

    } catch (e) {

        console.error('E: AddActivity ' + e.toString())

        throw e

    }

}

