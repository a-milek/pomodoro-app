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
    return savedTimes
      ? JSON.parse(savedTimes)
      : {
          focusTime: 25,
          shortBreakTime: 5,
          longBreakTime: 15,
        };
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
