import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  NumberInput,
  NumberInputField,
  Select,
  Switch,
} from "@chakra-ui/react";
import { Times } from "../configuration/Time";
import { useEffect, useState } from "react";

interface Props {
  times: Times;
  updateTimes: (newTimes: Partial<Times>) => void;
  visibility: boolean;
  setVisibility: (visibility: boolean) => void;
  handleSave: (tempTimes: Times) => void;
}

const Settings = ({
  times,
  updateTimes,
  visibility,
  setVisibility,
  handleSave,
}: Props) => {
  const [tempTimes, setTempTimes] = useState(times);
  useEffect(() => {
    setTempTimes(times);
  }, [times]);

  return (
    <FormControl margin={3}>
      <FormLabel marginY={2}>Focus Time</FormLabel>
      <NumberInput
        value={times.focusTime}
        onChange={(e) => updateTimes({ focusTime: parseFloat(e) })}
        max={100}
        min={1}
      >
        <NumberInputField />
      </NumberInput>

      <FormLabel marginY={2}>Short Break Time</FormLabel>
      <NumberInput
        value={times.shortBreakTime}
        onChange={(e) => updateTimes({ shortBreakTime: parseFloat(e) })}
        max={100}
        min={1}
      >
        <NumberInputField />
      </NumberInput>

      <FormLabel marginY={2}>Long Break Time</FormLabel>
      <NumberInput
        value={times.longBreakTime}
        onChange={(e) => updateTimes({ longBreakTime: parseFloat(e) })}
        max={100}
        min={1}
      >
        <NumberInputField />
      </NumberInput>

      <HStack margin={3}>
        <FormLabel>Show Timer</FormLabel>
        <Switch
          colorScheme="red"
          size="lg"
          isChecked={visibility}
          onChange={() => setVisibility(!visibility)}
        />
      </HStack>
      <Button
        mt={4}
        colorScheme="red"
        type="button"
        onClick={() => handleSave(tempTimes)}
      >
        Save
      </Button>
    </FormControl>
  );
};

export default Settings;
