import React, { useEffect, useState } from 'react'
import './App.css'
import Board from './components/Board/Board'
import Editable from './components/Editable/Editable'

function App() {

  const [target, setTargetCard] = useState({
    bid: "",
    cid: ""
  })

  const [boards, setBoards] = useState(JSON.parse(localStorage.getItem("kanban")) || [])

  const addCard = (title, id) => {
    const index = boards.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards[index].cards.push({
      id: Date.now() + Math.random() * 2,
      title,
      labels: [],
      date: "",
      tasks: [],
    });
    setBoards(tempBoards);
  }

  const removeCard = (cid, bid) => {
    const bIndex = boards.findIndex((item) => item.id === bid);
    if (bIndex < 0) return;

    const cIndex = boards[bIndex].cards.findIndex((item) => item.id === cid);
    if (cIndex < 0) return;

    const tempBoards = [...boards]
    tempBoards[bIndex].cards.splice(cIndex, 1)
    setBoards(tempBoards)
  }
  const addBoard = (title) => {
    setBoards([...boards, {
      id: Date.now() + Math.random() * 9,
      title,
      cards: []
    }])
  }
  const removeBoards = (id) => {
    const tempBoards = boards.filter((item) => item.id !== id)
    setBoards(tempBoards)
  }

  // 
  const handleDragEnd = (cid, bid) => {
    let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex;
    s_boardIndex = boards.findIndex((item) => item.id === bid);
    if (s_boardIndex < 0) return;

    s_cardIndex = boards[s_boardIndex]?.cards?.findIndex(
      (item) => item.id === cid
    );
    if (s_cardIndex < 0) return;

    t_boardIndex = boards.findIndex((item) => item.id === target.bid);
    if (t_boardIndex < 0) return;

    t_cardIndex = boards[t_boardIndex]?.cards?.findIndex(
      (item) => item.id === target.cid
    );
    if (t_cardIndex < 0) return;

    const tempBoards = [...boards];
    const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
    tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
    tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, sourceCard);


    setTargetCard({
      bid: "",
      cid: "",
    });
    setBoards(tempBoards)
    console.log(tempBoards)
  };

  const handleDragEnter = (cid, bid) => {
    setTargetCard({
      bid,
      cid,
    });
  };

  const updateCard = (cid, bid, card) => {
    const bIndex = boards.findIndex((item) => item.id === bid);
    if (bIndex < 0) return;

    const cIndex = boards[bIndex].cards.findIndex((item) => item.id === cid);
    if (cIndex < 0) return;

    const tempBoards = [...boards]
    tempBoards[bIndex].cards[cIndex] = card
    setBoards(tempBoards)
  }

  useEffect(() => {
    localStorage.setItem("kanban", JSON.stringify(boards))
  }, [boards])



  return (
    <>
      <div className="app">
        <div className="app_navbar">
          <h2>Kanban Board</h2>
        </div>
        <div className="app_outer">
          <div className="app_boards">
            {boards.map((item) =>
              <Board
                key={item.id}
                board={item}
                removeBoards={removeBoards}
                addCard={addCard}
                removeCard={removeCard}
                handleDragEnd={handleDragEnd}
                handleDragEnter={handleDragEnter}
                updateCard={updateCard}
              />
            )}
            <div className="app_boards_last">
              <Editable
                text="+ Add New Board"
                placeholder='Enter Board Title'
                displayClass='app_boards_add-board'
                onSubmit={(value) => addBoard(value)}
              />

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
