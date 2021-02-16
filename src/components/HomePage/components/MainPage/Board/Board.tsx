import React, {useEffect} from "react";
import List from './List/Index'
import Item from "./List/Item/Index";
import {Activity} from "../../../../../DataTransferObjects/Activity";
import {Match} from "../../../../../DataTransferObjects/Match";
import {User} from "../../../../../DataTransferObjects/interfaces/User";

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
    Match.create({ username: 'Ronald', distance: '1km', activities: activitiesC }),
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

const createList = (title: string, users: Array<User>) => {
    return (
        <List title={title}>
            { users.map(a => <Item user={a}/>) }
        </List>

    )
}

const Board = () => {
    useEffect(() => { console.log('Board rendered') } )

    // { matches.map(a => <List jobApplications={a} />) }
    return (
        <div id='board'>
            { createList('Matches', matches) }
            { createList('Friends', friends) }
        </div>
    )
}

export default Board