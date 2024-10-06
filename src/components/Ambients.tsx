import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import YoutubeEmbed from "./YoutubeEmbed";
import videoIds from "../configuration/videoIds.json"; // Import the JSON file

const Ambients = () => {
  return (
    <Box marginY={5} textAlign="left">
      <Heading size="md" margin={3}>
        {" "}
        Ambients to help you focus
      </Heading>
      <SimpleGrid columns={4} spacing={10}>
        {videoIds.map((id: string) => (
          <YoutubeEmbed key={id} videoId={id} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Ambients;
