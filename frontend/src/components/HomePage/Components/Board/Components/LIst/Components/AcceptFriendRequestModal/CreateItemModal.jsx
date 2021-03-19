import React from "react";
import ModalContainer from "../../../../ModalContainer/Index";
import './CreateItemModal.css'

const CreateItem = () => {
    return (
        <div className='container'>
            <div>
                <p>Company</p>
                <input className='createItemInput'/>
            </div>
            < div>
                <p>Position</p>
                < input className='createItemInput'/>
            </div>
            < div>
                <p>Job URL</p>
                <input  className='createItemInput'/>
            </div>
            <div>
                <p>Location</p>
                <input  className='createItemInput'/>
            </div>
            <div>
                <p>Notes</p>
                <input className='createItemInput' />
            </div>
            <div>
                <p>Deadline</p>
                <input className='createItemInput'  type='date'/>
            </div>
            <div>
                <button>Create</button>
            </div>
        </div>
    )
}

const CreateItemModal = ModalContainer(CreateItem)

export default CreateItemModal
