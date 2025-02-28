import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useEffect, useCallback } from "react";
import { useBoard } from "../../store/useBoard";
import { useNavigate } from "react-router-dom";

function Home() {
  const buttonsRef = useRef([]);
  const modeRef = useRef(null);
  const { startGame, continueGame } = useBoard();
  const navigate = useNavigate();

  const handleStart = useCallback(() => {
    if (!modeRef.current) return;
    startGame(modeRef.current.value);
    localStorage.setItem('mode', modeRef.current.value);
    navigate('/game');
  }, [startGame, navigate]);

  const handleContinue = useCallback(() => {
    continueGame();
    navigate('/game');
  }, [continueGame, navigate]);

  // GSAP animations
  useGSAP(() => {
    gsap.from("#heading", {
      y: -50,
      opacity: 0,
      duration: 0.3,
      delay: 0.2,
    });
    
    gsap.from(buttonsRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.3,
      delay: 0.2,
      stagger: 0.1,
    });
  }, []);

  // Button interactions
  useEffect(() => {
    const setupButtonAnimations = () => {
      buttonsRef.current.forEach(button => {
        if (!button) return;

        const handlePress = () => gsap.to(button, { scale: 0.9, duration: 0.1 });
        const handleRelease = () => gsap.to(button, { scale: 1, duration: 0.1 });

        button.addEventListener('mousedown', handlePress);
        button.addEventListener('mouseup', handleRelease);
        button.addEventListener('mouseleave', handleRelease);

        return () => {
          button.removeEventListener('mousedown', handlePress);
          button.removeEventListener('mouseup', handleRelease);
          button.removeEventListener('mouseleave', handleRelease);
        };
      });
    };

    // Initialize mode from localStorage
    if (modeRef.current) {
      modeRef.current.value = localStorage.getItem('mode') || 'easy';
    }

    const cleanup = setupButtonAnimations();
    return cleanup;
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen justify-center">
      <div id="heading" className="flex flex-col items-center mb-8">
        <h1 className="text-6xl font-bold text-rose-500 mb-2">
          Sudoku Game
        </h1>
        <p className="text-2xl font-light text-gray-400 italic">
          Unleash Your Logical Prowess
        </p>
      </div>

      <div className="flex flex-col gap-5 items-center justify-center">
        <button
          onClick={handleStart}
          ref={el => el && buttonsRef.current.push(el)}
          className="option bg-slate-900 p-3 rounded-md hover:bg-slate-800 active:scale-90 w-48 text-center"
        >
          Start New
        </button>

        <button
          onClick={handleContinue}
          ref={el => el && buttonsRef.current.push(el)}
          className="option bg-slate-900 p-3 rounded-md hover:bg-slate-800 active:scale-90 w-48"
        >
          Continue
        </button>

        <div 
          ref={el => el && buttonsRef.current.push(el)} 
          className="flex option items-center gap-5"
        >
          <label className="text-xl font-semibold" htmlFor="mode">
            Difficulty:
          </label>
          <select
            className="bg-slate-900 p-3 rounded-lg"
            id="mode"
            ref={modeRef}
            defaultValue="easy"
          >
            <option value="veryEasy">Very Easy</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="extreme">Extreme</option>
            <option value="godlevel">God Level</option>
          </select>
        </div>
      </div>

      <footer className="text-center text-gray-400 text-sm mt-8">
        © 2025 All rights reserved. Md Kaish
      </footer>
    </div>
  );
}

export default Home;