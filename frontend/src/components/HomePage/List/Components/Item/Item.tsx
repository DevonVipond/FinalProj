import React from "react"
import './Item.css'
import { Activity } from "../../../../../Models/Activity";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBasketballBall, faFootballBall, faFutbol, faSkiing} from "@fortawesome/free-solid-svg-icons";
import 'semantic-ui-css/semantic.min.css';
import { Friend } from "../../../../../Models/Friend";
import { FriendRequest } from "../../../../../Models/FriendRequest";
import { Match } from "../../../../../Models/Match";
import { ConnectWithMatch } from "../../../../../UseCases/ConnectWithMatch/ConnectWithMatch";
import { AcceptFriendRequest } from "../../../../../UseCases/AcceptFriendRequest/AcceptFriendRequest";
import { RejectFriendRequest } from "../../../../../UseCases/RejectFriendRequest/RejectFriendRequest";
import { ReportFriend } from "../../../../../UseCases/ReportFriend/ReportFriend";
import ReportUserModal from "../ReportUserModal/ReportUserModal"
import { ReportedUser } from "../../../../../Models/ReportedUser";
import { DeleteUser } from "../../../../../UseCases/DeleteUser/DeleteUser";
import { ResolveReport } from "../../../../../UseCases/ResolveReport/ResolveReport";
import { ReviewFriend } from "../../../../../UseCases/ReviewFriend/ReviewFriend";
import ReviewFriendModal from "../ReviewFriendModal/ReviewFriendModal";


const skillLevelToColor = (skillLevel: string): string => {
    switch (skillLevel) {
        case Activity.SkillLevel.BEGINNER:
            return 'green'
        case Activity.SkillLevel.INTERMEDIATE:
            return 'orange'
        case Activity.SkillLevel.ADVANCED:
            return 'red'
        default:
            return ''
    }

}

const soccerBall = (color: string) => ( <FontAwesomeIcon icon={faFutbol} size='3x' style={{color: color, paddingRight: '5px'}} />)
const basketBall = (color: string) => ( <FontAwesomeIcon icon={faBasketballBall} size='3x' style={{color: color, paddingRight: '5px'}} />)
const skiing = (color: string) => ( <FontAwesomeIcon icon={faSkiing} size='3x' style={{color: color, paddingRight: '5px'}} />)
const football = (color: string) => ( <FontAwesomeIcon icon={faFootballBall} size={'3x'}  style={{color: color, paddingRight: '5px'}} />)


const activityIcon = (activityName: string, skillLevel: string) => {
    const color: string = skillLevelToColor(skillLevel)
    switch (activityName) {
        case Activity.ActivityNames.SOCCER:
            return soccerBall(color)
        case Activity.ActivityNames.BASKETBALL:
            return basketBall(color)
        case Activity.ActivityNames.FOOTBALL:
            return football(color)
        case Activity.ActivityNames.SKIING:
            return skiing(color)
        default:
            return undefined
    }
}

export const FriendItem = ({ user, reloadBoard }: { user: Friend, reloadBoard: Function }) => {
    const [ showReportModal, setShowReportModal ] = React.useState(false)
    const [ showReviewModal, setShowReviewModal ] = React.useState(false)

    const reportFriend = (e: any, messageBoxId: string) => {
        const reportMessageComponent: any = document.getElementById(messageBoxId)

        if (reportMessageComponent)
            ReportFriend(user, reportMessageComponent.value)
                .then((res: any) => { setShowReportModal(false); reloadBoard();  })
                .catch((err: any) => { logError(err); })
    }

    reportFriend.bind(user)

    const reviewFriend = (e: any, messageBoxId: string) => {
        const htmlComponent: any = document.getElementById(messageBoxId)

        if (htmlComponent)
            ReviewFriend(user, htmlComponent.value)
                .then((res: any) => { setShowReviewModal(false); reloadBoard();  })
                .catch((err: any) => { logError(err); })
    }

    reviewFriend.bind(user)

    return (
        <div className='itemContainer' >
            <a>
                <p className='itemLabel' id='companyLabel'>{user.username()}</p>
                <p className='itemLabel' id='positionLabel'>{user.distance()}</p>
                <div>
                    { user.activities().map( a => ( activityIcon(a.name(), a.skillLevel()) ) ) }
                </div>
                <div className="ui bottom attached button" onClick={() => setShowReviewModal(true)} id="addButton" >
                    <i className="add icon" ></i>
                    Review
                </div>
                <div className="ui bottom attached button" onClick={() => setShowReportModal(true)} id="addButton" >
                    <i className="add icon" ></i>
                    Report
                </div>
                <ReportUserModal reportFriend={reportFriend} show={showReportModal} onHide={() => setShowReportModal(false)}/>
                <ReviewFriendModal reviewFriend={reviewFriend} show={showReviewModal} onHide={() => setShowReviewModal(false)}/>
            </a>
        </div>
    )
}

