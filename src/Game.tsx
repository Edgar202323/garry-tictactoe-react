import { useState } from 'react';
import Board from './Board';
import './App.css';

function calculateWinner(squares: (string | null)[]): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const winner = calculateWinner(currentSquares);
  const isBoardFull = currentSquares.every(square => square !== null);

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
      <div className="board-header">
        <div className="player-icons">
          <span className="player-x">X</span>
          <span className="player-o">O</span>
        </div>
        <div className="turn-indicator">
          {winner ? `Winner: ${winner}` : isBoardFull ? "It's a tie!" : `${xIsNext ? 'X' : 'O'} TURN`}
        </div>
        <button className="restart-icon" onClick={handleReset} title="Restart Game">
          🔄
        </button>
      </div>

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
