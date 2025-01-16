import { HStack, Image, useDisclosure } from "@chakra-ui/react";
import { ColorModeSwitch } from "./ColorModeSwitch";
import { IoIosBook, IoMdSettings } from "react-icons/io";
import pomidoro from "../assets/pomidoro.png";
import NotesDrawer from "./NotesDrawer";
import { useEffect, useState } from "react";

interface Props {
  onClick: () => void;
}

const NavBar = ({ onClick }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [note, setNote] = useState("");

  useEffect(() => {
    const savedNote = localStorage.getItem("note"); //Pobranie wartości notatki z LocalStorage
    if (savedNote) setNote(savedNote);
  }, []);

  const handleSave = () => {
    localStorage.setItem("note", note); // Zapisanie notatki do LocalStorage
    console.log("Note saved:", note); //debug
  };

  const handleDiscard = () => {
    localStorage.removeItem("note"); // Usunięcie notatki z LocalStorage
    setNote(""); //Ustawienie pustego pola tekstowego
    console.log("Note discarded"); //debug
  };

  return (
    <>
      <HStack justifyContent="space-between">
        <Image src={pomidoro} boxSize="50px" alt="Pomidoro Logo" />

        <HStack spacing="4">
          <IoIosBook
            fontSize="30px"
            style={{ cursor: "pointer" }}
            onClick={onOpen}
            data-testid="note-button"
          />

          <IoMdSettings
            fontSize="30px"
            onClick={onClick}
            style={{ cursor: "pointer" }}
            data-testid="settings-button"
          />

          <ColorModeSwitch />
        </HStack>
      </HStack>

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
