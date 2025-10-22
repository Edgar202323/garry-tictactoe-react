import { useState } from 'react';
import Board from './Board';
import './App.css';

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: (string | null)[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  function handleReset() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  const moves = history
    .map((squares, move) => {
      if (move === 0) return null;
      return (
        <li key={move}>
          {move === currentMove ? (
            <span>You are at move #{move}</span>
          ) : (
            <button onClick={() => jumpTo(move)}>Go to move #{move}</button>
          )}
        </li>
      );
    })
    .filter(Boolean);

  return (
    <div className="game">
      <div className="game-board">
        <button className="icon-button" onClick={handleReset} title="Restart Game">
          🔄
        </button>
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
        />
      </div>
      <div className="game-info">
        <ol className="move-list">{moves}</ol>
      </div>
    </div>
  );
}
