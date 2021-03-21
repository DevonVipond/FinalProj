import { api } from "../../../Api/Api";
import { ReportedUser } from "../../../Models/ReportedUser";

export async function ReviewReports(): Promise<Array<ReportedUser>> {

    try {

        const payload = await api.get('/reports') 

        const reports: Array<ReportedUser> =  payload.map( (report: any) => {

            const { username, reporterComments, timesReported, primaryKey } = report

            return { username, reporterComments, timesReported, primaryKey }
        } )

        return Promise.resolve(reports)

    } catch (e) {

        console.error('E: ReviewReports ' + e.toString())

        throw e

    }

}