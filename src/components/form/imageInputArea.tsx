import { Avatar, Box, Image } from "@chakra-ui/react";

type Props = {
  imageLink: string;
  onClick: VoidFunction;
};

export const ImageInputArea = ({ imageLink, onClick }: Props): JSX.Element => {
  return (
    <Box onClick={onClick} maxW={150} maxH={150} minH={150} minW={150}>
      <Box>
        <Avatar src={imageLink} width={150} height={150} />
      </Box>
    </Box>
  );
};
