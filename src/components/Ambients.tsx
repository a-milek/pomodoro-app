import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import YoutubeEmbed from "./YoutubeEmbed";
import AddNewEmbed from "./AddNewEmbed";

interface AmbientsProps {
  ids: string[];
  addId: (id: string) => void;
  deleteId: (id: string) => void;
}

const Ambients = ({ ids, addId, deleteId }: AmbientsProps) => {
  return (
    <Accordion allowToggle>
      <AccordionItem>
        <AccordionButton>
          <Heading size="md" margin={3} flex="1" textAlign="left">
            Ambients to help you focus
          </Heading>
          <AccordionIcon marginLeft={3} />
        </AccordionButton>

        <AccordionPanel>
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing={5}>
            {ids.map((id: string) => (
              <YoutubeEmbed
                onDelete={() => deleteId(id)}
                key={id}
                videoId={id}
              />
            ))}
            <AddNewEmbed addId={addId}></AddNewEmbed>
          </SimpleGrid>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default Ambients;
