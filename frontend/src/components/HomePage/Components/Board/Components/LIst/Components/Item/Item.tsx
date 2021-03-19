import React from "react"
import './Item.css'
import { Activity } from "../../../../../../../../Models/Activity";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBasketballBall, faFootballBall, faFutbol, faSkiing} from "@fortawesome/free-solid-svg-icons";
import 'semantic-ui-css/semantic.min.css';
import { Friend } from "../../../../../../../../Models/Friend";
import { FriendRequest } from "../../../../../../../../Models/FriendRequest";
import { Match } from "../../../../../../../../Models/Match";
import { ConnectWithMatch } from "../../../../../../../../UseCases/ConnectWithMatch/ConnectWithMatch";
import { AcceptFriendRequest } from "../../../../../../../../UseCases/AcceptFriendRequest/AcceptFriendRequest";
import { RejectFriendRequest } from "../../../../../../../../UseCases/RejectFriendRequest/RejectFriendRequest";
import { ReportFriend } from "../../../../../../../../UseCases/ReportFriend/ReportFriend";
import ReportUserModal from "../ReportUserModal/ReportUserModal"


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
    const [ showModal, setShowModal ] = React.useState(false)

    const reportFriend = (e: any, messageBoxId: string) => {
        const reportMessageComponent: any = document.getElementById(messageBoxId)

        if (reportMessageComponent)
            ReportFriend(user, reportMessageComponent.value)
                .then((res: any) => { setShowModal(false); reloadBoard();  })
                .catch((err: any) => { logError(err); })
    }

    reportFriend.bind(user)

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
                    Report
                </div>
                <ReportUserModal reportFriend={reportFriend} show={showModal} onHide={() => setShowModal(false)}/>
            </a>
        </div>
    )
}

const logError = (e: any) => {
    console.log('E Item -> ' + e)
}

export const MatchItem = ({ user , reloadBoard }: { user: Match, reloadBoard: Function }) => {
    const connect = (e: any) => {
        ConnectWithMatch(user, "hello")
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
                <div className="ui bottom attached button" onClick={(e: any) => connect(e)} id="addButton">
                    <i className="add icon" ></i>
                    Add
                </div>
            </a>
        </div>
    )
}

export const FriendRequestItem = ({ user , reloadBoard }: { user: FriendRequest, reloadBoard: Function }) => {
    const accept = (e: any) => {
        AcceptFriendRequest(user)
            .then((res: any) => { reloadBoard() })
            .catch((err: any) => { logError(err) })
    }
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
                <div className="ui bottom attached button" id="addButton" onClick={(e: any) => accept(e)}>
                    <i className="add icon"></i>
                    Add
                </div>
                <div className="ui bottom attached button" id="addButton" onClick={(e: any) => reject(e)} >
                    <i className="minus icon"></i>
                    Reject
                </div>
            </a>
        </div>
    )
}