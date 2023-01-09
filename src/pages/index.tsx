import { Box, Flex, Text } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  selectedFooterState,
  timeLineModeState,
  userTypeState,
} from "../stores/recoil";
import { useEffect } from "react";

const Index = (): JSX.Element => {
  const [selectedFooter, setSelectedFooter] =
    useRecoilState<number>(selectedFooterState);
  const [timeLineMode, setTimeLineMode] =
    useRecoilState<string>(timeLineModeState);
  const userType = useRecoilValue<string>(userTypeState);
  useEffect(() => {
    setSelectedFooter(0);
  });
  userType === "e" ? setTimeLineMode("n") : setTimeLineMode("e");
  console.log(timeLineMode);
  return (
    <Box>
      <Text>Time Line</Text>
      <Box position="fixed" right="32px" bottom="32px"></Box>
    </Box>
  );
};
export default Index;
