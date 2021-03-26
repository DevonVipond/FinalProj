import React, {useEffect} from "react";
import List from '../List/List'
import {Match} from "../../../Models/Match";
import { FriendItem, MatchItem, FriendRequestItem, ReportedUserItem } from "../List/Components/Item/Item";
import {Friend} from "../../../Models/Friend";
import { FriendRequest } from "../../../Models/FriendRequest";
import "./Board.css"

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

const UserBoard = ({ friendRequests, friends, matches, reloadBoard }: BoardProps) => {
    return (
        <div id='board'>
            { createMatchesList('Matches', matches, reloadBoard) }
            { createFriendList('Friends', friends, reloadBoard) }
            { createFriendRequestList('Incoming Friend Requests', friendRequests, reloadBoard) }
        </div>
    )
}

export default UserBoard