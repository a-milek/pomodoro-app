import { Button, Heading, HStack, Image, Text } from "@chakra-ui/react";

import { ColorModeSwitch } from "./ColorModeSwitch";

interface Props {
  onClick: () => void;
}

const NavBar = ({ onClick }: Props) => {
  return (
    <>
      <HStack justifyContent="space-between">
        <Image src="src/assets/pomidoro.png" boxSize="60px" />

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
