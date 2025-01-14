import { AspectRatio, Box, IconButton, Skeleton } from "@chakra-ui/react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

interface YoutubeEmbedProps {
  videoId: string;
  onDelete: () => void; // Callback to trigger deletion
}

const YoutubeEmbed = ({ videoId, onDelete }: YoutubeEmbedProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaded = () => {
    setIsLoading(false); // Set loading to false when the iframe has loaded
  };

  return (
    <Box position="relative" borderRadius="2xl" overflow="hidden">
      <IconButton
        aria-label="Delete video"
        icon={<FaTrash />}
        colorScheme="black"
        position="absolute"
        top="10px"
        right="10px"
        zIndex={2} // Ensure button appears on top of the iframe
        onClick={onDelete} // Trigger delete function on click
      />
      <AspectRatio maxW="560px" ratio={16 / 9} data-testid="embed">
        {isLoading ? (
          <Skeleton>
            <iframe
              title="YouTube video player"
              src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&fs=0&color=white&disablekb=1`}
              onLoad={handleLoaded} // This triggers loading state change
            />
          </Skeleton>
        ) : (
          <iframe
            title="YouTube video player"
            src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&fs=0&color=white&disablekb=1`}
          />
        )}
      </AspectRatio>
    </Box>
  );
};

export default YoutubeEmbed;
