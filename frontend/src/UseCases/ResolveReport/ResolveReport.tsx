import { api } from '../../Api/Api'

export async function ResolveReport(primaryKey: string, adminComments: string): Promise<void> {

    try {

        const body = {
            reportRowPrimaryKey: primaryKey,
            adminComments
        }

        await api.post(`/reports/resolve`, body)

        return Promise.resolve()

    } catch (e) {

        console.error('E: ResolveReport ' + e)

        throw e

    }

}
