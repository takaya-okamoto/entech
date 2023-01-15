import { Avatar, Box, Image as ChakraImage } from "@chakra-ui/react";

type Props = {
  imageLink: string;
  onClick: VoidFunction;
  isPost?: boolean;
};

export const ImageInputArea = ({
  imageLink,
  onClick,
  isPost,
}: Props): JSX.Element => {
  return (
    <Box
      onClick={onClick}
      minW={isPost ? 300 : 150}
      maxW={isPost ? 300 : 150}
      minH={150}
      maxH={150}
    >
      <Box>
        {isPost ? (
          <ChakraImage
            src={imageLink.length > 1 ? imageLink : "/svg/noImage.svg"}
            overflow={"hidden"}
            w={imageLink.length > 1 ? 300 : 100}
            h={150}
            ml={imageLink.length > 1 ? "none" : "6rem"}
            borderRadius={"10px"}
          />
        ) : (
          <Avatar src={imageLink} width={150} height={150} />
        )}
      </Box>
    </Box>
  );
};
