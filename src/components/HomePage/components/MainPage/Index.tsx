import { useState, useEffect } from 'react'
import KanbanPage from './KanbanPage'
//import BoardService from '../../services/BoardService/Index'
//import LoadingSpinner from "../LoadingSpinner/Index";

function KanbanPageContainer () {
    const [ state, setState ] = useState({
        loading: true,
        boards: null,
    })

    //useEffect(() => {
    //    BoardService.fetchBoard()
    //        .then(res => {
    //            setState({loading: false, boards: res})
    //        })
    //        .catch(e => {
    //            console.log(e)
    //            setState({loading: false, boards: null})
    //        })
    //}, [])

    //if (state.loading) { return <LoadingSpinner/> }
    //else if (!state.boards) { return <h3>Failed to retrieve boards</h3>}

    return <KanbanPage />
}

export default KanbanPageContainer
