import React from "react"
import '../List.css'
import './Item.css'
import {User} from "../../../../../../../DataTransferObjects/interfaces/User";
import MatchingUserCard from "../../../../MatchingUserCard/MatchingUserCard";
import {Activity} from "../../../../../../../DataTransferObjects/Activity";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBasketballBall, faFootballBall, faFutbol, faSkiing} from "@fortawesome/free-solid-svg-icons";
import {Feed} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';


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

function generateRandomColor() {
    const candidates = [ 'AliceBlue', 'AntiqueWhite', 'Azure', 'CadetBlue',
                        'Turquoise', 'SteelBlue', 'SlateBlue', 'LightCyan', 'MintCream' ]
    const randomNumber = Math.floor(Math.random() * 100)  % candidates.length
    return candidates[randomNumber]
}

export const Item = ({ user }: { user: User }) => {
    return (
        <div className='itemContainer' >
            <a>
                <p className='itemLabel' id='companyLabel'>{user.username()}</p>
                <p className='itemLabel' id='positionLabel'>{user.distance()}</p>
                <div>
                    { user.activities().map( a => ( activityIcon(a.name(), a.skillLevel()) ) ) }
                </div>
                <div className="ui bottom attached button" id="addButton">
                    <i className="add icon"></i>
                    Add Friend
                </div>
            </a>
        </div>
    )
}

