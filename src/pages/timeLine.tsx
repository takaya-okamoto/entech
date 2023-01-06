import { Text, Box } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { headerState, selectedFooterState } from "../stores/recoil";
import { useEffect } from "react";
import { PopUpMenuButton } from "components/common/button/popUpMenuButton";

const TimeLine = (): JSX.Element => {
  const [selectedFooter, setSelectedFooter] =
    useRecoilState<number>(selectedFooterState);
  const [headerMode, setHeaderMode] = useRecoilState(headerState);
  useEffect(() => {
    setSelectedFooter(0);
    setHeaderMode(true);
  });

  return (
    <>
      <Text>Time Line</Text>
      <Box position="fixed" right="32px" bottom="32px"></Box>
    </>
  );
};
export default TimeLine;
