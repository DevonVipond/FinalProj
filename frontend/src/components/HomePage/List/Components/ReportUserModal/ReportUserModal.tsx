import createModal from "../../../../Shared/Modal/CreateModal"
import 'semantic-ui-css/semantic.min.css';

const ReportUserModal = ({ reportFriend, onHide }: {reportFriend: Function, onHide: any}) => {
    //const reportFriendAndClose = (e: any, reportUserInputId: string) => {
    //    reportFriend(e, reportUserInputId)
    //}

    return (
        <div className='container' >
            <input id="reportUserInput" type='text' />
            <div className="ui bottom attached button" onClick={(e: any) => reportFriend(e, "reportUserInput")} id="addButton">
                <i className="add icon" ></i>
                Submit
            </div>
        </div>
    )
}


const modal = createModal(ReportUserModal)

export default modal

