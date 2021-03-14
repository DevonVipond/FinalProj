import SettingsPage from './SettingsPage'
import {AuthenticatedUser} from "../../Models/Interfaces/AuthenticatedUser";
import {Activity} from "../../Models/Activity";
import PageWrapper from "../Shared/PageWrapper/PageWrapper";
import React from "react";
import {PremiumUser} from "../../Models/PremiumUser";

const activities = [
    new Activity({name: 'skiing', skillLevel: Activity.SkillLevel.ADVANCED}),
    new Activity({name: 'soccer', skillLevel: Activity.SkillLevel.INTERMEDIATE}),
    new Activity({name: 'football', skillLevel: Activity.SkillLevel.BEGINNER}),
]
const dummyAuthenticatedUser = new PremiumUser({
    username: 'Njord',
    distance: '12 km',
    activities: activities
})

class SettingsPageContainer extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
    }

    render() {
        return <SettingsPage authenticatedUser={dummyAuthenticatedUser} />
    }
}


export default  PageWrapper(SettingsPageContainer)
