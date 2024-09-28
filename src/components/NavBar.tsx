import { Button, HStack, Image } from "@chakra-ui/react";

import { ColorModeSwitch } from "./ColorModeSwitch";
import pomidoro from "../assets/pomidoro.png";

interface Props {
  onClick: () => void;
}

const NavBar = ({ onClick }: Props) => {
  return (
    <>
      <HStack justifyContent="space-between">
        <Image src={pomidoro} boxSize="60px" />

        <HStack spacing="4">
          <Button colorScheme="red" onClick={() => onClick()}>
            Settings
          </Button>
          <ColorModeSwitch />
        </HStack>
      </HStack>
    </>
  );
};

export default NavBar;
