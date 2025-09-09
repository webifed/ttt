import { useState } from 'react';
import Status from './Status';
import Square from './Square';
import History from './History';
import './Board.css';

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [moveNumber, setMoveNumber] = useState(0);
  const winner = calculateWinner(squares);
  let player = moveNumber % 2 === 0 ? "X" : "Y";

  const handleSquareClick = (i) => {
    let newSquares = [...squares];

    if (newSquares[i] || calculateWinner(squares)) {
      return;
    }

    setMoveNumber( moveNumber + 1);

    newSquares[i] = player;
    
    setSquares(newSquares);
    setHistory([...history, newSquares]);
  }

  const handleBackTo = (i) => {
    setSquares(history[i]);
    setHistory(history.slice(0, i+1));
    setMoveNumber(i);
  }

  return(
    <div className="ttt">
      <h1 className='ttt__heading'>Tic Tac Toe</h1>
      <Status winner={winner} move={moveNumber} nextPlayer={player} />
      <div className="board">
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={()=>handleSquareClick(0)} isWinning={winner && winner.winningLine.includes(0)} />
          <Square value={squares[1]} onSquareClick={()=>handleSquareClick(1)} isWinning={winner && winner.winningLine.includes(1)} />
          <Square value={squares[2]} onSquareClick={()=>handleSquareClick(2)} isWinning={winner && winner.winningLine.includes(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={()=>handleSquareClick(3)} isWinning={winner && winner.winningLine.includes(3)} />
          <Square value={squares[4]} onSquareClick={()=>handleSquareClick(4)} isWinning={winner && winner.winningLine.includes(4)} />
          <Square value={squares[5]} onSquareClick={()=>handleSquareClick(5)} isWinning={winner && winner.winningLine.includes(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={()=>handleSquareClick(6)} isWinning={winner && winner.winningLine.includes(6)} />
          <Square value={squares[7]} onSquareClick={()=>handleSquareClick(7)} isWinning={winner && winner.winningLine.includes(7)} />
          <Square value={squares[8]} onSquareClick={()=>handleSquareClick(8)} isWinning={winner && winner.winningLine.includes(8)} />
        </div>
      </div>
      <History history={history} winner={winner} backTo={handleBackTo}/>
    </div>
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