import { useState } from 'react';
import './Board.css';

function Square({value, onSquareClick, colored}) {
  const win = calculateWinner(colored);
  let squareClass = "square";

  if (win) {
    const winningLine = win.winningLine;

    if (winningLine.includes(index)) {
      squareClass += ' red';
    }
  }

  return (
    <button className={squareClass} onClick={onSquareClick}>{value}</button>
  )
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [moveNumber, setMoveNumber] = useState(0);
  const winner = calculateWinner(squares);

  let status;
  let player = "";
  player = moveNumber % 2 === 0 ? "X" : "Y";

  if (winner) {
    status = `GAME OVER! ${winner.symbol} wins!`; 
  } else if (!winner && moveNumber === 9) {
    status = `It's DRAW!`;
  }
  else {
    status = `Next player: ${player}`;
  }

  const handleSquareClick = (i) => {
    let newSquares = [...squares];
    let player = "";

    if (newSquares[i] || calculateWinner(squares)) {
      return;
    }

    setMoveNumber( moveNumber + 1);

    player = moveNumber % 2 === 0 ? "X" : "Y";
    newSquares[i] = player;
    
    setSquares(newSquares);
    setHistory([...history, newSquares]);
  }

  const backTo = (i) => {
    setSquares(history[i]);
    setHistory(history.slice(0, i+1));
    setMoveNumber(i);
  }

  const moves = [...history];
  moves.pop();

  return(
    <>
    <div>{status}</div>
    <div className="board">
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={()=>handleSquareClick(0)} colored={squares} />
        <Square value={squares[1]} onSquareClick={()=>handleSquareClick(1)} colored={squares} />
        <Square value={squares[2]} onSquareClick={()=>handleSquareClick(2)} colored={squares} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={()=>handleSquareClick(3)} colored={squares} />
        <Square value={squares[4]} onSquareClick={()=>handleSquareClick(4)} colored={squares} />
        <Square value={squares[5]} onSquareClick={()=>handleSquareClick(5)} colored={squares} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={()=>handleSquareClick(6)} colored={squares} />
        <Square value={squares[7]} onSquareClick={()=>handleSquareClick(7)} colored={squares} />
        <Square value={squares[8]} onSquareClick={()=>handleSquareClick(8)} colored={squares} />
      </div>
    </div>
    <ul className="history">
      {
      moves.map((val, key) => {

        // console.log(moveNumber);
        return <li key={key}><button onClick={() => backTo(key) }>{ key === 0 ? 'Back to start' : `Back to move #${key}`}</button></li>
      })
      }
      { !winner &&
      <li>{`Yuo're on move #${moves.length + 1}`}</li>
      }
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
      return {symbol: squares[a], winningLine: lines[i]};
    }
  }
  return null;
}