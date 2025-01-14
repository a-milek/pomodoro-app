import {
  Button,
  CircularProgress,
  CircularProgressLabel,
  Heading,
  HStack,
  useDisclosure,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useSound from "use-sound";
import { Times } from "../configuration/Time";
import { getSessionConfig } from "../configuration/sessionConfig";
import soundFile from "../assets/sounds/531031__creeeeak__bell8.wav";
import { IoIosPause, IoIosPlay, IoIosRefresh } from "react-icons/io";

interface Props {
  times: Times;
  visibility: boolean;
  volume: number;
}

const Timer = ({ times, visibility, volume }: Props) => {
  const [isActive, setActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(times.focusTime * 60);
  const [elapsedBeforePause, setElapsedBeforePause] = useState(0); // Tracks elapsed time before pausing
  const [startTime, setStartTime] = useState<number | null>(null);
  const [sessionCounter, setSessionCounter] = useState(0);
  const [currentMode, setCurrentMode] = useState<
    "focus" | "shortBreak" | "longBreak"
  >("focus");

  const [play] = useSound(soundFile, { volume: volume / 100 });
  const sessionConfig = getSessionConfig(
    times.focusTime,
    times.shortBreakTime,
    times.longBreakTime
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    let timerInterval: number | undefined;

    if (isActive) {
      if (!startTime) setStartTime(Date.now());

      timerInterval = window.setInterval(() => {
        if (startTime) {
          const elapsedTime =
            elapsedBeforePause + (Date.now() - startTime) / 1000; // Add previously elapsed time
          const newTimeRemaining = Math.ceil(
            sessionConfig[currentMode].time - elapsedTime
          );
          setTimeRemaining(newTimeRemaining);

          if (newTimeRemaining === 0) {
            clearInterval(timerInterval);
            handleSessionEnd();
          }
        }
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [isActive, startTime, elapsedBeforePause, currentMode]);

  const handleSessionEnd = () => {
    play();
    onOpen();

    if (currentMode === "focus") {
      if (sessionCounter < 3) {
        setCurrentMode("shortBreak");
        setTimeRemaining(sessionConfig.shortBreak.time);
        setSessionCounter((prev) => prev + 1);
      } else {
        setCurrentMode("longBreak");
        setTimeRemaining(sessionConfig.longBreak.time);
        setSessionCounter(0);
      }
    } else {
      setCurrentMode("focus");
      setTimeRemaining(sessionConfig.focus.time);
    }

    setActive(false);
    setElapsedBeforePause(0); // Reset elapsed time
    setStartTime(null);
  };

  const resetTimer = () => {
    setTimeRemaining(sessionConfig[currentMode].time);
    setActive(false);
    setElapsedBeforePause(0);
    setStartTime(null);
  };

  const toggleTimer = () => {
    if (isActive) {
      // Pause logic
      const elapsedTime =
        elapsedBeforePause + (Date.now() - (startTime ?? 0)) / 1000;
      setElapsedBeforePause(elapsedTime); // Save elapsed time
      setStartTime(null); // Clear startTime
    } else {
      // Resume logic
      setStartTime(Date.now()); // Start tracking from now
    }
    setActive(!isActive);
  };

  const continueTimer = () => {
    setTimeRemaining(sessionConfig[currentMode].time);
    setActive(true);
    setStartTime(Date.now());
    setElapsedBeforePause(0);
    onClose();
  };

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = Math.floor(timeRemaining % 60);

  const progressValue =
    100 - (timeRemaining * 100) / sessionConfig[currentMode].time;

  return (
    <div>
      <Heading>
        {currentMode === "focus"
          ? "•".repeat(sessionCounter + 1)
          : "•".repeat(sessionCounter)}
      </Heading>
      <Heading>{sessionConfig[currentMode].text}</Heading>

      <CircularProgress
        size="100%"
        value={progressValue}
        color={sessionConfig[currentMode].wheelColor}
      >
        <CircularProgressLabel>
          <Heading as="h4" fontSize="3xl" data-testid="timer-display">
            {visibility ? (
              <>
                {hours > 0 ? `${hours}h ` : ""}
                {minutes > 0 ? `${minutes}m ` : ""}
                {seconds > 0 ? `${seconds}s ` : ""}
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
          onClick={toggleTimer}
          data-testid="start-button"
        >
          {isActive ? (
            <IoIosPause fontSize="20px" />
          ) : (
            <IoIosPlay fontSize="20px" />
          )}
        </Button>

        <Button
          colorScheme="green"
          onClick={resetTimer}
          data-testid="reset-button"
        >
          <IoIosRefresh fontSize="20px" />
        </Button>
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Session Complete</ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button
              colorScheme="green"
              onClick={continueTimer}
              data-testid="modal-button"
            >
              Continue
            </Button>
            <Button colorScheme="red" onClick={onClose} ml={3}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Timer;
