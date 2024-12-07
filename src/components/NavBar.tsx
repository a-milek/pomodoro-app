import { HStack, Image, useDisclosure, Button } from "@chakra-ui/react";
import { ColorModeSwitch } from "./ColorModeSwitch";
import { IoIosBook, IoIosCreate, IoMdSettings } from "react-icons/io";
import pomidoro from "../assets/pomidoro.png";
import NotesDrawer from "./NotesDrawer";
import { useEffect, useState } from "react";

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [note, setNote] = useState("");

  useEffect(() => {
    const savedNote = localStorage.getItem("note");
    if (savedNote) setNote(savedNote);
  }, []);

  const handleSave = () => {
    localStorage.setItem("note", note); // Save the note to localStorage
    console.log("Note saved:", note);
  };

  const handleDiscard = () => {
    localStorage.removeItem("note"); // Remove the note from localStorage
    setNote(""); // Clear the note state
    console.log("Note discarded");
  };

  return (
    <>
      <HStack justifyContent="space-between" p={4}>
        <Image src={pomidoro} boxSize="50px" alt="Pomidoro Logo" />

        <HStack spacing="4">
          {/* Button to Open Notes Drawer */}

          <IoIosBook
            fontSize="30px"
            style={{ cursor: "pointer" }}
            onClick={onOpen}
          />

          {/* Settings Icon */}
          <IoMdSettings fontSize="30px" style={{ cursor: "pointer" }} />

          {/* Color Mode Switch */}
          <ColorModeSwitch />
        </HStack>
      </HStack>

      {/* Notes Drawer */}
      <NotesDrawer
        isOpen={isOpen}
        onClose={onClose}
        note={note}
        setNote={setNote}
        onSave={handleSave}
        onDiscard={handleDiscard}
      />
    </>
  );
};

export default NavBar;
