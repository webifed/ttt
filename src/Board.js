import { useState } from 'react';
import './Board.css';

function Square({value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>{value}</button>
  )
}

export default function Board() {
  //const [squares, setSquares] = useState([Array(9).fill(null)]);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [moveNumber, setMoveNumber] = useState(0);
  const winner = calculateWinner(squares);
  //const currentSquares = squares[squares.length - 1];
  //const currentSquares = squares[moveNumber];
  let status;
  let player = "";
  player = moveNumber % 2 === 0 ? "X" : "Y";

  console.log(history);

  if (winner) {
    status = `GAME OVER! ${winner} wins!`; 
  } else {
    status = `Next player: ${player}`;
  }

  const handleSquareClick = (i) => {
    let newSquares = [...squares];
    let player = "";

    if (newSquares[i] || calculateWinner(squares)) {
      return;
    }

    setMoveNumber( prevMoveNumber => prevMoveNumber + 1);

    player = moveNumber % 2 === 0 ? "X" : "Y";
    newSquares[i] = player;
    
    setSquares(newSquares);
    setHistory([...history, newSquares]);
  }

  const backTo = (i) => {
    setSquares(history[i]);
    setHistory(history.slice(0, i+1));
    setMoveNumber(prevMoveNumber => i);
  }

  return(
    <>
    <div>{status}</div>
    <div className="board">
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={()=>handleSquareClick(0)}/>
        <Square value={squares[1]} onSquareClick={()=>handleSquareClick(1)}/>
        <Square value={squares[2]} onSquareClick={()=>handleSquareClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={()=>handleSquareClick(3)}/>
        <Square value={squares[4]} onSquareClick={()=>handleSquareClick(4)}/>
        <Square value={squares[5]} onSquareClick={()=>handleSquareClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={()=>handleSquareClick(6)}/>
        <Square value={squares[7]} onSquareClick={()=>handleSquareClick(7)}/>
        <Square value={squares[8]} onSquareClick={()=>handleSquareClick(8)}/>
      </div>
    </div>
    <ul className="history">
      { history.map((val, key) => 
      <li key={key}><button onClick={ () => backTo(key) }>{ key === 0 ? 'Back to start' : `Back to move ${key}`}</button></li>
      ) }
    </ul>
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