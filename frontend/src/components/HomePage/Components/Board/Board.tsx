import React, {useEffect} from "react";
import List from './Components/LIst/ListContainer'
import {Match} from "../../../../Models/Match";
import { FriendItem, MatchItem, FriendRequestItem } from "./Components/LIst/Components/Item/Item";
import {Friend} from "../../../../Models/Friend";
import { FriendRequest } from "../../../../Models/FriendRequest";

const createFriendList = (title: string, users: Array<Friend>, reloadBoard: Function) => {
    return (
        <List title={title}>
            { users.map(a => <FriendItem user={a} reloadBoard={reloadBoard}/>) }
        </List>

    )
}

const createMatchesList = (title: string, users: Array<Match>, reloadBoard: Function) => {
    return (
        <List title={title}>
            { users.map(a => <MatchItem user={a} reloadBoard={reloadBoard}/>) }
        </List>

    )
}

const createFriendRequestList = (title: string, users: Array<FriendRequest>, reloadBoard: Function) => {
    return (
        <List title={title}>
            { users.map(a => <FriendRequestItem user={a} reloadBoard={reloadBoard}/>) }
        </List>

    )
}

type BoardProps = {
    friends: Array<Friend>,
    matches: Array<Match>,
    friendRequests: Array<FriendRequest>,
    reloadBoard: Function,
}

const Board = ({ friendRequests, friends, matches, reloadBoard }: BoardProps) => {

    return (
        <div id='board'>
            { createMatchesList('Matches', matches, reloadBoard) }
            { createFriendList('Friends', friends, reloadBoard) }
            { createFriendRequestList('Friend Requests', friendRequests, reloadBoard) }
        </div>
    )
}

export default Board