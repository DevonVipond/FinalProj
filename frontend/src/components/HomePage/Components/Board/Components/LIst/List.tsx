import React from "react"
import './List.css'

const ListHeader = ({ title }: {title: string}) => {
    return (
        <div>
            <h1>{ title }</h1>
        </div>
    )
}

type Props = {
    children: React.ReactNode,
    title: string
}
const List = ({ children, title }: Props) => {

    return (
        <div className='listContainer' >
            <div>
                <ListHeader title={title}/>
            </div>
            <div>
                { children }
            </div>
        </div>
    )
}

export default List