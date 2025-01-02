import {
  Heading,
  Center,
  VStack,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { LuPlusSquare } from "react-icons/lu";

interface Props {
  addId: (id: string) => void;
}

const AddNewEmbed = ({ addId }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  const idFromLink = (link: string) => {
    const urlPattern =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = link.match(urlPattern);
    return match ? match[1] : null;
  };

  const handleAddEmbed = () => {
    const validationError = validateLink(link);
    if (validationError) {
      setError(validationError);
    } else {
      const id = idFromLink(link);
      if (id) {
        addId(id);
        console.log("Embed added with ID:", id);
        setError("");
        onClose();
        setLink;
      } else {
        setError("Invalid YouTube link");
      }
    }
  };

  const validateLink = (value: string) => {
    if (!value) {
      return "Link is required";
    } else if (!isValidYoutubeLink(value)) {
      return "Invalid YouTube link";
    }
    return "";
  };
  const isValidYoutubeLink = (url: string) => {
    const regex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    return regex.test(url);
  };

  return (
    <>
      <Center
        borderRadius="2xl"
        overflow="hidden"
        onClick={onOpen}
        cursor="pointer"
      >
        <VStack>
          <LuPlusSquare size="30%" />
          <Heading size="l">Add your own!</Heading>
        </VStack>
      </Center>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Add New Embed
            </AlertDialogHeader>

            <AlertDialogBody>
              <FormControl isInvalid={!!error}>
                <FormLabel>Youtube link:</FormLabel>
                <Input
                  onChange={(e) => setLink(e.target.value)} // Handle input changes
                />
                {error && <FormErrorMessage>{error}</FormErrorMessage>}{" "}
                {/* Display error if present */}
              </FormControl>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} colorScheme="red">
                Cancel
              </Button>
              <Button colorScheme="green" onClick={handleAddEmbed} ml={3}>
                Add Embed
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default AddNewEmbed;
