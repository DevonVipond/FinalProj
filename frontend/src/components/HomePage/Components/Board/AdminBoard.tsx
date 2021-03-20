import List from './Components/LIst/ListContainer'
import { ReportedUserItem } from "./Components/LIst/Components/Item/Item";
import { ReportedUser } from "../../../../Models/ReportedUser";

const createReportedUsersList = (title: string, users: Array<ReportedUser>, reloadBoard: Function) => {
    return (
        <List title={title}>
            { users.map(a => <ReportedUserItem user={a} reloadBoard={reloadBoard}/>) }
        </List>

    )
}

type Props = {
    reportedUsers: Array<ReportedUser>,
    reloadBoard: Function,
}

const AdminBoard = ({ reportedUsers, reloadBoard }: Props) => {

    return (
        <div id='board'>
            { createReportedUsersList('Reported Users', reportedUsers, reloadBoard) }
        </div>
    )
}

export default AdminBoard