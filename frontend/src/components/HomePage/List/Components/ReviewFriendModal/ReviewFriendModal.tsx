import createModal from "../../../../Shared/Modal/CreateModal"
import 'semantic-ui-css/semantic.min.css';

const ReviewFriendModal = ({ reviewFriend, onHide }: {reviewFriend: Function, onHide: any}) => {
    //const reviewFriendAndClose = (e: any, reviewUserInputId: string) => {
    //    reviewFriend(e, reviewUserInputId)
    //}

    return (
        <div className='container' >
            <input type="number" id="reviewUserInput" name="quantity" min="1" max="5"/>
            <div className="ui bottom attached button" onClick={(e: any) => reviewFriend(e, "reviewUserInput")} id="addButton">
                <i className="add icon" ></i>
                Submit
            </div>
        </div>
    )
}

const modal = createModal(ReviewFriendModal)
export default modal
