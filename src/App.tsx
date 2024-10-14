import "./App.css";
import Timer from "./components/Timer";
import { Grid, GridItem, useDisclosure, useToast } from "@chakra-ui/react";
import Settings from "./components/Settings";
import { useState } from "react";
import NavBar from "./components/NavBar";
import { Times } from "./configuration/Time";

import VideoIds from "./components/VideoIds";

function App() {
  const toast = useToast(); //toast hook (mandatory)
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
      return updatedTimes; // Ensure we return the updated state
    });
  };

  const { onOpen } = useDisclosure();

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
      }}
      width="95vw"
    >
      <GridItem area="nav" margin="0">
        <NavBar onClick={() => setShowSettings(!showSettings)} />
      </GridItem>

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
              onSessionEnd={onOpen}
            />
            <VideoIds />
          </>
        )}
      </GridItem>
    </Grid>
  );
}

export default App;
