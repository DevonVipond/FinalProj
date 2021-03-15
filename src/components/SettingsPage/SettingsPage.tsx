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
    const [distance, setD] = React.useState<string>('0')

    const dist = (e: any) => { 
        //if (e.key === 'Enter' || e.keycode === 13) {
            const distance: string = e.target.value.toString()
            SetDistance(distance)
                .then((e: any) => {
                    setD(distance)
                })
                .catch((e: any) => {
                    console.log('SettingsPage-> unable to update distance')
                    console.log(e)
                })
       // }
    }

    React.useEffect(() => {
        GetDistance().then(d => {
            setD(d)
        }).catch(e => {
            console.log('SettingsPage-> unable to get distance')
        })
    }, [])

                //<Input focus min="0" max="50" step="10" onChange={e => dist(e)} placeholder={distance} />
    return (
        <div className='settingsContainer'>
            <List getActivities={getActivities} addActivity={addActivity} removeActivity={removeActivity} />
            <div id='distanceButton' className='marginDiv'>
                <input type="number" value={distance} onChange={e => dist(e)} min="5" max="50" step="5"/>
            </div>
        </div>
    )
}

export default SettingsPage