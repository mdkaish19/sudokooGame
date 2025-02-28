import { useCallback, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useBoard } from "../../store/useBoard";

const MiniSquare = ({ row, col }) => {
  const { setSelectedCell, selectedCell, Qboard, board, isPause } = useBoard();
  const cellRef = useRef(null);

  const handleClick = useCallback(() => {
    if (isPause || !Qboard?.[row]?.[col]) return;
    cellRef.current?.focus();
    setSelectedCell(row, col);
  }, [isPause, Qboard, row, col, setSelectedCell]);

  const selectionState = useMemo(() => {
    const state = { other: false, current: false };
    if (!selectedCell.cell || !Qboard?.[row]?.[col]) return state;

    // Check selection highlights
    const currentCell = Qboard[row][col];
    const selected = selectedCell.cell;

    state.other = selectedCell.squares?.some(([r, c]) => r === row && c === col) ||
                  selectedCell.row === row ||
                  selectedCell.col === col ||
                  (currentCell.value === Qboard[selected.row]?.[selected.col]?.value && 
                   currentCell.value !== 0);

    state.current = selected.row === row && selected.col === col;
    
    return state;
  }, [Qboard, selectedCell, row, col]);

  const cellData = Qboard?.[row]?.[col] || {};
  const mainValue = cellData.value;
  const pencilValue = cellData.pencilValue;
  const isDefault = cellData.default;

  return (
    <div
      ref={cellRef}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`Sudoku cell row ${row + 1}, column ${col + 1}`}
      className={`miniBox select-none flex items-center justify-center cursor-pointer bg-slate-800 w-full h-full
        ${selectionState.current ? 'bg-neutral-950 outline outline-blue-500' : ''}
        ${selectionState.other ? 'bg-slate-900' : ''}
        rounded-md hover:outline outline-[1px] relative transition-colors duration-200`}
    >
      {/* Main cell value */}
      {mainValue !== 0 && (
        <span
          className={`text-2xl md:text-3xl ${
            isDefault ? 'text-gray-400' :
            mainValue === board?.[row]?.[col] ? 'text-blue-600' : 'text-red-600'
          }`}
        >
          {mainValue}
        </span>
      )}

      {/* Pencil mark */}
      {pencilValue !== 0 && !isDefault && (
        <span className="text-green-600 text-base md:text-2xl absolute top-0 right-1">
          {pencilValue}
        </span>
      )}
    </div>
  );
};

MiniSquare.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
};

export default MiniSquare;

// import React, { useEffect, useRef, useState } from "react";
// import { useBoard } from "../../store/useBoard";

// export default function MiniSquare({ row, col }) {
//   const { setSelectedCell, selectedCell, Qboard, board, isPause } = useBoard();
//   const cellRef = useRef();
//   function handleClick() {
//     if (isPause) return;
//     cellRef.current?.focus();
//     setSelectedCell(row, col);
//   }
//   function isSelected() {
//     const query = { other: false, current: false };
//     if (selectedCell.cell) {
//       selectedCell.squares.forEach((sq) => {
//         if (sq[0] == row && sq[1] == col) query.other = true;
//       });
//       if (selectedCell.row == row) query.other = true;
//       if (selectedCell.col == col) query.other = true;
//       if (
//         Qboard[row][col].value ==
//           Qboard[selectedCell.row][selectedCell.col].value &&
//         Qboard[row][col].value != 0
//       )
//         query.other = true;
//       if (selectedCell.cell.row == row && selectedCell.cell.col == col)
//         query.current = true;
//     }
//     return query;
//   }

//   return (
//     <>
//       <div
//         ref={cellRef}
//         onClick={handleClick}
//         className={`miniBox select-none flex items-center justify-center cursor-pointer bg-slate-800 w-full h-full ${
//           isSelected().current && "bg-neutral-950 outline outline-blue-500"
//         } ${
//           isSelected().other && "bg-slate-900"
//         } rounded-md hover:outline outline-[1px] relative`}
//       >
//         {!Qboard[row][col].value == 0 && (
//           <span
//             className={` ${
//               Qboard[row][col].default
//                 ? "text-gray-400"
//                 : Qboard[row][col].value == board[row][col]
//                 ? "text-blue-600"
//                 : "text-red-600"
//             } text-2xl value md:text-3xl`}
//           >
//             {Qboard[row][col].value}
//           </span>
//         )}
//         {!Qboard[row][col].pencilValue == 0 && !Qboard[row][col].default && (
//           <span className={` text-green-600 value text-base md:text-2xl absolute -top-1 right-1`}>
//             {Qboard[row][col].pencilValue}
//           </span>
//         )}
//       </div>
//     </>
//   );
// }
