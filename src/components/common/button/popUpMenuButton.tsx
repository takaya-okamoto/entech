import { Box, Flex, Img, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { PopUpMenuButtonBase } from "./popUpMenuButtonBase";
import { AiOutlinePlus } from "react-icons/ai";
import { RiFileEditLine, RiUserSearchLine } from "react-icons/ri";
import { useColorAssets } from "../../../hooks/view/useColorAssets";
import { useRecoilState } from "recoil";
import { timeLineModeState } from "stores/recoil";
import { useRouter } from "next/router";
import { useMyAccount } from "../../../hooks/logic/useMyAccount";
import { useFetchFirestore } from "../../../hooks/logic/useFetchFirestore";
import { fetchProfile } from "../../../lib/clientSide/firestore/fetchProfile";

type Props = {};

export const PopUpMenuButton = (props: Props): JSX.Element => {
  const router = useRouter();
  const toast = useToast();
  const { user } = useMyAccount();
  const readerData = useFetchFirestore(fetchProfile, user?.uid).data;
  const isWriteProfile = !!readerData;
  const [positionList, setPositionList] = useState([
    { left: 0, top: 0 },
    { left: 0, top: 0 },
    { left: 0, top: 0 },
  ]);
  const [isHover, setIsHover] = useState(false);
  const [timeLineMode, setTimeLineMode] = useRecoilState(timeLineModeState);
  //NからE
  const changeE = () => {
    setTimeLineMode("e");
  };
  //EからN
  const changeN = () => {
    setTimeLineMode("n");
  };

  const modeChange = () => {
    if (timeLineMode === "e") {
      changeN();
    } else {
      changeE();
      void router.push("/");
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
    <Flex position="fixed" bottom="10%" right="5%">
      <Box width="140px" height="140px" bg={"none"} onMouseLeave={leaveAddIcon}>
        <Box
          onClick={() => (!isHover ? hoverAddIcon() : leaveAddIcon())}
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
            onClick={async () => {
              const id = (
                "0000000" + Math.floor(Math.random() * 10000000)
              ).slice(-7);
              if (!isWriteProfile)
                return toast({
                  title: `プロフィールを登録してから投稿作成できるよ。`,
                  status: "info",
                  position: "top",
                  isClosable: true,
                });
              void (await router.push(`/post/create/${id}`));
            }}
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
            onClick={() => {
              modeChange();
              leaveAddIcon();
            }}
          >
            <Text fontSize={"24px"} color={ColorAssets.yellow}>
              E⇆N
            </Text>
          </PopUpMenuButtonBase>
        </Box>
      </Box>
    </Flex>
  );
};
