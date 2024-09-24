import "./App.css";

import Timer from "./components/Timer";

import { Grid, GridItem } from "@chakra-ui/react";
import Settings from "./components/Settings";
import { useState } from "react";
import NavBar from "./components/Header";

function App() {
  const [showSettings, setShowSettings] = useState(false);

  const [focusTime, setFocusTime] = useState(45);
  const [breakTime, setBreakTime] = useState(10);

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
            breakTime={breakTime}
            setBreakTime={setBreakTime}
          ></Settings>
        ) : (
          <Timer focusTime={focusTime} breakTime={breakTime}></Timer>
        )}
      </GridItem>
    </Grid>
  );
}

export default App;
