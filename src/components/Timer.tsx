import { Button, Heading, HStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface Props {
  initialTime: number;
}

const Timer = ({ initialTime }: Props) => {
  // Initial time in seconds (1 hour)

  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    let timerInterval: number | undefined;

    if (isActive && timeRemaining > 0) {
      timerInterval = window.setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      // Actions to perform when the timer reaches zero
      alert("Countdown complete!");
      setActive(false);
    }

    // Cleanup the interval on component unmount or when isActive changes
    return () => clearInterval(timerInterval);
  }, [isActive, timeRemaining]);

  const resetTimer = () => {
    setTimeRemaining(initialTime);
    setActive(false);
  };

  // Convert seconds to hours, minutes, and seconds
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  return (
    <div>
      <p>Focus Timer:</p>

      <Heading>{`${hours}h ${minutes}m ${seconds}s`}</Heading>

      <HStack align="center" justify="center" spacing="10px">
        <Button onClick={() => (setActive(!isActive), console.log(isActive))}>
          {isActive ? "Pause" : "Start"}
        </Button>
        <Button onClick={resetTimer}>Reset</Button>
      </HStack>
    </div>
  );
};

export default Timer;
