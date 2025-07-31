import { useState } from 'react';
import './Board.css';

function Square({value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>{value}</button>
  )
}

export default function Board() {
  const [square, setSquare] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState("X");
  let status;

  const handleSquareClick = (i) => {
    let newSquare = [...square];

    if (newSquare[i] || calculateWinner(square)) {
      return;
    }

    playerTurn === "X" ? setPlayerTurn("Y") : setPlayerTurn("X")
    newSquare[i] = playerTurn;
    setSquare(newSquare);
  }

  const winner = calculateWinner(square)

  if (winner) {
    status = `GAME OVER! ${winner} wins!`; 
  } else {
    status = `Next player: ${playerTurn}`;
  }

  return(
    <>
    <div>{status}</div>
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
    </>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}