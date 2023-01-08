<<<<<<< HEAD
import { Box, Flex, Img, Text } from "@chakra-ui/react";
import { useState } from "react";
import PopUpMenuButtonBase from "./popUpMenuButtonBase";
import { AiOutlinePlus } from "react-icons/ai";
import { RiFileEditLine, RiUserSearchLine } from "react-icons/ri";
import { useColorAssets } from "../../../hooks/view/useColorAssets";
import { useRecoilState } from "recoil";
import { timeLineModeState } from "stores/recoil";

type Props = {};

export const PopUpMenuButton = (props: Props): JSX.Element => {
  const [positionList, setPositionList] = useState([
    { left: 0, top: 0 },
    { left: 0, top: 0 },
    { left: 0, top: 0 },
  ]);
  const [isHover, setIsHover] = useState(false);
  const [timeLineMode, setTimeLineMode] = useRecoilState(timeLineModeState);
  //NからE
  const changeE = () => {};
  //EからN
  const changeN = () => {};

  const modeChange = () => {
    if (timeLineMode === "e") {
      changeE();
    } else {
      changeN();
    }
  };
  const hoverAddIcon = () => {
    setPositionList([
      { left: -20, top: 2 },
      { left: -14, top: -16 },
      { left: 4, top: -20 },
    ]);
    setIsHover(true);
  };

  const leaveAddIcon = () => {
    setPositionList([
      { left: 0, top: 0 },
      { left: 0, top: 0 },
      { left: 0, top: 0 },
    ]);
    setIsHover(false);
  };

  const ColorAssets = useColorAssets();

  return (
    <Flex position="fixed" bottom="10%" right="3%">
      <Box
        width="140px"
        height="140px"
        bg={ColorAssets.white}
        onMouseLeave={leaveAddIcon}
      >
        <Box
          onMouseOver={hoverAddIcon}
          top="80px"
          left="80px"
          position="absolute"
        >
          <PopUpMenuButtonBase
            position="absolute"
            zIndex={1000}
            rotate={isHover ? "rotateZ(45deg)" : ""}
          >
            <AiOutlinePlus color={ColorAssets.white} size="1.5rem" />
          </PopUpMenuButtonBase>
        </Box>
        <Box position="absolute" top="80px" left="80px">
          <PopUpMenuButtonBase
            position="absolute"
            left={positionList[0].left}
            top={positionList[0].top}
          >
            <RiFileEditLine color={ColorAssets.white} size="2rem" />
          </PopUpMenuButtonBase>
        </Box>
        <Box position="absolute" top="80px" left="80px">
          <PopUpMenuButtonBase
            position="absolute"
            left={positionList[1].left}
            top={positionList[1].top}
            // onClick={}
          >
            <RiUserSearchLine color={ColorAssets.white} size="2rem" />
          </PopUpMenuButtonBase>
        </Box>
        <Box position="absolute" top="80px" left="80px">
          <PopUpMenuButtonBase
            position="absolute"
            left={positionList[2].left}
            top={positionList[2].top}
            onClick={modeChange}
          >
            <Text fontSize={"24px"} color={ColorAssets.yellow}>
              E
            </Text>
          </PopUpMenuButtonBase>
        </Box>
      </Box>
    </Flex>
  );
};
=======
// import { Flex } from "@chakra-ui/react";
// import ColorAssets from "hooks/view/useColorAssets";
// import { FC, MouseEventHandler, ReactNode } from "react";

// type Props = {
//   children: ReactNode;
//   position: "relative" | "absolute";
//   left?: number;
//   top?: number;
//   zIndex?: number;
//   rotate?: string;
//   onClick?: MouseEventHandler;
// };

// const PopUpMenuButtonBase: FC<Props> = (props) => {
//   const { children, position, left, top, zIndex, rotate, onClick } = props;

//   return (
//     <Flex
//       justifyContent="center"
//       alignItems="center"
//       position={position}
//       left={left}
//       top={top}
//       w="60px"
//       h="60px"
//       borderRadius="50%"
//       bg={ColorAssets.buttonColor.khaki}
//       cursor="pointer"
//       transition="0.4s"
//       zIndex={zIndex}
//       transform={rotate}
//       _hover={{ opacity: 0.8 }}
//       onClick={onClick}
//     >
//       {children}
//     </Flex>
//   );
// };

// export default PopUpMenuButtonBase;
>>>>>>> main
