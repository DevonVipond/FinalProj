import React from 'react'
import UserBoard from "./UserBoard/UserBoard"
import { ReportedUser } from '../../Models/ReportedUser'
import { GetReportedUsers } from '../../UseCases/GetReportedUsers/GetReportedUsers'
import authService from '../../UseCases/AuthService'
import AdminBoard from "./AdminBoard/AdminBoard"
import {BoardT, GetHome} from "../../UseCases/GetHome/GetHome";

type UserBoardState = {
    loading: boolean,
    startFetch: boolean,
    board?: BoardT,
}

type AdminBoardState = {
    loading: boolean,
    startFetch: boolean,
    adminBoard?: Array<ReportedUser>,
}

const PluginUserBoard = () => {
    const [ state, setState ] = React.useState<UserBoardState>({
        loading: true,
        startFetch: true,
    })

    React.useEffect(() => {
        GetHome()
            .then((b: BoardT) => {
                setState({startFetch: state.startFetch, loading: false, board: b})
            })
            .catch(e => {
                console.log(e)
                setState({startFetch: state.startFetch, loading: false })
            })
    }, [])

    const reloadBoard = () => {
        GetHome()
            .then((b: BoardT) => {
                setState({startFetch: state.startFetch, loading: false, board: b})
            })
            .catch(e => {
                console.log(e)
                setState({startFetch: state.startFetch, loading: false })
            })
    }

    reloadBoard.bind(setState)

    if (state.loading) { return <h3>Loading</h3> }
    if (!state.board) { return <h3>Failed to retrieve boards</h3>}

    return (
        <UserBoard
            friends={state.board.friends}
            matches={state.board.matches}
            friendRequests={state.board.friendRequests}
            reloadBoard={reloadBoard}
        /> )
}

const PluginAdminBoard = () => {
    const [ state, setState ] = React.useState<AdminBoardState>({
        loading: true,
        startFetch: true,
    })

    React.useEffect(() => {
            GetReportedUsers()
                .then((b: Array<ReportedUser>) => {
                    setState({startFetch: state.startFetch, loading: false, adminBoard: b})
                })
                .catch(e => {
                    console.log(e)
                    setState({startFetch: state.startFetch, loading: false })
                })
    }, [])

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
    if (!state.adminBoard) { return <h3> Failed to retrieve admin board!</h3> }

    return (<AdminBoard
        reportedUsers={state.adminBoard}
        reloadBoard={reloadAdminBoard}
    />)
}

const HomePage = () => {
    const accountType: any = authService.getAuth()
    if (accountType && accountType.toUpperCase() === 'ADMIN') {
        return PluginAdminBoard()
    }
    else {
        return PluginUserBoard()
    }
}

export default HomePage
