import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { IoIosSave, IoMdTrash } from "react-icons/io";

interface NotesDrawerProps {
  isOpen: boolean; // Determines if the drawer is open
  onClose: () => void; // Function to close the drawer
  note: string; // Current note text
  setNote: (value: string) => void; // Function to update the note state
  onSave: () => void; // Function to handle saving the note
  onDiscard: () => void; // Function to handle discarding the note
}

const NotesDrawer: React.FC<NotesDrawerProps> = ({
  isOpen,
  onClose,
  note,
  setNote,
  onSave,
  onDiscard,
}) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Notes</DrawerHeader>

        <DrawerBody>
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write your notes here..."
            size="md"
            height="100%"
            data-testid="note-input"
          />
        </DrawerBody>

        <DrawerFooter>
          <Button
            colorScheme="red"
            mr={3}
            onClick={() => {
              onDiscard();
              onClose();
            }}
          >
            <IoMdTrash fontSize="25px" data-testid="delete-note-btn" />
          </Button>
          <Button
            colorScheme="green"
            onClick={() => {
              onSave();
              onClose();
            }}
          >
            <IoIosSave fontSize="25px" data-testid="save-note-btn" />
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default NotesDrawer;
