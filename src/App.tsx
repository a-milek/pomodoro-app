import "./App.css";
import Timer from "./components/Timer";
import { Grid, GridItem, useToast } from "@chakra-ui/react";
import Settings from "./components/Settings";
import { useState } from "react";
import NavBar from "./components/NavBar";
import { Times } from "./configuration/Time";

import VideoIds from "./components/VideoIds";

function App() {
  const toast = useToast(); // Toast hook
  const [times, setTimes] = useState<Times>(() => {
    const savedTimes = localStorage.getItem("times");
    if (savedTimes) {
      return JSON.parse(savedTimes);
    } else {
      const defaultTimes = {
        focusTime: 25,
        shortBreakTime: 5,
        longBreakTime: 15,
      };
      localStorage.setItem("times", JSON.stringify(defaultTimes));
      return defaultTimes;
    }
  });

  const [showSettings, setShowSettings] = useState(false);
  const [visibility, setVisibility] = useState(true);

  const updateTimes = (newTimes: Partial<Times>) => {
    setTimes((prevTimes) => {
      const updatedTimes = { ...prevTimes, ...newTimes };
      localStorage.setItem("times", JSON.stringify(updatedTimes));
      return updatedTimes;
    });
  };

  const updateVolume = (newVolume: number) => {
    setVolume(newVolume);
    localStorage.setItem("volume", JSON.stringify(newVolume)); // Save volume to localStorage
  };

  const [volume, setVolume] = useState<number>(() => {
    const savedVolume = localStorage.getItem("volume");
    return savedVolume ? JSON.parse(savedVolume) : 100; // default to 100 if no saved value
  });

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
      }}
      width="95vw"
    >
      {/* NavBar Section */}
      <GridItem area="nav" margin="0">
        <NavBar onClick={() => setShowSettings(!showSettings)} />
      </GridItem>

      {/* Main Section */}
      <GridItem area={"main"}>
        {showSettings ? (
          <Settings
            times={times}
            updateTimes={updateTimes}
            visibility={visibility}
            setVisibility={setVisibility}
            volume={volume}
            setVolume={updateVolume}
            handleSave={(tempTimes) => {
              updateTimes(tempTimes);

              toast({
                title: "Settings Saved!",
                description: "Your settings have been updated.",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
              setShowSettings(false);
            }}
          />
        ) : (
          <>
            <Timer
              times={times}
              volume={volume}
              visibility={visibility}
              onSessionEnd={() => {
                console.log("Session Ended");
              }}
            />
            <VideoIds />
          </>
        )}
      </GridItem>
    </Grid>
  );
}

export default App;
