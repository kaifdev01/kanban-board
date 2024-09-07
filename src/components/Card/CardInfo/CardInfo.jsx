import React from 'react'
import Modal from '../../Modal/Modal'
import { Trash, Calendar, CheckSquare, List, Tag, Type } from 'react-feather'
import './Cardinfo.css'
import Editable from '../../Editable/Editable'
import { useState, useEffect } from 'react'
import Chip from '../../Chip/Chip'


const CardInfo = (props) => {

    const colors = [
        "#a8193d",
        "#4fcc25",
        "#1ebffa",
        "#8da377",
        "#9975bd",
        "#cf61a1",
        "#240959",
    ];

    const [activeColor, setActiveColor] = useState('')

    const [values, setValues] = useState({ ...props.card })

    const calculatePercent = () => {
        if (!values.task?.length) return 0;
        const completed = values.task?.filter((item) => item.completed)?.length;
        return (completed / values.task?.length) * 100;
    };

    useEffect(() => {
        props.updateCard(props.card.id, props.boardId, values)
    }, [values])

    const addLabel = (value, color) => {
        const index = values.labels?.findIndex((item) => item.text === value);
        if (index > -1) return;

        setActiveColor("");
        const label = {
            text: value,
            color,
        }
        setValues({ ...values, labels: [...values.labels, label] })

    };

    const removeLabel = (text) => {
        const tempLabels = values.labels?.filter(item => item.text !== text)
        setValues({ ...values, labels: tempLabels })
    };

    const addTask = (value) => {
        const task = {
            id: new Date() + Math.random() * 2,
            text: value,
            completed: false,
        }
        setValues({ ...values, tasks: [...values.tasks, task] })
    }

    const removeTask = (id) => {
        const index = values.tasks?.findIndex((item) => item.id === id)
        if (index < 0) return;

        const tempTasks = values.tasks?.splice(index, 1)
        setValues({ ...values, task: tempTasks })

    }

    const updateTask = (id, completed) => {
        const index = values.tasks?.findIndex((item) => item.id === id)
        if (index < 0) return;

        const tempTasks = [...values.tasks]
        tempTasks[index].completed = completed
        setValues({ ...values, task: tempTasks })
    }
    return (
        <>
            <Modal onClose={props.onClose}

            >
                <div className="cardinfo">
                    <div className="cardinfo_box">
                        <div className="cardinfo_box_title">
                            <Type />
                            <p>Title</p>
                        </div>
                        <div className="body">
                            <Editable
                                placeholder="Enter Title"
                                text={values.title}
                                buttonText="Set Title"
                                default={values.title}
                                onSubmit={(value) => setValues({ ...values, title: value })}
                            />
                        </div>
                    </div>

                    <div className="cardinfo_box">
                        <div className="cardinfo_box_title">
                            <List />
                            <p>Card Description</p>
                        </div>
                        <div className="body">
                            <Editable
                                placeholder="Enter Details"
                                buttonText="Set Description"
                                text={values.desc}
                                onSubmit={(value) => setValues({ ...values, desc: value })}
                            />
                        </div>
                    </div>

                    <div className="cardinfo_box">
                        <div className="cardinfo_box_title">
                            <Calendar />
                            <p>Date</p>
                        </div>
                        <div className="body">
                            <input type="date"
                                defaultValue={values.date ? new Date(values.date).toISOString().substr(0, 10) : ""}
                                onChange={(e) => setValues({ ...values, date: e.target.value })}

                            />
                        </div>
                    </div>

                    <div className="cardinfo_box">
                        <div className="cardinfo_box_title">
                            <Tag />
                            <p>Label</p>
                            <div className="cardinfo_box_labels">
                                {
                                    values.labels?.map((item, index) => (
                                        <Chip
                                            key={item.text + index}
                                            close
                                            onClose={() => removeLabel(item.text)}
                                            text={item.text}
                                            color={item.color}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                        <div className="cardinfo_box_colors">

                            {colors.map((item, index) => (
                                <ul>
                                    <li key={index} style={{ backgroundColor: item }}
                                        className={item === activeColor ? "active" : ""}
                                        onClick={() => setActiveColor(item)}
                                    />
                                </ul>
                            ))}

                        </div>
                        <div className="body">
                            <Editable
                                placeholder="Enter Label"
                                buttonText="Add Label"
                                text="Enter Label"
                                onSubmit={(value) => addLabel(value, activeColor)}

                            />
                        </div>
                    </div>

                    <div className="cardinfo_box">
                        <div className="cardinfo_box_title">
                            <CheckSquare />
                            <p>Tasks</p>
                        </div>
                        <div className={`cardinfo_box_progress-bar `}>
                            <div className="cardinfo_box_progress" style={{ width: calculatePercent() + "%", backgroundColor: calculatePercent() == "100" ? "limegreen" : "" }} />
                        </div>
                        <div className="cardinfo_box_list">
                            {
                                values.tasks?.map((item, index) => (
                                    <>
                                        <div
                                            key={item.id}
                                            className="cardinfo_task">
                                            <input
                                                type="checkbox"
                                                defaultChecked={item.completed}
                                                onChange={(e) => updateTask(item.id, e.target.checked)}
                                            />
                                            <p>{item.text}</p>
                                            <Trash
                                                onClick={() => removeTask(item.id)}
                                            />
                                        </div>
                                    </>
                                )
                                )}
                        </div>
                        <div className="body">
                            <Editable
                                placeholder="Enter Task"
                                buttonText="Add Task"
                                text="Add new task"
                                onSubmit={(value) => addTask(value)}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default CardInfo
