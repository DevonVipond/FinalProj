import './SettingsPage.css'
import {AuthenticatedUser} from "../../Models/Interfaces/AuthenticatedUser";
import List from './Components/List/index'
import Item from './Components/List/Components/Item/index'
import {Activity} from "../../Models/Activity";
import {Button, Input} from "semantic-ui-react";

type Props = {
    authenticatedUser: AuthenticatedUser
}
const SettingsPage = ({ authenticatedUser }: Props) => {
    const defaultCheckedItems: Array<string> = authenticatedUser.activities().map(a => a.name())
    const defaultUncheckedItems: Array<string> = []

    Object.keys(Activity.ActivityNames).forEach(key => {
        const activityName = Activity.ActivityNames[key]
        if (!defaultCheckedItems.filter(a => a === activityName).length) {
            defaultUncheckedItems.push(activityName)
        }
    })

    return (
        <div className='settingsContainer'>
            <List
                checkedItems={defaultCheckedItems}
                uncheckedItems={defaultUncheckedItems}
            />
            <div className='marginDiv'>
                <Input focus placeholder='distance' />
            </div>
            <div className='marginDiv'>
                <Button color="blue">Save</Button>
            </div>
            <div className='marginDiv'>
                <Button positive>Upgrade To Premium</Button>
            </div>
        </div>
    )
}

export default SettingsPage