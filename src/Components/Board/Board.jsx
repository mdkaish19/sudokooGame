import { useCallback } from 'react';
import { useBoard } from '../../store/useBoard';
import Square from './Square';

export default function Board() {
  const {
    isPause,
    time,
    tryAgain,
    startGame,
    mode,
    changeBoard,
    mistake,
    totalMistakes,
    isComplete,
  } = useBoard();

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const formatTime = useCallback((seconds) => {
    const parsedSeconds = Math.max(0, Math.floor(seconds));
    const minutes = Math.floor(parsedSeconds / 60);
    const remainingSeconds = parsedSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }, []);

  const completeMessage = useCallback(() => {
    if (time < 60000) return `Great job! You completed the puzzle in ${formatTime(time)}.`;
    if (time < 120000) return `Good work! You finished in ${formatTime(time)}.`;
    return `You took ${formatTime(time)}. Keep practicing!`;
  }, [time, formatTime]);

  const handleTryAgain = useCallback(() => {
    tryAgain();
  }, [tryAgain]);

  const handleNewGame = useCallback(() => {
    startGame(mode.key);
  }, [startGame, mode.key]);

  return (
    <>
      <div className="flex w-[100vw] h-[50vh] md:w-[600px] md:h-[600px] p-2 flex-col gap-2 relative">
        {isPause && (
          <div 
            role="alert"
            className="text-6xl gameStop absolute bg-slate-800 border shadow-black border-black p-10 rounded-xl shadow-lg top-[50%] opacity-100 z-10 left-[50%] -translate-x-[50%] -translate-y-[50%]"
          >
            Paused
          </div>
        )}

        {isComplete && (
          <div className="text-2xl w-full gameStop absolute bg-slate-700 border border-black p-10 rounded-xl shadow-lg top-[50%] opacity-100 z-10 left-[50%] -translate-x-[50%] -translate-y-[50%]">
            <p>
              {mistake >= totalMistakes ? 'All Mistakes Used' : completeMessage()}
            </p>
            <div className="flex items-center p-5 justify-around">
              <button
                type="button"
                onClick={handleTryAgain}
                disabled={isPause}
                className="option bg-slate-900 pause disabled:opacity-35 disabled:hover:bg-slate-900 disabled:active:scale-100 p-3 rounded-md hover:bg-slate-800 active:scale-90"
              >
                Try Again?
              </button>
              <button
                type="button"
                onClick={handleNewGame}
                className="option bg-slate-900 pause disabled:opacity-35 disabled:hover:bg-slate-900 disabled:active:scale-100 p-3 rounded-md hover:bg-slate-800 active:scale-90"
              >
                Start New
              </button>
            </div>
          </div>
        )}

        <header className="flex justify-around text-xl pt-5 w-full">
          <p>Mode: <span className="font-semibold">{mode.name}</span></p>
          <p>
            Mistake: {' '}
            <span className="font-semibold">
              {mistake}/{totalMistakes}
            </span>
          </p>
          <p>Time: <span className="font-semibold">{formatTime(time)}</span></p>
        </header>

        <section className="flex flex-col gap-2 h-full w-full">
          {[0, 1, 2].map((row) => (
            <div key={row} className="flex gap-2 h-full w-full">
              {[0, 1, 2].map((col) => (
                <Square key={`${row}-${col}`} row={row} col={col} />
              ))}
            </div>
          ))}
        </section>
      </div>

      <nav className="flex justify-around select-none w-full">
        {numbers.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => changeBoard(n)}
            className="text-slate-200 bg-neutral-900 shadow-lg p-2 outline-[1px] md:px-3 rounded-md my-5 text-2xl cursor-pointer hover:outline"
          >
            {n}
          </button>
        ))}
      </nav>
    </>
  );
}
