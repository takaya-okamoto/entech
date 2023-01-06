import { Box, Flex } from "@chakra-ui/react";
import { FC, useState } from "react";
import PopUpMenuButtonBase from "./popUpMenuButtonBase";
import { AiOutlinePlus } from "react-icons/ai";
import { RiFileEditLine, RiUserSearchLine } from "react-icons/ri";
import { BiListPlus } from "react-icons/bi";
import ColorAssets from "../../../constants/useColorAssets";

type Props = {};

export const PopUpMenuButton = (props: Props): JSX.Element => {
  const [positionList, setPositionList] = useState([
    { left: 0, top: 0 },
    { left: 0, top: 0 },
    { left: 0, top: 0 },
  ]);
  const [isHover, setIsHover] = useState(false);

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

  return (
    <>
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
          position="relative"
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
        {/* <Box position="absolute" top="80px" left="80px">
          <PopUpMenuButtonBase
            position="absolute"
            left={positionList[2].left}
            top={positionList[2].top}
            onClick={() => openMenuContents("Create")}
          >
            <BiListPlus color={ColorAssets.white} size="2rem" />
          </PopUpMenuButtonBase>
        </Box> */}
      </Box>
    </>
  );
};
