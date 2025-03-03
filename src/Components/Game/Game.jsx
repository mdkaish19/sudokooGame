import { useEffect } from "react";
import { useBoard } from "../../store/useBoard";
import { useNavigate } from "react-router-dom";
import Board from "../Board/Board";

export default function Game() {
  const {
    isStart,
    quitGame,
    useHint,
    hints,
    isPause,
    pauseGame,
    resetBoard,
    increaseTime,
    isComplete
  } = useBoard();
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!isStart) navigate("/", { replace: true });
    
    const timer = setInterval(() => {
      if (!isPause && !isComplete) increaseTime();
    }, 1000);

    return () => clearInterval(timer);
  }, [isPause, isComplete, increaseTime, isStart, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-900">
      <Board
        onQuit={() => {
          quitGame();
          navigate("/");
        }}
        onPause={pauseGame}
        onReset={resetBoard}
        onHint={useHint}
        hints={hints}
        isPause={isPause}
      />
    </div>
  );
}