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
import videoIds from "../configuration/videoIds.json"; // Import the JSON file

const Ambients = () => {
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
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={10}>
            {videoIds.map((id: string) => (
              <YoutubeEmbed key={id} videoId={id} />
            ))}
          </SimpleGrid>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default Ambients;
