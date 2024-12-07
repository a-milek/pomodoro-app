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
  onSessionEnd: () => void;
}

const Timer = ({ times, visibility, onSessionEnd }: Props) => {
  const [isActive, setActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(times.focusTime * 60);
  const [sessionCounter, setSessionCounter] = useState(0);
  const [currentMode, setCurrentMode] = useState<
    "focus" | "shortBreak" | "longBreak"
  >("focus");

  const [play] = useSound(soundFile);

  //getting sessionConfig values
  const sessionConfig = getSessionConfig(
    times.focusTime,
    times.shortBreakTime,
    times.longBreakTime
  );

  // Modal control
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    let timerInterval: number | undefined;

    //counting down
    if (isActive && timeRemaining > 0) {
      timerInterval = window.setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      //if end
      play(); //play sound
      onSessionEnd();
      onOpen(); // Open the modal when the session ends

      //determining modes
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
      setActive(false); //turn off timer
    }

    return () => clearInterval(timerInterval);
  }, [isActive, timeRemaining, currentMode, sessionCounter, times]);

  //reseting timer
  const resetTimer = () => {
    setTimeRemaining(sessionConfig[currentMode].time); // Reset to current session time
    setActive(false);
  };

  //Continuing after modal
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
          {isActive ? (
            <IoIosPause fontSize="20px" />
          ) : (
            <IoIosPlay fontSize="20px" />
          )}
        </Button>

        <Button colorScheme="green" onClick={resetTimer}>
          <IoIosRefresh fontSize="20px" />
        </Button>
      </HStack>
      {/*Modal with a session ending message */}
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
