import { Box, Image } from "@chakra-ui/react";

type Props = {
  imageLink: string;
  onClick: VoidFunction;
};

export const ImageInputArea = ({ imageLink, onClick }: Props): JSX.Element => {
  const hasImage = imageLink !== "../svg/noImage.svg";
  return (
    <Box onClick={onClick} maxW={150} maxH={150} minH={150} minW={150}>
      <Box mt={hasImage ? "none" : "3.4rem"} ml={hasImage ? "none" : "3.4rem"}>
        <Image
          borderRadius={hasImage ? "full" : "none"}
          src={imageLink}
          alt={"image"}
          width={hasImage ? 150 : 10}
          height={hasImage ? 150 : 10}
        />
      </Box>
    </Box>
  );
};
