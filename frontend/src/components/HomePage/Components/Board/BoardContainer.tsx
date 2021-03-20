import React from 'react'
import Board from "./Board"
import './Board.css'
import { BoardT, GetBoard } from "../../.././../UseCases/GetBoard/GetBoard"
import { ReportedUser } from '../../../../Models/ReportedUser'
import { GetReportedUsers } from '../../../../UseCases/GetReportedUsers/GetReportedUsers'
import authService from '../../../../UseCases/AuthService'
import AdminBoard from "./AdminBoard"

type State = {
    loading: boolean,
    startFetch: boolean,
    board?: BoardT,
    adminBoard?: Array<ReportedUser>,
}
const BoardContainer = () => {

    const [ state, setState ] = React.useState<State>({
        loading: true,
        startFetch: true,
    })

    React.useEffect(() => {
        const accountType = authService.getAuth()
        if (accountType && accountType.toUpperCase() === 'ADMIN') { 
            GetReportedUsers()
                .then((b: Array<ReportedUser>) => {
                    setState({startFetch: state.startFetch, loading: false, adminBoard: b})
                })
                .catch(e => {
                    console.log(e)
                    setState({startFetch: state.startFetch, loading: false })
                })
        } else {
            GetBoard()
                .then((b: BoardT) => {
                    setState({startFetch: state.startFetch, loading: false, board: b})
                })
                .catch(e => {
                    console.log(e)
                    setState({startFetch: state.startFetch, loading: false })
                })
        }
    }, [])

    const reloadBoard = () => {
        GetBoard()
            .then((b: BoardT) => {
                setState({startFetch: state.startFetch, loading: false, board: b})
            })
            .catch(e => {
                console.log(e)
                setState({startFetch: state.startFetch, loading: false })
            })
    }

    reloadBoard.bind(setState)

    const reloadAdminBoard = () => {
        GetReportedUsers()
            .then((b: Array<ReportedUser>) => {
                setState({startFetch: state.startFetch, loading: false, adminBoard: b})
            })
            .catch(e => {
                console.log(e)
                setState({startFetch: state.startFetch, loading: false })
            })
    }

    reloadAdminBoard.bind(setState)

    if (state.loading) { return <h3>Loading</h3> }
    else if (!state.board) { return <h3>Failed to retrieve boards</h3>}

    const accountType = authService.getAuth()
    if (accountType && accountType.toUpperCase() === 'ADMIN') {

        if (!state.adminBoard) {throw Error('Unable to retrieve admin board!')}

        return (<AdminBoard
            reportedUsers={state.adminBoard}
            reloadBoard={reloadAdminBoard}
        />)
    }

    return (
        <Board
            friends={state.board.friends}
            matches={state.board.matches}
            friendRequests={state.board.friendRequests}
            reloadBoard={reloadBoard}
        />
    )
}

export default BoardContainer