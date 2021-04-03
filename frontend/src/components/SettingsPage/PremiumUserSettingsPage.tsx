import './SettingsPage.css'
import React, {useEffect} from 'react'
import {Activity} from "../../Models/Activity";
import {Checkbox} from "semantic-ui-react";
import {SetSettings} from "../../UseCases/SetSettings/SetSettings";
import {GetSettings, GetSettingsT} from "../../UseCases/GetSettings/GetSettings";

type State = {
    loading: boolean,
    activities?: Array<Activity>,
    distance?: string,
}

const PremiumUserSettingsPage = () => {
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
        let activities: Array<Activity> = []
        activityAndSkillIds.forEach((value: Array<string>) => {
            const activityCheckboxId = value[0]
            const skillLevelSelectorId = value[1]
            const activityHtml: any = document.getElementById(activityCheckboxId)
            const skillLevelHtml: any = document.getElementById(skillLevelSelectorId)
            console.log('activityHtml',  activityHtml.id)
            console.log('skillHtml',  skillLevelHtml.value)
            if (activityHtml && activityHtml.checked && skillLevelHtml) {
                const name = activityHtml.id
                const skillLevel = skillLevelHtml.value
                activities.push(new Activity({name, skillLevel}))
            }
        })

        const distance: any = document.getElementById('distanceInput')

        if (distance)
        SetSettings(activities, distance.value)
            .then((e: any) => {
                reloadPage()
                alert("Successfully set settings!")
            })
            .catch((e: any) => {console.log("E RegularUserSettingsPage-> " + e)})
    }

    useEffect(() => {reloadPage()}, [])

    if (state.loading) return <h3>Loading</h3>
    if (!state.activities || !state.distance) return <h3>Failed to load page!</h3>

    let activityAndSkillIds: Array<Array<string>> = []
    return (
        <div className='settingsContainer'>
            <div>
                <div className='list'>
                    <div className='head'>
                        <h3>Activities</h3>
                    </div>
                    <ul>
                        {
                            Object.values(Activity.ActivityNames).map((activityName: string) => {
                                // @ts-ignore
                                const activitySetting = state.activities.find((savedActivity: Activity) => {return savedActivity.name() === activityName})
                                const defaultChecked: boolean = !!activitySetting
                                const activityCheckboxId: string =  activityName
                                const skillLevelSelectId: string = 'select' + activityName
                                // @ts-ignore
                                const defaultSkillLevel: string = defaultChecked ? activitySetting.skillLevel() : Activity.ActivityNames.BEGINNER
                                console.log('defaultSkill', defaultSkillLevel)

                                activityAndSkillIds.push([activityCheckboxId, skillLevelSelectId])

                                return (
                                    <li style={{marginBottom: '40px', display:"flex", flexDirection: "column"}}>
                                            {defaultChecked &&  <Checkbox id={activityCheckboxId}  label={activityName} defaultChecked/> }
                                            {!defaultChecked &&  <Checkbox id={activityCheckboxId}  label={activityName}/> }
                                                <select id={skillLevelSelectId} defaultValue={defaultSkillLevel} >
                                                    { Object.values(Activity.SkillLevel).map((skillLevel: string) => {
                                                        if (defaultSkillLevel === skillLevel) {
                                                            return <option selected value={skillLevel}>{ skillLevel }</option>
                                                        }
                                                        return <option value={skillLevel}>{ skillLevel }</option>
                                                    }) }
                                                </select>
                                    </li>
                                )
                            })
                        }
                    </ul>

                </div>
            </div>
            <h5>Distance (Km)</h5>
            <div id='distanceButton' className='marginDiv'>
                <input type="number" id='distanceInput' defaultValue={state.distance}  min="5" max="50" step="5"/>
            </div>
            <div className="ui bottom attached button" onClick={(e: any) => save()} id="addButton" >
                <i className="add icon" ></i>
                Save
            </div>
        </div>
    )
}

export default PremiumUserSettingsPage