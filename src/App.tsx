import "./App.css";

import Timer from "./components/Timer";
import Header from "./components/Header";
import { Grid, GridItem } from "@chakra-ui/react";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
      }}
    >
      <GridItem area="nav" background="red">
        <Header />
      </GridItem>

      <GridItem area={"main"}>
        <Timer initialTime={60}></Timer>
      </GridItem>
    </Grid>
  );
}

export default App;
