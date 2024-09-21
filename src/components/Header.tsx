import { Button, HStack, Image } from "@chakra-ui/react";

import { ColorModeSwitch } from "./ColorModeSwitch";

const Header = () => {
  return (
    <>
      <HStack w="100%">
        <Image src="src/assets/pomidoro.png" boxSize="60px" />

        <HStack spacing="4">
          <Button>Settings</Button>
          <ColorModeSwitch />
        </HStack>
      </HStack>
    </>
  );
};

export default Header;
