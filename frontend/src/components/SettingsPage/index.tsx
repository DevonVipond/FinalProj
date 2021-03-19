import SettingsPage from './SettingsPage'
import PageWrapper from "../Shared/PageWrapper/PageWrapper";
import React from "react";
import { GetActivies } from '../../UseCases/GetActivity/GetActivity';
import { AddActivity } from '../../UseCases/AddActivity/AddActivity';
import { RemoveActivity } from '../../UseCases/RemoveActivity/RemoveActivity';

//const activities = [
//    new Activity({name: 'skiing', skillLevel: Activity.SkillLevel.ADVANCED}),
//    new Activity({name: 'soccer', skillLevel: Activity.SkillLevel.INTERMEDIATE}),
//    new Activity({name: 'football', skillLevel: Activity.SkillLevel.BEGINNER}),
//]
//const dummyAuthenticatedUser = new PremiumUser({
//    username: 'Njord',
//    distance: '12 km',
//    activities: activities
//})

class SettingsPageContainer extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
    }

    render() {
        return <SettingsPage 
                    getActivities={GetActivies}
                    removeActivity={RemoveActivity}
                    addActivity={AddActivity} 
               />;
    }
}


export default PageWrapper(SettingsPageContainer)
