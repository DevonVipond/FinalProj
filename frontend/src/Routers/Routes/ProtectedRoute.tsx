import React from "react";
import {Redirect, Route} from "react-router-dom";

const isAuthenticated = () => {
    console.log('grep me auth', sessionStorage.getItem('auth'))
    return sessionStorage.getItem('auth')
}

export const ProtectedRoute = ({DesiredPage, ...rest}: any) => (

    <div>
        <Route key={1} {...rest} component={(props: any) => {
            if (isAuthenticated() === 'true' || true) { // TODO: REMOVE
                return <DesiredPage {...props}/>
            }

            return <Redirect to="/login"/>
        }}/>
    </div>
)

export default ProtectedRoute


