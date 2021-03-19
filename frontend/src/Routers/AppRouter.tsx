import { Router, Route, Switch, Redirect } from "react-router-dom"
import ProtectedRoute from "./Routes/ProtectedRoute";
import HomePage from "../components/HomePage/HomePageContainer";
import SettingsPage from "../components/SettingsPage/index";
import Login from "../components/LoginPage/LoginPageContainer";
import history from "./History"


const AppRouter = () => {

    return (
        <Router history={history}>
            <Switch>
                <ProtectedRoute key={1} path='/home' DesiredPage={HomePage}/>
                <ProtectedRoute key={1} path='/settings' DesiredPage={SettingsPage}/>
                <Route key={1} path='/login' component={Login}/>
            </Switch>
        </Router>
    )
}

export default AppRouter