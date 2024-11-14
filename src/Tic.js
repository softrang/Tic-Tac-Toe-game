import React, { useState } from 'react';

const Tic = () => {
  const [turn, setTurn] = useState('X');
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  const checkWinner = (newBoard) => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] !== null || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const check = checkWinner(newBoard);
    if (check) {
      setWinner(check);
    } else {
      setTurn(turn === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn('X');
    setWinner(null);
  };

  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center bg-gray-900 text-gray-300">
      <h1 className="text-2xl mb-4">
        {winner ? `Winner: ${winner}` : `Turn: ${turn}`}
      </h1>
      
      <div className="grid grid-cols-3 grid-rows-3 gap-2">
        {board.map((value, index) => (
          <button
            key={index}
            className="w-16 h-16 text-xl border border-gray-500 btn m-2"
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>
      
      <button 
        className="mt-4 p-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
};

export default Tic;
