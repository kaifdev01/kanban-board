import React, { useState } from 'react'
import './Board.css'
import { Key, MoreHorizontal } from 'react-feather'
import Card from '../Card/Card'
import Editable from '../Editable/Editable'
import Dropdown from '../Dropdown/Dropdown.jsx'

const Board = (props) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };


    return (
        <>
            <div className="board" >
                <div className="board_header">
                    <p className="board_header_title">
                        {props.board?.title}
                        <span>{props.board?.cards?.length}</span>
                    </p>
                    <div
                        className="board_top_more"
                        onClick={toggleDropdown}

                    >
                        <MoreHorizontal />
                        {showDropdown && (
                            <Dropdown onClick={toggleDropdown} class='board_dropdown'>
                                <p onClick={() => props.removeBoards(props.board?.id)} >Delete Board</p>
                            </Dropdown>
                        )}
                    </div>
                </div>
                <div className="board_cards custom-scroll">
                    {props.board?.cards?.map((item) =>
                        <Card
                            card={item}
                            key={item.id}
                            removeCard={props.removeCard}
                            boardId={props.board?.id}
                            handleDragEnd={props.handleDragEnd}
                            handleDragEnter={props.handleDragEnter}
                            updateCard={props.updateCard}
                        />
                    )}

                    <Editable
                        displayClass='board_cards_add'
                        text="Add Card"
                        placeholder="Add Card Title"
                        onSubmit={(value) => props.addCard(value, props.board?.id)}
                    />
                </div>
            </div>
        </>
    );
}

export default Board;
