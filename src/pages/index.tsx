import { Box, Flex, Text } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { headerState, selectedFooterState } from "../stores/recoil";
import { useEffect } from "react";

const Index = (): JSX.Element => {
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
export default Index;
