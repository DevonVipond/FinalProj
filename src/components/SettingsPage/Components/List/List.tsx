import React from "react";
import './List.css'
import './Components/Item/index'
import { Checkbox } from "semantic-ui-react";
                    //defaultChecked ? (<Checkbox onClick={} defaultChecked label={activityName} />) : (<Checkbox label={activityName} />)

const ActivityItem = (activityName: string, defaultChecked: boolean = false) => {
    const activityClicked = () => {
        console.log('activity clicked')
    }
    return (
        <li>
            <div>
                {
                    defaultChecked ? (<Checkbox onClick={activityClicked} defaultChecked label={activityName} />) : (<Checkbox label={activityName} />)
                }

            </div>
        </li>
    )
}

type Props = {
    checkedItems: Array<string>,
    uncheckedItems: Array<string>
}

const List = ({ checkedItems, uncheckedItems }: Props) => {
    const [ checkedActivities, setCheckedActivities ] = React.useState()

    return (
        <div>
            <div className='list'>
                <div className='head'>
                    <h3>Activities</h3>
                </div>
                <ul>
                    { checkedItems.map(a => ( ActivityItem(a, true) )) }
                    { uncheckedItems.map(a => ( ActivityItem(a) )) }
                </ul>

            </div>
        </div>
    )
}

export default List
