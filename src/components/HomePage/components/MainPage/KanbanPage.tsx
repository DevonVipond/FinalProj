import './Board/Board.css'
import Board from './Board/Index'
import React, {useEffect} from "react";
//import Navbar from "./Navbar";
//import Sidebar from "./Sidebar";

const KanbanPage = () => {
    useEffect(() => { console.log('KanbanPage rendered') } )

    //TODO add support for multiple boards
    return (
        <div>
            <Board />
        </div>
    )
}

export default KanbanPage