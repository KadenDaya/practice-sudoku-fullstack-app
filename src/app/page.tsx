'use client';

import { useState, useEffect } from 'react';

interface SudokuCell {
  value: number | null;
  isEditable: boolean;
  isSelected: boolean;
}

export default function SudokuBoard() {
  const [board, setBoard] = useState<SudokuCell[][]>(() => {
    // Initialize empty 9x9 board - all cells editable until backend provides state
    const initialBoard: SudokuCell[][] = [];
    for (let row = 0; row < 9; row++) {
      initialBoard[row] = [];
      for (let col = 0; col < 9; col++) {
        initialBoard[row][col] = {
          value: null,
          isEditable: true,
          isSelected: false,
        };
      }
    }
    return initialBoard;
  });

  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!selectedCell) return;

      const { row, col } = selectedCell;
      const cell = board[row][col];

      if (!cell.isEditable) return;

      // Handle number input (1-9)
      if (event.key >= '1' && event.key <= '9') {
        const newValue = parseInt(event.key);
        setBoard(prevBoard => {
          const newBoard = [...prevBoard];
          newBoard[row] = [...newBoard[row]];
          newBoard[row][col] = { ...newBoard[row][col], value: newValue };
          return newBoard;
        });
      }
      // Handle delete/backspace
      else if (event.key === 'Delete' || event.key === 'Backspace') {
        setBoard(prevBoard => {
          const newBoard = [...prevBoard];
          newBoard[row] = [...newBoard[row]];
          newBoard[row][col] = { ...newBoard[row][col], value: null };
          return newBoard;
        });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedCell, board]);

  const handleCellClick = (row: number, col: number) => {
    // Clear previous selection
    setBoard(prevBoard => {
      const newBoard = prevBoard.map(rowArr => 
        rowArr.map(cell => ({ ...cell, isSelected: false }))
      );
      return newBoard;
    });

    // Set new selection
    setSelectedCell({ row, col });
    setBoard(prevBoard => {
      const newBoard = [...prevBoard];
      newBoard[row] = [...newBoard[row]];
      newBoard[row][col] = { ...newBoard[row][col], isSelected: true };
      return newBoard;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Sudoku Board</h1>
      
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="relative">
          {/* Main grid */}
          <div className="grid grid-cols-9 gap-1">
            {board.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`
                    w-12 h-12 border border-gray-300 flex items-center justify-center text-lg font-semibold cursor-pointer
                    bg-white hover:bg-blue-50
                    ${cell.isSelected ? 'bg-blue-200' : ''}
                  `}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {cell.value}
                </div>
              ))
            )}
          </div>
          
          {/* Block borders */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Vertical lines */}
            <div className="absolute left-1/3 w-0.5 h-full bg-gray-800"></div>
            <div className="absolute left-2/3 w-0.5 h-full bg-gray-800"></div>
            
            {/* Horizontal lines */}
            <div className="absolute top-1/3 w-full h-0.5 bg-gray-800"></div>
            <div className="absolute top-2/3 w-full h-0.5 bg-gray-800"></div>
            
            {/* Outer border */}
            <div className="absolute inset-0 border-2 border-gray-800"></div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-gray-600">
        <p className="mb-2">Instructions:</p>
        <p>• Click on a cell to select it</p>
        <p>• Press 1-9 to enter numbers</p>
        <p>• Press Delete/Backspace to clear a cell</p>
        <p>• All cells are editable until backend provides game state</p>
      </div>
    </div>
  );
}