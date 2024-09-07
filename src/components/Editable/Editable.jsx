import React, { useState } from 'react'
import './Editable.css'
import { X } from 'react-feather'

const Editable = (props) => {

    const [showEdit, setShowEdit] = useState(false)
    const [inputValue, setInputValue] = useState(props.default || "")

    return (
        <div className='editable'>

            {showEdit ? (
                <form
                    className={`editable_edit ${props.editClass || ""}`}
                    onSubmit={(e) => {
                        e.preventDefault()
                        if (props.onSubmit) props.onSubmit(inputValue)
                        setShowEdit(false)
                        setInputValue(" ")
                    }}
                >
                    <input
                        autoFocus
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        // defaultValue={ }
                        placeholder={props.placeholder || "Enter Card Title"}
                        type="text" />
                    <div className="editable_edit_footer">
                        <button type="submit">{props.buttonText || "Add"}</button>
                        <X
                            className='closeIcon'
                            onClick={() => setShowEdit(false)} />
                    </div>
                </form>
            ) : <p
                className={`editable_display ${props.displayClass || ""}`}
                onClick={() => setShowEdit(true)}>{props.text || "Add Item"}</p>}
        </div>
    )
}

export default Editable