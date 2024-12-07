import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";
import { FaMoon } from "react-icons/fa";

export const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <HStack>
      <Switch
        colorScheme="red"
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
        size="lg"
      />
      <Text whiteSpace="nowrap">
        <FaMoon fontSize="20px" />
      </Text>
    </HStack>
  );
};
