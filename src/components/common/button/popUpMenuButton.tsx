import { Box, Flex, Img, Text, useToast, Switch } from "@chakra-ui/react";
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
import { fetchProfile } from "../../../lib/clientSide/firestore/fetch/fetchProfile";
import { OverlayParts } from "../overlayParts";
import { EnModeChangeButton } from "./enModeChangeButton";

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
  const [overlay, setOverlay] = useState<boolean>(false);
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
    setOverlay(true);
  };

  const leaveAddIcon = () => {
    setPositionList([
      { left: 0, top: 0 },
      { left: 0, top: 0 },
      { left: 0, top: 0 },
    ]);
    setIsHover(false);
    setOverlay(false);
  };

  const ColorAssets = useColorAssets();

  return (
    <>
      <OverlayParts overlay={overlay} />
      <Flex position="fixed" bottom="10%" right="5%" zIndex={"2000"}>
        <Box width="70px" height="70px" bg={"none"} onMouseLeave={leaveAddIcon}>
          <Box
            onClick={() => (!isHover ? hoverAddIcon() : leaveAddIcon())}
            top="0px"
            left="0px"
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
          <Box position="absolute" top="0px" left="0px">
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
          <Box position="absolute" top="0px" left="0px">
            <PopUpMenuButtonBase
              position="absolute"
              left={positionList[1].left}
              top={positionList[1].top}
              // onClick={}
            >
              <RiUserSearchLine color={ColorAssets.white} size="2rem" />
            </PopUpMenuButtonBase>
          </Box>
          <Box position="absolute" top="0px" left="0px">
            <PopUpMenuButtonBase
              position="absolute"
              left={positionList[2].left}
              top={positionList[2].top}
              onClick={() => {
                modeChange();
                leaveAddIcon();
              }}
            >
              <EnModeChangeButton timelineMode={timeLineMode} />
            </PopUpMenuButtonBase>
          </Box>
        </Box>
      </Flex>
    </>
  );
};
