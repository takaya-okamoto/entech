import { Flex } from "@chakra-ui/react";
import { useColorAssets } from "hooks/view/useColorAssets";
import { FC, MouseEventHandler, ReactNode } from "react";

type Props = {
  children: ReactNode;
  position: "relative" | "absolute";
  left?: number;
  top?: number;
  zIndex?: number;
  rotate?: string;
  onClick?: MouseEventHandler;
  isHover?: boolean;
};

export const PopUpMenuButtonBase: FC<Props> = (props) => {
  const { children, position, left, top, zIndex, rotate, onClick } = props;

  const ColorAssets = useColorAssets();

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
      opacity={props.isHover ? 0.8 : 1.0}
      onClick={props.onClick}
    >
      {children}
    </Flex>
  );
};
export default PopUpMenuButtonBase;
