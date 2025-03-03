/* eslint-disable react/prop-types */
import { useCallback } from 'react';
import { useBoard } from '../../store/useBoard';
import Square from './Square';

export default function Board({ 
  // eslint-disable-next-line react/prop-types
  onQuit, 
  onPause, 
  onReset, 
  onHint, 
  hints, 
  isPause 
}) {
  const {
    time,
    mode,
    mistake,
    totalMistakes,
    isComplete,
    changeBoard,
    tryAgain,
    startGame
  } = useBoard();

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const formatTime = useCallback((seconds) => {
    const parsedSeconds = Math.max(0, Math.floor(seconds));
    const minutes = Math.floor(parsedSeconds / 60);
    const remainingSeconds = parsedSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }, []);

  const completeMessage = useCallback(() => {
    if (time < 60000) return `Great job! Completed in ${formatTime(time)}`;
    if (time < 120000) return `Finished in ${formatTime(time)}`;
    return `Time: ${formatTime(time)}`;
  }, [time, formatTime]);

  const handleTryAgain = useCallback(() => {
    tryAgain();
  }, [tryAgain]);

  const handleNewGame = useCallback(() => {
    startGame(mode.key);
  }, [startGame, mode.key]);

  return (
    <div className="flex flex-col items-center gap-6 p-4 w-full max-w-3xl">
      {/* Game Header */}
      <header className="w-full bg-slate-800 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-rose-500">Sudoku</h1>
          <div className="flex gap-6 text-base">
            <div className="text-center">
              <p className="text-gray-300">Mode</p>
              <p className="text-lg text-blue-400">{mode.name}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-300">Mistakes</p>
              <p className={`text-lg ${mistake >= totalMistakes ? 'text-red-400' : 'text-green-400'}`}>
                {mistake}/{totalMistakes}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-300">Time</p>
              <p className="text-lg text-yellow-400">{formatTime(time)}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Game Board */}
      <div className="relative w-full aspect-square bg-slate-900 rounded-xl p-3">
        {/* Pause Overlay */}
        {isPause && (
          <div className="absolute inset-0 bg-slate-800/95 flex items-center justify-center rounded-xl z-20">
            <span className="text-5xl md:text-6xl text-white font-bold">PAUSED</span>
          </div>
        )}

        {/* Completion Overlay */}
        {isComplete && (
          <div className="absolute inset-0 bg-slate-700/95 flex flex-col items-center justify-center p-6 rounded-xl gap-4 z-10">
            <p className="text-2xl md:text-3xl text-center">
              {mistake >= totalMistakes ? 'Game Over' : completeMessage()}
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleTryAgain}
                className="px-6 py-3 bg-slate-900 rounded-lg hover:bg-slate-800 text-lg text-slate-200"
              >
                Retry
              </button>
              <button
                onClick={handleNewGame}
                className="px-6 py-3 bg-slate-900 rounded-lg hover:bg-slate-800 text-lg text-slate-200"
              >
                New Game
              </button>
            </div>
          </div>
        )}

        {/* Sudoku Grid */}
        <div className="grid grid-rows-3 grid-cols-3 gap-3 h-full">
          {[0, 1, 2].map((row) => (
            [0, 1, 2].map((col) => (
              <Square key={`${row}-${col}`} row={row} col={col} />
            ))
          ))}
        </div>
      </div>

      {/* Controls Section */}
      <div className="w-full space-y-6">
        {/* Number Pad */}
        <div className="grid grid-cols-9 gap-3">
          {numbers.map((n) => (
            <button
              key={n}
              onClick={() => changeBoard(n)}
              className="aspect-square bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors text-2xl font-bold text-slate-200"
            >
              {n}
            </button>
          ))}
        </div>

        {/* Control Buttons */}
        <div className="grid grid-cols-4 gap-3">
          <button
            onClick={onQuit}
            className="p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors text-lg text-slate-200"
          >
            Exit
          </button>
          <button
            onClick={onPause}
            className="p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors text-lg text-slate-200"
          >
            {isPause ? 'Resume' : 'Pause'}
          </button>
          <button
            onClick={onReset}
            className="p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors text-lg text-slate-200"
          >
            Reset
          </button>
          <button
            onClick={onHint}
            className="p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors text-lg text-slate-200 relative"
          >
            Hint
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-6 h-6 text-sm flex items-center justify-center">
              {hints}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}