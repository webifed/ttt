import { useState } from 'react';
import './Board.css';

function Square() {
  const [value, setValue] = useState(null);

  const handleClick = () => {
    setValue('x');
  }

  return (
    <button className="square" onClick={handleClick}>{value}</button>
  )
}

export default function Board() {
  return(
    <div className="board">
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </div>
  )
}
