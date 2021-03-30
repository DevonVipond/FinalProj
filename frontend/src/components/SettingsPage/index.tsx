import React from "react";
import PremiumUserSettingsPage from './PremiumUserSettingsPage'
import PageWrapper from "../Shared/PageWrapper/PageWrapper";
import authService from '../../UseCases/AuthService';
import RegularUserSettingsPage from './RegularUserSettingsPage';

class SettingsPageContainer extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
    }

    render() {
        let accountType: any = authService.getAuth()
        if (accountType === null) return <h3>Failed to find account type!</h3>
        switch (accountType.toUpperCase()) {
            case "REGULAR":
                return <RegularUserSettingsPage />
            case "PREMIUM":
                return <PremiumUserSettingsPage />;
            case "ADMIN":
                break;

            default:
                return <h3> Unknown Account Type { accountType } </h3>

        }

    }
}


export default PageWrapper(SettingsPageContainer)
