import { Button, HStack, Image } from "@chakra-ui/react";

import { ColorModeSwitch } from "./ColorModeSwitch";

interface Props {
  onClick: () => void;
}

const NavBar = ({ onClick }: Props) => {
  return (
    <>
      <HStack>
        <Image src="src/assets/pomidoro.png" boxSize="60px" />

        <HStack spacing="4">
          <Button onClick={() => onClick()}>Settings</Button>
          <ColorModeSwitch />
        </HStack>
      </HStack>
    </>
  );
};

export default NavBar;
