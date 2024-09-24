import {
  Button,
  CircularProgress,
  CircularProgressLabel,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface Props {
  focusTime: number; // focus time in minutes
  breakTime: number; // break time in minutes
}

const Timer = ({ focusTime, breakTime }: Props) => {
  const [isFocusMode, setIsFocusMode] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(focusTime * 60);
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    let timerInterval: number | undefined;

    if (isActive && timeRemaining > 0) {
      timerInterval = window.setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      // Switch between focus and break when the timer hits 0
      if (isFocusMode) {
        setTimeRemaining(breakTime * 60); // Switch to break time
      } else {
        setTimeRemaining(focusTime * 60); // Switch to focus time
      }
      setIsFocusMode(!isFocusMode); // Toggle between focus/break mode
    }

    // Cleanup the interval on component unmount or when isActive changes
    return () => clearInterval(timerInterval);
  }, [isActive, timeRemaining, isFocusMode, focusTime, breakTime]);

  const resetTimer = () => {
    // Reset to the correct time depending on the current mode
    setTimeRemaining(isFocusMode ? focusTime * 60 : breakTime * 60);
    setActive(false);
  };

  // Convert seconds to hours, minutes, and seconds for display
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  return (
    <div>
      <Heading>{isFocusMode ? "Focus Time" : "Break Time"}:</Heading>
      <CircularProgress
        size="100%"
        value={
          100 -
          (timeRemaining * 100) /
            (isFocusMode ? focusTime * 60 : breakTime * 60)
        }
        color={isFocusMode ? "#A20021" : "#85BAA1"}
      >
        <CircularProgressLabel>
          <Heading as="h4" fontSize="3xl">
            {hours > 0 && `${hours}h `}
            {minutes > 0 && `${minutes}m `}
            {seconds > 0 && `${seconds}s`}
          </Heading>
        </CircularProgressLabel>
      </CircularProgress>

      <HStack align="center" justify="center" spacing="10px">
        <Button
          colorScheme={isActive ? "red" : "green"}
          onClick={() => setActive(!isActive)}
        >
          {isActive ? "Pause" : "Start"}
        </Button>
        <Button colorScheme="green" onClick={resetTimer}>
          Reset
        </Button>
      </HStack>
    </div>
  );
};

export default Timer;
