import './SettingsPage.css'
import React from 'react'
import { Dropdown } from "semantic-ui-react";
import { GetSettings, GetSettingsT } from '../../UseCases/GetSettings/GetSettings';
import { Activity } from '../../Models/Activity';
import {SetSettings} from "../../UseCases/SetSettings/SetSettings";

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

const activityOptions = [
    { key: 1, value: Activity.ActivityNames.SOCCER, text: Activity.ActivityNames.SOCCER },
    { key: 2, value: Activity.ActivityNames.BASKETBALL, text:  Activity.ActivityNames.BASKETBALL},
    { key: 3, value: Activity.ActivityNames.FOOTBALL, text:  Activity.ActivityNames.FOOTBALL},
    { key: 4, value: Activity.ActivityNames.SKIING, text:  Activity.ActivityNames.SKIING},
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
        SetSettings([new Activity({name: selectedActivity, skillLevel: selectedSkillLevel})])
            .then((e: any) => {
                reloadPage()
                alert("Successfully set settings!")
            })
            .catch((e: any) => {console.log("E RegularUserSettingsPage-> " + e)})
    }


    React.useEffect(() => {
        reloadPage()
    }, [])

    if (state.loading) return <h3> Loading </h3>

    const {distance, activities}: any = state
    let selectedActivity: string = Activity.ActivityNames.SOCCER
    let selectedSkillLevel: string = Activity.SkillLevel.BEGINNER

    if (activities && activities.length) {
        selectedActivity = activities[0].name().toLowerCase()
        selectedSkillLevel = activities[0].skillLevel().toLowerCase()
    }

    return (
        <div className='settingsContainer'>
            <Dropdown id={'activityDropdown'} onChange={(e: any, data: any) => {selectedActivity = e.target.textContent;}} clearable options={activityOptions} selection placeholder={activityOptions.find((f: any) => (f.value === selectedActivity))?.value }/>
            <Dropdown id={'skillLevelDropdown'} onChange={(e: any, data: any) => {selectedSkillLevel = e.target.textContent;}} clearable options={skillLevelOptions} selection placeholder={skillLevelOptions.find((f: any) => (f.value === selectedSkillLevel))?.value }/>
            <h3>{ distance }</h3>
            <div className="ui bottom attached button" onClick={(e: any) => save()} id="addButton" >
                <i className="add icon" ></i>
                Save
            </div>
            
        </div>
    )
}

export default RegularUserSettingsPage