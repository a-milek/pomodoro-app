import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  NumberInput,
  NumberInputField,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Switch,
} from "@chakra-ui/react";
import { Times } from "../configuration/Time";
import { useEffect, useState } from "react";

interface Props {
  times: Times;
  updateTimes: (newTimes: Partial<Times>) => void;

  visibility: boolean;
  setVisibility: (visibility: boolean) => void;

  volume: number;
  setVolume: (volume: number) => void;

  handleSave: (tempTimes: Times) => void;
}

const Settings = ({
  times,
  updateTimes,
  visibility,
  setVisibility,
  handleSave,
  volume,
  setVolume,
}: Props) => {
  const [tempTimes, setTempTimes] = useState(times);
  useEffect(() => {
    setTempTimes(times);
  }, [times]);

  const [sliderValue, setSliderValue] = useState(volume);

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <FormControl margin={3} width="60%">
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

        <Box paddingY={3}>
          <FormLabel>Sound Volume</FormLabel>
          <HStack>
            <Slider
              id="volSlider"
              aria-label="volume-slider"
              defaultValue={volume}
              onChange={setSliderValue}
              onChangeEnd={(val) => setVolume(val)} // Update volume when slider changes
              colorScheme="red"
              min={0}
              max={100}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb boxSize={4} />
            </Slider>
            <FormLabel marginY={1}>{sliderValue}%</FormLabel>
          </HStack>
        </Box>

        <HStack marginY={3}>
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
    </Box>
  );
};

export default Settings;
