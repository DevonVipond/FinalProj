import { api } from '../../Api/Api'
import { ReportedUser } from '../../Models/ReportedUser'

export async function GetReportedUsers(): Promise<Array<ReportedUser>> {

    try {

        const reports: Array<ReportedUser>  = await api.get('/reports')

        return Promise.resolve(reports)

    } catch (e) {

        console.error('E: GetReportedUsers ' + e)

        throw e

    }

}
