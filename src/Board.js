import { useState } from 'react';
import './Board.css';

function Square({value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>{value}</button>
  )
}

export default function Board() {
  const [square, setSquare] = useState(Array(9).fill(null));

  const handleSquareClick = (i) => {
  let newSquare = [...square];
  newSquare[i] = 'X';
  setSquare(newSquare);
}

  return(
    <div className="board">
      <div className="board-row">
        <Square value={square[0]} onSquareClick={()=>handleSquareClick(0)}/>
        <Square value={square[1]} onSquareClick={()=>handleSquareClick(1)}/>
        <Square value={square[2]} onSquareClick={()=>handleSquareClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={square[3]} onSquareClick={()=>handleSquareClick(3)}/>
        <Square value={square[4]} onSquareClick={()=>handleSquareClick(4)}/>
        <Square value={square[5]} onSquareClick={()=>handleSquareClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={square[6]} onSquareClick={()=>handleSquareClick(6)}/>
        <Square value={square[7]} onSquareClick={()=>handleSquareClick(7)}/>
        <Square value={square[8]} onSquareClick={()=>handleSquareClick(8)}/>
      </div>
    </div>
  )
}
