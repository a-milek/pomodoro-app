import {
  Button,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useToast,
} from "@chakra-ui/react";

interface Props {
  focusTime: number;
  setFocusTime: React.Dispatch<React.SetStateAction<number>>;
  breakTime: number;
  setBreakTime: React.Dispatch<React.SetStateAction<number>>;
}

const Settings = ({
  focusTime,
  setFocusTime,
  breakTime,
  setBreakTime,
}: Props) => {
  const toast = useToast();
  const handleSave = () => {
    localStorage.setItem("focusTime", focusTime.toString());
    localStorage.setItem("breakTime", breakTime.toString());
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

        <FormLabel>Break time</FormLabel>
        <NumberInput
          max={200}
          min={1}
          margin={3}
          value={breakTime}
          onChange={(valueString) => setBreakTime(Number(valueString))}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        <Button mt={4} colorScheme="red" type="submit" onClick={handleSave}>
          Save
        </Button>
      </FormControl>
    </>
  );
};

export default Settings;
