import {
  Button,
  CircularProgress,
  CircularProgressLabel,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useSound from "use-sound";

interface Props {
  focusTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  visibility: boolean;
}
const Timer = ({
  focusTime,
  shortBreakTime,
  longBreakTime,
  visibility,
}: Props) => {
  const [isFocusMode, setIsFocusMode] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(focusTime * 60);
  const [isActive, setActive] = useState(false);
  const [sessionCounter, setSessionCounter] = useState(0);
  const [wheelColor, setWheelColor] = useState("#A20021");
  const [text, setText] = useState("Focus Time");

  const [play] = useSound("src/sounds/531031__creeeeak__bell8.wav");

  useEffect(() => {
    let timerInterval: number | undefined;

    if (isActive && timeRemaining > 0) {
      timerInterval = window.setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      play();

      if (isFocusMode && sessionCounter < 3) {
        setTimeRemaining(shortBreakTime * 60);
        setWheelColor("#FFDA44");
        setText("Short Break");
      } else if (sessionCounter == 3) {
        setTimeRemaining(longBreakTime * 60);
        setWheelColor("#85BAA1");
        setText("Long Break");
        setSessionCounter(0);
      } else {
        setSessionCounter(sessionCounter + 1);
        setTimeRemaining(focusTime * 60);
        setWheelColor("#A20021");
        setText("Focus Time");
      }
      setIsFocusMode(!isFocusMode);
    }

    return () => clearInterval(timerInterval);
  }, [
    isActive,
    timeRemaining,
    isFocusMode,
    focusTime,
    shortBreakTime,
    longBreakTime,
  ]);

  const resetTimer = () => {
    setTimeRemaining(isFocusMode ? focusTime * 60 : shortBreakTime * 60);
    setActive(false);
  };

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  return (
    <div>
      <Heading>{text}:</Heading>
      <CircularProgress
        size="100%"
        value={
          100 -
          (timeRemaining * 100) /
            (isFocusMode
              ? focusTime * 60
              : text == "Short Break"
              ? shortBreakTime * 60
              : longBreakTime * 60)
        }
        color={wheelColor}
      >
        <CircularProgressLabel>
          <Heading as="h4" fontSize="3xl">
            {visibility ? (
              <>
                {hours > 0 && `${hours}h `}
                {minutes > 0 && `${minutes}m `}
                {seconds > 0 && `${seconds}s`}
              </>
            ) : (
              "Keep Going!"
            )}
          </Heading>
        </CircularProgressLabel>
      </CircularProgress>

      <HStack align="center" justify="center" spacing="10px" margin={5}>
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
