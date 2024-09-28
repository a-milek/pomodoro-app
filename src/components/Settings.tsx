import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Switch,
  useToast,
} from "@chakra-ui/react";
import { Times } from "../configuration/Time";
import { useEffect, useState } from "react";

interface Props {
  times: Times;
  updateTimes: (newTimes: Partial<Times>) => void;
  visibility: boolean;
  setVisibility: (visibility: boolean) => void;
}

const Settings = ({ times, updateTimes, visibility, setVisibility }: Props) => {
  const toast = useToast(); //toast hook (mandatory)
  const [tempTimes, setTempTimes] = useState(times); //temporary storage for set values

  useEffect(() => {
    setTempTimes(times);
  }, [times]);

  const handleSave = () => {
    updateTimes(tempTimes);
    toast({
      title: "Settings Saved!",
      description: "Your settings have been updated.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  return (
    <FormControl margin={3}>
      <FormLabel marginY={2}>Focus Time</FormLabel>
      <Input
        value={times.focusTime}
        onChange={(e) => updateTimes({ focusTime: parseFloat(e.target.value) })}
        type="number"
        min="1"
      />

      <FormLabel marginY={2}>Short Break Time</FormLabel>
      <Input
        value={times.shortBreakTime}
        onChange={(e) =>
          updateTimes({ shortBreakTime: parseFloat(e.target.value) })
        }
        type="number"
        min="1"
      />

      <FormLabel marginY={2}>Long Break Time</FormLabel>
      <Input
        value={times.longBreakTime}
        onChange={(e) =>
          updateTimes({ longBreakTime: parseFloat(e.target.value) })
        }
        type="number"
        min="1"
      />
      <HStack margin={3}>
        <FormLabel>Show Timer</FormLabel>
        <Switch
          colorScheme="red"
          size="lg"
          isChecked={visibility}
          onChange={() => setVisibility(!visibility)}
        />
      </HStack>
      <Button mt={4} colorScheme="red" type="button" onClick={handleSave}>
        Save
      </Button>
    </FormControl>
  );
};

export default Settings;
