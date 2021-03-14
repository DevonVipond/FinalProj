import React from "react";
import {Activity} from "../../../../../../Model@s/Activity";
import './Item.css'
import ActivityModal from "../../../ActivityModal";

type Props = {
    activity: Activity
}

const Item = ({ activity }: Props ) => {

    const [ showModal, setShowModal ] = React.useState(false)
    return (
        <li id='settingsLi'>
            <div>
                { activity.name() }
                <button id='openModalButton' onClick={() => setShowModal(true)}> + </button>
                <ActivityModal show={showModal} onHide={() => setShowModal(false)}/>
            </div>
        </li>

)
}

export default Item
