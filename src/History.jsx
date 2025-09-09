import './History.css';

export default function History({history, winner, backTo}) {
  const moves = [...history];
  moves.pop();

  return (
  <ul className="history">
    {
    moves.map((val, key) => {
      return <li className="history__item" key={key}>
        <button onClick={() => backTo(key) }>
          <svg width="50px" height="50px" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><path d="M25 38c-5.1 0-9.7-3-11.8-7.6l1.8-.8c1.8 3.9 5.7 6.4 10 6.4 6.1 0 11-4.9 11-11s-4.9-11-11-11c-4.6 0-8.5 2.8-10.1 7.3l-1.9-.7c1.9-5.2 6.6-8.6 12-8.6 7.2 0 13 5.8 13 13s-5.8 13-13 13z"/><path d="M20 22h-8v-8h2v6h6z"/>
          </svg>
        { key === 0 ? 'Back to start' : `Back to move #${key}`}
        </button></li>
    })
    }
    { !winner &&
    <li className="history__item history__item--current">{`Yuo're on move #${moves.length + 1}`}</li>
    }
  </ul>
  )
}