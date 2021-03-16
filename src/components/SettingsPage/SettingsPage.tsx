import './SettingsPage.css'
import List from './Components/List/index'
import React from 'react'
import { GetDistance } from '../../UseCases/GetDistance/GetDistance';
import { SetDistance } from '../../UseCases/SetDistance/SetDistance';

type Props = {
    getActivities: Function,
    addActivity: Function,
    removeActivity: Function,
}

const SettingsPage = ({ getActivities, addActivity, removeActivity }: Props) => {
    const [distance, setTheD] = React.useState<string>('0')

    const saveDistance = (e: any) => { 
        console.log(e)
        //if (e.key === 'Enter' || e.keycode === 13) {
            const distance: string = e.target.value.toString()
            SetDistance(distance)
                .then((e: any) => {
                    setTheD(distance)
                })
                .catch((e: any) => {
                    console.log('SettingsPage-> unable to update distance')
                    console.log(e)
                })
       // }
    }

    React.useEffect(() => {
        GetDistance().then(d => {
            setTheD(d)
        }).catch(e => {
            console.log('SettingsPage-> unable to get distance')
        })
    }, [])

    return (
        <div className='settingsContainer'>
            <List getActivities={getActivities} addActivity={addActivity} removeActivity={removeActivity} />
            <div id='distanceButton' className='marginDiv'>
                <input type="number" value={distance} onChange={e => saveDistance(e)} min="5" max="50" step="5"/>
            </div>
        </div>
    )
}

export default SettingsPage