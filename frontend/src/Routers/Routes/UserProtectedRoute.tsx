import {Redirect, Route} from "react-router-dom";
import authService from "../../UseCases/AuthService";
import React from "react";

export const UserProtectedRoute = ({DesiredPage, ...rest}: any) => (

    <div>
        <Route key={1} {...rest} component={(props: any) => {
            if (authService.isAuthenticated() && (authService.getAuth()?.toUpperCase() !== 'ADMIN')) {
                return <DesiredPage {...props}/>
            }

            return <Redirect to="/home"/>
        }}/>
    </div>
)

export default UserProtectedRoute