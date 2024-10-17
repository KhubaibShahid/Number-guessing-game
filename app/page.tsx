"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";



export default function App() {

  let [gameStatus, setGameStatus] = useState("stop")
  let [attempts, setAttempts] = useState(0);
  let [userNum, setUserNum] = useState(0);
  let num = useRef(0);

  function startGame() {
    num.current = Math.ceil(Math.random() * 10);
    setGameStatus("start");
  }

  function matchNumber() {
    console.log(num.current, attempts)
    if(userNum === num.current) {
      setGameStatus("finish")
    } else {
      setAttempts(attempts + 1);
    }
  }

  function tryAgain() {
    setAttempts(0);
    setUserNum(0);
    num.current = 0;
    setGameStatus("stop");
  }

  function gameRestart() {
    setAttempts(0);
    setUserNum(0);
    num.current = 0;
    setGameStatus("stop");
  }

  return (
    <div className="w-full h-svh bg-gradient-to-r px-2 from-gray-800 to-black flex justify-center items-center">
      <div className="bg-white max-w-md w-full min-h-48 rounded-xl py-8 px-6 text-center">
        <h1 className="text-3xl font-bold text-center">Number Guessing Game</h1>
        <p className="text-center mt-2">Try to guess the number between 1 and 10!</p>
        {gameStatus == "start" ? <div>
          <Button onClick={() => gameRestart()} className="mt-3 bg-gray-500">Restart</Button>
          <div className="flex justify-center gap-3 my-5 flex-wrap">
            <Input onChange={(e) => setUserNum(Number(e.target.value))} className="rounded-md bg-gray-100 min-w-48 max-w-72" placeholder="Enter your guess" type="number" />
            <Button onClick={() => matchNumber()}>Guess</Button>
          </div>
            <div>Attempts: {attempts}</div>
        </div> : gameStatus == "finish" ? <div className="mt-3">
          <h2 className="text-2xl font-bold">Game Over!</h2>
          <p>You guessed the number in {attempts} attempts.</p>
          <Button onClick={() => tryAgain()} className="mt-3" variant={"destructive"}>Try Again</Button>
        </div>:
        <Button onClick={() => startGame()} className="mt-3">Start Game</Button>

        }

      </div>
    </div>
  )
}