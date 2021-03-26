import { api } from '../../Api/Api'
import { ReportedUser } from '../../Models/ReportedUser'

export async function GetReportedUsers(): Promise<Array<ReportedUser>> {

    try {

        const reports: Array<ReportedUser>  = await api.get('/reports')

        //return [
        //    { username: 'BurntMarshmellow', reporterComments: 'This guy is not a good sport',
        //        timesReported: '2', primaryKey: '2', },
        //    { username: 'Sunny', reporterComments: 'This guy is not nice',
        //        timesReported: '7', primaryKey: '2', },
        //    { username: 'Jia', reporterComments: 'A little too eccentric',
        //        timesReported: '4', primaryKey: '2', }
        //]


        return Promise.resolve(reports)

    } catch (e) {

        console.error('E: GetReportedUsers ' + e)

        throw e

    }

}
