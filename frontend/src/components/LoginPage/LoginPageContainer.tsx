import Login from './LoginPage'
import PageWrapper from "../Shared/PageWrapper/PageWrapper";

function LoginPageContainer() {
    return (
        <Login />
    )
}

export default PageWrapper(LoginPageContainer)