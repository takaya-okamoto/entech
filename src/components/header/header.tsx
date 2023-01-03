import { Flex, Text } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { headerState, timeLineModeState } from "../../stores/recoil";

export const Header = (): JSX.Element => {
  const headerMode = useRecoilValue(headerState);
  const timeLineMode = useRecoilValue(timeLineModeState);
  return (
    <Flex
      h={"6vh"}
      bgColor={timeLineMode === "e" ? "#17949D" : "white"}
      pt={".6rem"}
      pl={"10.5rem"}
    >
      <Flex fontSize={"20px"}>
        <Text color={timeLineMode === "e" ? "#F4E92A" : "#17949D"}>e</Text>
        <Text color={headerMode && timeLineMode === "e" ? "white" : "#F4E92A"}>
          n
        </Text>
        <Text color={timeLineMode === "e" ? "white" : "#17949D"}>tech</Text>
      </Flex>
    </Flex>
  );
};
