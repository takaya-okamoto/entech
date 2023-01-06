import { Flex } from "@chakra-ui/react";
import ColorAssets from "constants/useColorAssets";
import { FC, MouseEventHandler, ReactNode } from "react";

type Props = {
  children: ReactNode;
  position: "relative" | "absolute";
  left?: number;
  top?: number;
  zIndex?: number;
  rotate?: string;
  onClick?: MouseEventHandler;
};

const PopUpMenuButtonBase: FC<Props> = (props) => {
  const { children, position, left, top, zIndex, rotate, onClick } = props;

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      position={position}
      left={left}
      top={top}
      w="60px"
      h="60px"
      borderRadius="50%"
      bg={ColorAssets.entechSubBlue}
      cursor="pointer"
      transition="0.4s"
      zIndex={zIndex}
      transform={rotate}
      _hover={{ opacity: 0.8 }}
      onClick={onClick}
    >
      {children}
    </Flex>
  );
};

export default PopUpMenuButtonBase;
