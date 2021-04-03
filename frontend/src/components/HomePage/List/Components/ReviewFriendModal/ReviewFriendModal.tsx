import createModal from "../../../../Shared/Modal/CreateModal"
import 'semantic-ui-css/semantic.min.css';
import {Dropdown} from "semantic-ui-react";
import React from "react";
import {Activity} from "../../../../../Models/Activity";

const ReviewFriendModal = ({ reviewFriend, onHide }: {reviewFriend: Function, onHide: any}) => {
    const dropdownOptions = [
        { key: 1, value: '1', text: '1'},
        { key: 2, value: '2', text: '2'},
        { key: 3, value: '3', text: '3'},
        { key: 4, value: '4', text: '4'},
        { key: 5, value: '5', text: '5'},
    ]

    let dropdownSelection: string = '1'

    return (
        <div className='container' >
            <Dropdown id={'skillLevelDropdown'} onChange={(e: any, data: any) => {dropdownSelection = e.target.textContent;}} clearable options={dropdownOptions} selection placeholder={'1'}/>
            <div className="ui bottom attached button" onClick={(e: any) => reviewFriend(e, dropdownSelection)} id="addButton">
                <i className="add icon" ></i>
                Submit
            </div>
        </div>
    )
}

const modal = createModal(ReviewFriendModal)
export default modal
