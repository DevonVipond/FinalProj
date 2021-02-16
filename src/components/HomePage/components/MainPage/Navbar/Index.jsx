import './Navbar.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell} from "@fortawesome/free-regular-svg-icons";

const Navbar  = () => {
    return (
        <div className='navbar'>
            <a>SAVED BOARDS</a>
            <button className='button'>+</button>
            <FontAwesomeIcon icon={faBell} />
        </div>
    )
}

export default Navbar