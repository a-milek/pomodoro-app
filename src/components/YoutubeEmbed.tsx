import { AspectRatio, Box } from "@chakra-ui/react";

const YoutubeEmbed = ({ videoId }: { videoId: string }) => {
  return (
    <Box borderRadius="2xl" overflow="hidden">
      <AspectRatio maxW="560px" ratio={16 / 9}>
        <iframe
          title="YouTube video player"
          src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&fs=0&color=white&disablekb=1" `}
        ></iframe>
      </AspectRatio>
    </Box>
  );
};

export default YoutubeEmbed;
