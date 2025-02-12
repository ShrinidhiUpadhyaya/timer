import DLabelInput from "./components/DLabelInput";
import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Label } from "./components/ui/label";

function App() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  const toggleTimer = () => {
    if (!isRunning && time === 0) {
      setTime(calculateTime());
    }
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  const calculateTime = () => {
    return hours * 3600 + minutes * 60 + seconds;
  };

  const getFormattedTime = () => {
    const tempHours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const tempSeconds = time % 60;

    return `${tempHours.toString().padStart(2, "0")} : ${minutes
      .toString()
      .padStart(2, "0")} : ${tempSeconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    let interValId: NodeJS.Timeout;

    const decrementTimer = () => {
      if (time === 0) {
        setIsRunning(false);
      }
      if (isRunning) {
        interValId = setInterval(() => setTime((prev) => prev - 1), 1000);
      }
    };

    decrementTimer();

    return () => {
      clearInterval(interValId);
    };
  }, [isRunning]);

  return (
    <>
      <h1>Timer App</h1>
      <Label>{getFormattedTime()}</Label>
      <div className="flex gap-4">
        <DLabelInput
          label="Hours"
          defaultValue={hours}
          onValueChange={setHours}
        />
        <DLabelInput
          label="Minutes"
          defaultValue={minutes}
          onValueChange={setMinutes}
        />
        <DLabelInput
          label="Seconds"
          defaultValue={seconds}
          onValueChange={setSeconds}
        />
      </div>

      <div className="flex gap-2">
        <Button
          className={`${isRunning ? "bg-red-600" : "bg-green-600"}`}
          onClick={toggleTimer}
        >
          {" "}
          {isRunning ? "Stop" : "Start"}
        </Button>
        <Button onClick={() => handleReset()}>Reset</Button>
      </div>
    </>
  );
}

export default App;
