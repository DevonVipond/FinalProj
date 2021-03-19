import React from 'react'
import Board from "./Board"
import './Board.css'
import { BoardT, GetBoard } from "../../.././../UseCases/GetBoard/GetBoard"

type State = {
    loading: boolean,
    startFetch: boolean,
    board?: BoardT
}
const BoardContainer = () => {
    const [ state, setState ] = React.useState<State>({
        loading: true,
        startFetch: true,
    })

    React.useEffect(() => {
        GetBoard()
            .then((b: BoardT) => {
                setState({startFetch: state.startFetch, loading: false, board: b})
            })
            .catch(e => {
                console.log(e)
                setState({startFetch: state.startFetch, loading: false })
            })
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

    if (state.loading) { return <h3>Loading</h3> }
    else if (!state.board) { return <h3>Failed to retrieve boards</h3>}

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