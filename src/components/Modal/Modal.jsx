import React from 'react'
import './Modal.css'
const Modal = (props) => {
    return (
        <div className='modal'
            onClick={() => (props.onClose ? props.onClose() : "")}
        >
            <div
                className="modal_content"
                onClick={(event) => event.stopPropagation()}
            >{props.children}</div>
        </div>
    )
}

export default Modal
