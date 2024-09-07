import React, { useState } from 'react'
import { CheckSquare, Clock, MoreHorizontal } from 'react-feather'
import Chip from '../Chip/Chip'
import './Card.css'
import Dropdown from '../Dropdown/Dropdown.jsx'
import CardInfo from './CardInfo/cardInfo'

const Card = (props) => {

    const [showDropdown, setShowDropdown] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <>
            {
                showModal && <CardInfo
                    card={props.card}
                    onClose={() => setShowModal(false)}
                    updateCard={props.updateCard}
                    boardId={props.boardId}
                />
            }
            <div
                className='card'
                draggable={true}

                onDragEnd={() => props.handleDragEnd(props.card?.id, props.boardId)}
                onDragEnter={() => props.handleDragEnter(props.card?.id, props.boardId)}
                onClick={() => setShowModal(true)}
            >
                <div className="card_top">
                    <div className="card_top_labels">
                        {props.card?.labels?.map((item, index) =>
                            <Chip
                                key={index}
                                text={item.text}
                                color={item.color} />
                        )}
                    </div>
                    <div
                        className="card_top_more"
                    >
                        <MoreHorizontal onClick={toggleDropdown} />
                        {showDropdown && (
                            <Dropdown
                                class="card_dropdown"
                            >
                                <p
                                    onClick={() => {
                                        if (window.confirm("Are you sure you want to delete this card?")) {
                                            props.removeCard(props.card.id, props.boardId);
                                        }
                                    }
                                    }
                                >Delete Card</p>
                            </Dropdown>
                        )}
                    </div>
                </div>
                <div className="card_title">
                    {props.card?.title}
                </div>
                <div className="card_footer">
                    {props.card?.date &&
                        <p><Clock />{props.card?.date}</p>
                    }
                    {
                        props.card?.tasks?.length > 0 &&
                        <p>
                            <CheckSquare />
                            {props.card?.tasks?.filter((item) => item.completed)
                                .length}/
                            {props.card?.tasks?.length}
                        </p>
                    }
                </div>
            </div>
        </>
    )
}

export default Card
