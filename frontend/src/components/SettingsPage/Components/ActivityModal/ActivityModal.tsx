import React from "react";
import './ActivityModal.css'
import { Checkbox } from "semantic-ui-react";
import { Activity } from "../../../../Models/Activity";
import CreateModal from "../../../Shared/Modal/CreateModal";

const createCheckBoxes = () => {
    let boxes: any = []
    Object.keys(Activity.ActivityNames).forEach((value, idx, array) => {
        const activityName = Activity.ActivityNames[value]
        boxes.push(<Checkbox label={ activityName } />)
    })

    return boxes
}

const ActivityModal = () => {

    return (
        <div className=''>
            <div>
                { createCheckBoxes() }
            </div>
            <div>
                <button>Set</button>
            </div>
        </div>
    )
}

export default CreateModal(ActivityModal)
