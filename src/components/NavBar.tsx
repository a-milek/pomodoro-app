import { HStack, Image } from "@chakra-ui/react";

import { ColorModeSwitch } from "./ColorModeSwitch";
import pomidoro from "../assets/pomidoro.png";
import { IoMdSettings } from "react-icons/io";

interface Props {
  onClick: () => void;
}

const NavBar = ({ onClick }: Props) => {
  return (
    <>
      <HStack justifyContent="space-between">
        <Image src={pomidoro} boxSize="60px" />

        <HStack spacing="4">
          <IoMdSettings fontSize="30px" onClick={() => onClick()} />

          <ColorModeSwitch />
        </HStack>
      </HStack>
    </>
  );
};

export default NavBar;
