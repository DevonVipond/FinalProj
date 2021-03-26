import HomePage from './HomePage'
import PageWrapper from "../Shared/PageWrapper/PageWrapper";

const HomePageContainer: React.FC  = () => {
    return <HomePage />
}

export default PageWrapper(HomePageContainer)