const logError = (e: any) => {
    console.log('E Item -> ' + e)
}

export const MatchItem = ({ user , reloadBoard }: { user: Match, reloadBoard: Function }) => {

    const [ showModal, setShowModal ] = React.useState(false)

    const connect = (e: any, messageBoxId: string) => {
        const connectMessageComponent: any = document.getElementById(messageBoxId)

        if (connectMessageComponent)
            ConnectWithMatch(user, connectMessageComponent.value)
                .then((res: any) => { reloadBoard() })
                .catch((err: any) => { logError(err) })
    }

    connect.bind(user)
    return (
        <div className='itemContainer' >
            <a>
                <p className='itemLabel' id='companyLabel'>{user.username()}</p>
                <p className='itemLabel' id='positionLabel'>{user.distance()}</p>
                <div>
                    { user.activities().map( a => ( activityIcon(a.name(), a.skillLevel()) ) ) }
                </div>
                <div className="ui bottom attached button" onClick={() => setShowModal(true)} id="addButton" >
                    <i className="add icon" ></i>
                    Connect
                </div>
                <ReportUserModal reportFriend={connect} show={showModal} onHide={() => setShowModal(false)}/>
            </a>
        </div>
    )
}

export const ReportedUserItem  = ({ user , reloadBoard }: { user: ReportedUser, reloadBoard: Function }) => {
    const [ showModal, setShowModal ] = React.useState(false)
    const username = user.username
    const primaryKey = user.primaryKey

    console.log(user)

    const deleteUser = (e: any) => {
        DeleteUser(username, primaryKey)
            .then((res: any) => { reloadBoard() })
            .catch((err: any) => { logError(err) })
    }

    deleteUser.bind(username)
    deleteUser.bind(primaryKey)

    const resolve = (e: any, messageBoxId: string) => {
        const connectMessageComponent: any = document.getElementById(messageBoxId)

        if (connectMessageComponent)
            ResolveReport(primaryKey, connectMessageComponent.value)
                .then((res: any) => { reloadBoard() })
                .catch((err: any) => { logError(err) })
    }

    resolve.bind(primaryKey)


    deleteUser.bind(user)
    return (
        <div className='itemContainer' >
            <a>
                <div>
                    <p style={{fontSize: '16px'}}> {user.username} </p>
                    <p style={{fontSize: '16px'}}> Most recent reporter comment: {user.reporterComments} </p>
                    <p style={{fontSize: '16px'}}> Times Reported: {user.timesReported} </p>
                </div>
                <div className="ui bottom attached button" onClick={(e: any)=> deleteUser(e)} id="addButton" >
                    <i className="add icon" ></i>
                    Delete User
                </div>
                <div className="ui bottom attached button" onClick={() => setShowModal(true)} id="addButton" >
                    <i className="add icon" ></i>
                    Resolve
                </div>
                <ReportUserModal reportFriend={resolve} show={showModal} onHide={() => setShowModal(false)}/>
            </a>
        </div>
    )
}

export const FriendRequestItem = ({ user , reloadBoard }: { user: FriendRequest, reloadBoard: Function }) => {
    const [ showModal, setShowModal ] = React.useState(false)

    const accept = (e: any, messageBoxId: string) => {
        const messageComponent: any = document.getElementById(messageBoxId)

        if (messageComponent)
            AcceptFriendRequest(user, messageComponent.value)
                .then((res: any) => { reloadBoard() })
                .catch((err: any) => { logError(err) })
    }

    accept.bind(user)

    const reject = (e: any) => {
        RejectFriendRequest(user)
            .then((res: any) => { reloadBoard() })
            .catch((err: any) => { logError(err) })
    }
    return (
        <div className='itemContainer' >
            <a>
                <p className='itemLabel' id='companyLabel'>{user.username()}</p>
                <p className='itemLabel' id='positionLabel'>{user.distance()}</p>
                <div>
                    { user.activities().map( a => ( activityIcon(a.name(), a.skillLevel()) ) ) }
                </div>
                <div className="ui bottom attached button" onClick={() => setShowModal(true)} id="addButton" >
                    <i className="add icon" ></i>
                    Accept
                </div>
                <ReportUserModal reportFriend={accept} show={showModal} onHide={() => setShowModal(false)}/>
                <div className="ui bottom attached button" id="addButton" onClick={(e: any) => reject(e)} >
                    <i className="minus icon"></i>
                    Reject
                </div>
            </a>
        </div>
    )
}