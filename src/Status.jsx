import './Status.css';

export default function Status({winner, move, nextPlayer}) {
  let status;

  if (winner) {
    status = <p className="status__win"><strong>GAME OVER!</strong> Player <strong>{winner.symbol}</strong> wins!</p>; 
  } else if (!winner && move === 9) {
    status = <p className="status__draw">It's <strong>DRAW!</strong></p>;
  }
  else {
    status = <p className="status__next">Next player: <strong>{nextPlayer}</strong></p>;
  }

  return <div className="status">{status}</div>;
}