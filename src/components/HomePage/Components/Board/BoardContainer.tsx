import React from 'react'
import Board from "./Board"
import './Board.css'
import { BoardT, GetBoard } from "../../.././../UseCases/GetBoard/GetBoard"

/*
const activitiesA = [

    new Activity({name: Activity.ActivityNames.SOCCER, skillLevel: 'beginner'}),

    new Activity({name: Activity.ActivityNames.FOOTBALL, skillLevel: 'advanced'}),

    new Activity({name: Activity.ActivityNames.SKIING, skillLevel: 'intermediate'}),

]

const activitiesB = [

    new Activity({name: Activity.ActivityNames.SOCCER, skillLevel: 'advanced'}),

]



const activitiesC = [

    new Activity({name: Activity.ActivityNames.FOOTBALL, skillLevel: 'intermediate'}),

]



const activitiesD = [

    new Activity({name: Activity.ActivityNames.SKIING, skillLevel: 'advanced'}),

    new Activity({name: Activity.ActivityNames.SOCCER, skillLevel: 'beginner'}),

]



const matches = [

    new Match({ username: 'Tupac Shakir', distance: '15km', activities: activitiesA }),

    new Match({ username: 'Biggie', distance: '10km', activities: activitiesB }),

    new Match({ username: 'Zeus', distance: '1km', activities: activitiesC }),

    new Match({ username: 'Charlie', distance: '22km', activities: activitiesD }),

    new Match({ username: 'Cardi B', distance: '75km', activities: activitiesA }),

    new Match({ username: 'Barack Obama', distance: '45km', activities: activitiesA }),

    new Match({ username: 'Starhorse', distance: '1km', activities: activitiesC }),

    new Match({ username: 'Mario', distance: '1km', activities: activitiesB }),

    new Match({ username: 'Jonah', distance: '5km', activities: activitiesD }),

    new Match({ username: 'Alex', distance: '7km', activities: activitiesB }),

]



const friends = [

    new Match({ username: 'Karma', distance: '15km', activities: activitiesA }),

    new Match({ username: 'Alexandro', distance: '10km', activities: activitiesB }),

    new Match({ username: 'James', distance: '1km', activities: activitiesC }),

    new Match({ username: 'Optimus', distance: '22km', activities: activitiesD }),

    new Match({ username: 'Rocket Man', distance: '75km', activities: activitiesA }),

    new Match({ username: 'Nas', distance: '45km', activities: activitiesA }),

]
*/


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
    }, [state.startFetch])

    const reloadBoard = () => {
        setState({loading: true, startFetch: !state.startFetch})
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