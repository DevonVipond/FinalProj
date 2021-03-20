import SettingsPage from './SettingsPage'
import PageWrapper from "../Shared/PageWrapper/PageWrapper";
import React from "react";
import { GetActivies } from '../../UseCases/GetActivity/GetActivity';
import { AddActivity } from '../../UseCases/AddActivity/AddActivity';
import { RemoveActivity } from '../../UseCases/RemoveActivity/RemoveActivity';
import authService from '../../UseCases/AuthService';
import RegularUserSettingsPage from './RegularUserSettingsPage';

class SettingsPageContainer extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
    }

    render() {
        authService.setAuth('REGULAR')
        const accountType: any = authService.getAuth()
        if (accountType === null) return <h3>Failed to find account type!</h3>
        switch (accountType.toUpperCase()) {
            case "REGULAR":
                return <RegularUserSettingsPage />
            case "PREMIUM":
                return <SettingsPage 
                            getActivities={GetActivies}
                            removeActivity={RemoveActivity}
                            addActivity={AddActivity} 
                    />;
            case "ADMIN":
                break;

            default:
                return <h3> Unknown Account Type { accountType } </h3>

        }

    }
}


export default PageWrapper(SettingsPageContainer)
