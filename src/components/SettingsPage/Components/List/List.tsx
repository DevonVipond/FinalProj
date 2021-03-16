import React from "react";
import { Select } from 'semantic-ui-react'
import './List.css'
import './Components/Item/index'
import { Checkbox } from "semantic-ui-react";
import { Activity } from "../../../../Models/Activity";
                    
const ActivityItem = (clicked: Function, activityName: string, defaultChecked: boolean = false) => {

    const skillLevelOptions = [
        { key: 1, value: Activity.SkillLevel.BEGINNER, text: 'Beginner' },
        { key: 2, value: Activity.SkillLevel.INTERMEDIATE, text: 'Intermediate'},
        { key: 3, value: Activity.SkillLevel.ADVANCED, text: 'Advanced' },
    ]

    return (
        <li style={{marginBottom: defaultChecked? '70px' : '10px'}}>
            <div>
                {
                    defaultChecked ? (<Checkbox onClick={(e: any) => clicked(e, activityName)} defaultChecked label={activityName} />) :
                                     (<Checkbox onClick={(e: any) => clicked(e, activityName)} label={activityName} />)
                }
                { defaultChecked && <Select placeholder='Skill Level' options={skillLevelOptions} /> }
            </div>
        </li>
    )
}

type Props = {

    addActivity: Function,
    getActivities: Function,
    removeActivity: Function,
}

type State = {
    loading: boolean,
    startFetch: boolean,
    activities: Array<Activity>
}


const List = ({ addActivity, getActivities, removeActivity }: Props) => {
    const [state, setState] = React.useState<State>({startFetch: false, loading: true, activities: []})

    React.useEffect(() => {
        console.log('List -> fetching activities')
        getActivities()
            .then((a: Array<Activity>) => {
                setState({loading: false, startFetch: state.startFetch, activities: a})
            })
            .catch((e: any) => { console.log(e) })
    }, [state.startFetch])

    const add = (e: any, name: string) => {
        e.preventDefault()
        const skillLevel = Activity.SkillLevel.BEGINNER
        const activity = new Activity({name, skillLevel})
        addActivity(activity).then((e: any) => {
            setState({activities: [], startFetch: !state.startFetch, loading: true})
        })
    }

    const remove = (e: any, name: string) => {
        e.preventDefault()
        const skillLevel = Activity.SkillLevel.BEGINNER
        const activity = new Activity({name, skillLevel})
        removeActivity(activity).then((e: any) => {
            setState({activities: [], startFetch: !state.startFetch, loading: true})
        })
    }


    const { activities, loading }: any =  state

    if (loading) {
        return <h3>Loading</h3>
    }


    type Item = {name: string, checked: boolean}
    const checkedItems: Array<{name: string, checked: boolean}> = activities.map( (a: Activity) => { return { name: a.name(), checked: true } })
    const uncheckedItems: Array<{name: string, checked: boolean}> = []

    Object.keys(Activity.ActivityNames).forEach(key => {
        const activityName = Activity.ActivityNames[key]
        if (!checkedItems.filter(a => a.name === activityName).length) {
            uncheckedItems.push({ name: activityName, checked: false })
        }
    })

    let items: Array<Item> = checkedItems.concat(uncheckedItems)
    items = items.sort(function(a: Item, b: Item) { return a.name.localeCompare(b.name) })

    return (
        <div>
            <div className='list'>
                <div className='head'>
                    <h3>Activities</h3>
                </div>
                <ul>
                    {
                        items.map(a => {
                            if (a.checked) {
                                return ActivityItem(remove, a.name, true) 
                            } else {
                                return ActivityItem(add, a.name, false) 
                            }
                        }) 
                    }
                </ul>

            </div>
        </div>
    )
}

export default List
