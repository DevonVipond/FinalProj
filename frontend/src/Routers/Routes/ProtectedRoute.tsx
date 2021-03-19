import React from "react";
import {Redirect, Route} from "react-router-dom";
import authService from "../../UseCases/AuthService"

export const ProtectedRoute = ({DesiredPage, ...rest}: any) => (

    <div>
        <Route key={1} {...rest} component={(props: any) => {
            if (true || authService.isAuthenticated()) { // TODO: REMOVE
                return <DesiredPage {...props}/>
            }

            return <Redirect to="/login"/>
        }}/>
    </div>
)

export default ProtectedRoute


