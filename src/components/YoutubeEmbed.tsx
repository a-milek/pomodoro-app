import { AspectRatio, Box, Skeleton } from "@chakra-ui/react";
import { useState } from "react";

const YoutubeEmbed = ({ videoId }: { videoId: string }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaded = () => {
    setIsLoading(false); // Set loading to false when the iframe has loaded
  };

  return (
    <Box borderRadius="2xl" overflow="hidden">
      <AspectRatio maxW="560px" ratio={16 / 9}>
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
