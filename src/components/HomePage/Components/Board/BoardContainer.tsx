import Board from "./Board"
import './Board.css'
import {Activity} from "../../../../Models/Activity";
import {Match} from "../../../../Models/Match";

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
    Match.create({ username: 'Tupac Shakir', distance: '15km', activities: activitiesA }),
    Match.create({ username: 'Biggie', distance: '10km', activities: activitiesB }),
    Match.create({ username: 'Zeus', distance: '1km', activities: activitiesC }),
    Match.create({ username: 'Charlie', distance: '22km', activities: activitiesD }),
    Match.create({ username: 'Cardi B', distance: '75km', activities: activitiesA }),
    Match.create({ username: 'Barack Obama', distance: '45km', activities: activitiesA }),
    Match.create({ username: 'Starhorse', distance: '1km', activities: activitiesC }),
    Match.create({ username: 'Mario', distance: '1km', activities: activitiesB }),
    Match.create({ username: 'Jonah', distance: '5km', activities: activitiesD }),
    Match.create({ username: 'Alex', distance: '7km', activities: activitiesB }),
]

const friends = [
    Match.create({ username: 'Karma', distance: '15km', activities: activitiesA }),
    Match.create({ username: 'Alexandro', distance: '10km', activities: activitiesB }),
    Match.create({ username: 'James', distance: '1km', activities: activitiesC }),
    Match.create({ username: 'Optimus', distance: '22km', activities: activitiesD }),
    Match.create({ username: 'Rocket Man', distance: '75km', activities: activitiesA }),
    Match.create({ username: 'Nas', distance: '45km', activities: activitiesA }),
]


const BoardContainer = () => {
    return (
        <Board
            friends={friends}
            matches={matches}
        />
    )
}

export default BoardContainer