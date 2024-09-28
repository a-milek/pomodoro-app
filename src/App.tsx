import "./App.css";

import Timer from "./components/Timer";

import { Grid, GridItem } from "@chakra-ui/react";
import Settings from "./components/Settings";
import { useState } from "react";
import NavBar from "./components/NavBar";

function App() {
  const [showSettings, setShowSettings] = useState(false);

  const [focusTime, setFocusTime] = useState(25);
  const [shortBreakTime, setShortBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(15);
  const [visibility, setVisibility] = useState(true); // Move visibility state here

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
            focusTime={focusTime}
            setFocusTime={setFocusTime}
            shortBreakTime={shortBreakTime}
            setShortBreakTime={setShortBreakTime}
            longBreakTime={longBreakTime}
            setLongBreakTime={setLongBreakTime}
            visibility={visibility} // Pass visibility to Settings
            setVisibility={setVisibility} // Pass setVisibility to Settings
          ></Settings>
        ) : (
          <Timer
            focusTime={focusTime}
            shortBreakTime={shortBreakTime}
            longBreakTime={longBreakTime}
            visibility={visibility}
          ></Timer>
        )}
      </GridItem>
    </Grid>
  );
}

export default App;
