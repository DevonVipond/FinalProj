import './SettingsPage.css'
import { Select } from 'semantic-ui-react'
import React from 'react'
import { GetSettings, GetSettingsT } from '../../UseCases/GetSettings/GetSettings';
import { Activity } from '../../Models/Activity';
import { AddActivity } from '../../UseCases/AddActivity/AddActivity';

type State = {
    loading: boolean,
    activities?: Array<Activity>,
    distance?: string,
}

const skillLevelOptions = [
    { key: 1, value: Activity.SkillLevel.BEGINNER, text: Activity.SkillLevel.BEGINNER },
    { key: 2, value: Activity.SkillLevel.INTERMEDIATE, text: Activity.SkillLevel.INTERMEDIATE},
    { key: 3, value: Activity.SkillLevel.ADVANCED, text: Activity.SkillLevel.ADVANCED },
]

const RegularUserSettingsPage = () => {
    const [state, setState] = React.useState<State>({loading: true})

    const reloadPage = () => {
        GetSettings()
            .then((s: GetSettingsT) => {
                setState({loading: false, activities: s.activities, distance: s.distance})
            })
            .catch((e: any) => {
                console.log(e)
                setState({ loading: false })
            })

    }

    const save = () => {
        const activitySelector = document.getElementById('activitySelector')
        const skillSelector = document.getElementById('skillSelector')

        if (activitySelector && skillSelector) {
            const name: any = activitySelector.textContent
            const skillLevel: any = skillSelector.textContent

            if (name && skillLevel) {
                const activity = new Activity({name, skillLevel})

                AddActivity(activity)
                    .then((e: any) => {
                        reloadPage()
                    })
                    .catch((e: any) => {console.log("E RegularUserSettingsPage-> " + e)})
                }
            }
    }


    React.useEffect(() => {
        reloadPage()
    }, [])

    const {distance, activities}: any = state
    const selectedActivity:string = activities[0].name()

    return (
        <div className='settingsContainer'>
            <Select id="activitySelector" onChange={(e: any) => console.log(e)} defaultValue={selectedActivity} placeholder='Skill Level' options={skillLevelOptions} />
            <Select id="skillSelector" onChange={(e: any) => console.log(e)} defaultValue={selectedActivity} placeholder='Skill Level' options={skillLevelOptions} />
            <h3>{ distance }</h3>
            <div className="ui bottom attached button" onClick={(e: any) => save()} id="addButton" >
                <i className="add icon" ></i>
                Save
            </div>
            
        </div>
    )
}

export default RegularUserSettingsPage