import PropTypes from 'prop-types';
import MiniSquare from "./MiniSquare";

function Square({ row, col }) {
  const generateMiniSquares = (baseRow) => 
    [0, 1, 2].map((offset) => (
      <MiniSquare 
        key={`${baseRow}-${col*3+offset}`} 
        row={baseRow} 
        col={col*3 + offset} 
      />
    ));

  return (
    <div className="box w-full h-full gap-1 flex flex-col">
      {[0, 1, 2].map((rowOffset) => {
        const baseRow = row*3 + rowOffset;
        return (
          <div 
            key={`row-${baseRow}`} 
            className="flex gap-1 w-full h-full"
          >
            {generateMiniSquares(baseRow)}
          </div>
        );
      })}
    </div>
  );
}

Square.propTypes = {
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
};

export default Square;


// import React from "react";
// import MiniSquare from "./MiniSquare";


// function Square({row,col}) {
//   return (
//     <>
//       <div className="box w-full h-full gap-1 flex flex-col">
//         <div className="flex gap-1 w-full h-full">
//           <MiniSquare row={row*3}col={col*3}/>
//           <MiniSquare row={row*3}col={col*3+1}/>
//           <MiniSquare row={row*3}col={col*3+2}/>
//         </div>
//         <div className="flex gap-1 w-full h-full">
//           <MiniSquare row={row*3+1}col={col*3}/>
//           <MiniSquare row={row*3+1}col={col*3+1}/>
//           <MiniSquare row={row*3+1}col={col*3+2}/>
//         </div>
//         <div className="flex gap-1 w-full h-full">
//           <MiniSquare row={row*3+2}col={col*3}/>
//           <MiniSquare row={row*3+2}col={col*3+1}/>
//           <MiniSquare row={row*3+2}col={col*3+2}/>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Square;