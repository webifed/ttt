// Square.jsx
import './Square.css';

export default function Square({ value, onSquareClick, isWinning }) {
  return (
    <button className={`square ${isWinning ? 'square--red' : ''}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}
