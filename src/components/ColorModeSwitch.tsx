import { HStack, Switch, Text, useColorMode } from "@chakra-ui/react";
import { FaMoon } from "react-icons/fa";

export const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <HStack>
      <Switch
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
        colorScheme="red"
        size="lg"
      />
      <Text whiteSpace="nowrap">
        <FaMoon />
      </Text>
    </HStack>
  );
};
