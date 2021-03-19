import { useState, useEffect } from 'react'
import HomePage from './HomePage'
import PageWrapper from "../Shared/PageWrapper/PageWrapper";
import { GetBoard } from '../../UseCases/GetBoard/GetBoard';
//import LoadingSpinner from "../../Shared/LoadingSpinner/Index";
//import BoardApi from '../../services/BoardApi/Index'
//import LoadingSpinner from "../LoadingSpinner/Index";

const HomePageContainer: React.FC  = () => {
    return <HomePage />
}

export default PageWrapper(HomePageContainer)

