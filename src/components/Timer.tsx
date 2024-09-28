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

interface Props {
  times: Times; // Use the Times type
  visibility: boolean;
  onSessionEnd: () => void;
}

const Timer = ({ times, visibility, onSessionEnd }: Props) => {
  const [isActive, setActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(times.focusTime * 60); // Initial focus time in seconds
  const [sessionCounter, setSessionCounter] = useState(0);
  const [currentMode, setCurrentMode] = useState<
    "focus" | "shortBreak" | "longBreak"
  >("focus");

  const [play] = useSound("../sounds/531031__creeeeak__bell8.wav");
  const sessionConfig = getSessionConfig(
    times.focusTime,
    times.shortBreakTime,
    times.longBreakTime
  );

  // Modal control
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    let timerInterval: number | undefined;

    if (isActive && timeRemaining > 0) {
      timerInterval = window.setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      play();
      onSessionEnd();
      onOpen(); // Open the modal when the session ends

      if (currentMode === "focus" && sessionCounter < 3) {
        setCurrentMode("shortBreak");
        setTimeRemaining(sessionConfig.shortBreak.time);
      } else if (sessionCounter === 3) {
        setCurrentMode("longBreak");
        setTimeRemaining(sessionConfig.longBreak.time);
        setSessionCounter(0);
      } else {
        setSessionCounter((prevCount) => prevCount + 1);
        setCurrentMode("focus");
        setTimeRemaining(sessionConfig.focus.time);
      }
      setActive(false);
    }

    return () => clearInterval(timerInterval);
  }, [isActive, timeRemaining, currentMode, sessionCounter, times]);

  const resetTimer = () => {
    setTimeRemaining(sessionConfig[currentMode].time);
    setActive(false);
  };

  const continueTimer = () => {
    setTimeRemaining(sessionConfig[currentMode].time); // Reset to current session time
    setActive(true); // Unpause the timer
    onClose(); // Close the modal
  };

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  const currentSession = sessionConfig[currentMode];
  return (
    <div>
      <Heading>
        <Heading>{currentSession.text}:</Heading>
      </Heading>
      <CircularProgress
        size="100%"
        value={100 - (timeRemaining * 100) / currentSession.time}
        color={currentSession.wheelColor}
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

      {/* Modal for session end */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your session has ended</ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button colorScheme="green" onClick={continueTimer}>
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
