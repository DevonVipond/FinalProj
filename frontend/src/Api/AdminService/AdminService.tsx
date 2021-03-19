import { User } from "../../Models/Interfaces/User";
import { BaseApi } from "../FriendService/FriendService"

class AdminApi extends BaseApi {

    async getReportedUsers(): Promise<any> { }
    async suspendUser(user: User): Promise<void> { }

}