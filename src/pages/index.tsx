import { Flex } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  selectedFooterState,
  timeLineModeState,
  userTypeState,
} from "../stores/recoil";
import { useEffect } from "react";
import { EModeView } from "../components/timeLine/eModeView";
import { NModeView } from "../components/timeLine/nModeView";

const Index = (): JSX.Element => {
  const [selectedFooter, setSelectedFooter] =
    useRecoilState<number>(selectedFooterState);
  const [timeLineMode, setTimeLineMode] =
    useRecoilState<string>(timeLineModeState);
  const userType = useRecoilValue<string>(userTypeState);
  useEffect(() => {
    setSelectedFooter(0);
    if (userType === "e" && timeLineMode !== "e") {
      setTimeLineMode("n");
    } else {
      setTimeLineMode("e");
    }
  });

  return <Flex>{timeLineMode === "e" ? <EModeView /> : <NModeView />}</Flex>;
};
export default Index;
