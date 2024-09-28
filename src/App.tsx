import "./App.css";
import Timer from "./components/Timer";
import { Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import Settings from "./components/Settings";
import { useState } from "react";
import NavBar from "./components/NavBar";
import { Times } from "./configuration/Time";

function App() {
  const [times, setTimes] = useState<Times>({
    focusTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
  });

  const [showSettings, setShowSettings] = useState(false);
  const [visibility, setVisibility] = useState(true);

  const updateTimes = (newTimes: Partial<Times>) => {
    setTimes((prevTimes) => ({ ...prevTimes, ...newTimes }));
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
          />
        ) : (
          <Timer
            times={times}
            visibility={visibility}
            onSessionEnd={onOpen} // Pass onOpen function to Timer
          />
        )}
      </GridItem>
    </Grid>
  );
}

export default App;
