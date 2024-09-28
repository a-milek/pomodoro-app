import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Switch,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  focusTime: number;
  setFocusTime: React.Dispatch<React.SetStateAction<number>>;
  shortBreakTime: number;
  setShortBreakTime: React.Dispatch<React.SetStateAction<number>>;
  longBreakTime: number;
  setLongBreakTime: React.Dispatch<React.SetStateAction<number>>;
  visibility: boolean; // Add visibility as a prop
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const Settings = ({
  focusTime,
  setFocusTime,
  shortBreakTime,
  setShortBreakTime,
  longBreakTime,
  setLongBreakTime,
  visibility,
  setVisibility,
}: Props) => {
  const toast = useToast();
  const handleSave = () => {
    localStorage.setItem("focusTime", focusTime.toString());
    localStorage.setItem("shortBreakTime", shortBreakTime.toString());
    localStorage.setItem("longBreakTime", longBreakTime.toString());
    toast({
      title: "Settings saved!",
      colorScheme: "green",
      duration: 1000,
      isClosable: true,
    });
  };

  return (
    <>
      <FormControl width="100%" marginY={4}>
        <FormLabel>Focus time</FormLabel>
        <NumberInput
          max={200}
          min={1}
          margin={3}
          value={focusTime}
          onChange={(valueString) => setFocusTime(Number(valueString))}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        <FormLabel>Short break time</FormLabel>
        <NumberInput
          max={200}
          min={1}
          margin={3}
          value={shortBreakTime}
          onChange={(valueString) => setShortBreakTime(Number(valueString))}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        <FormLabel>Long break time</FormLabel>
        <NumberInput
          max={200}
          min={1}
          margin={3}
          value={longBreakTime}
          onChange={(valueString) => setLongBreakTime(Number(valueString))}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        <HStack>
          <Heading as="h6" fontSize="l">
            Show Remaining Time
          </Heading>
          <Switch
            colorScheme="red"
            size="lg"
            isChecked={visibility}
            onChange={() => setVisibility(!visibility)}
          />
        </HStack>

        <Button mt={4} colorScheme="red" type="submit" onClick={handleSave}>
          Save
        </Button>
      </FormControl>
    </>
  );
};

export default Settings;
