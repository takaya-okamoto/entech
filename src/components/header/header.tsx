import { Flex, Text, Link as ChakraLink } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { headerState, timeLineModeState } from "../../stores/recoil";
import Link from "next/link";
import { useColorAssets } from "../../hooks/view/useColorAssets";

export const Header = (): JSX.Element => {
  const headerMode = useRecoilValue(headerState);
  const timeLineMode = useRecoilValue(timeLineModeState);
  const ColorAssets = useColorAssets();
  return (
    <Flex
      h={"7vh"}
      bgColor={timeLineMode === "e" ? ColorAssets.entechMainBlue : "white"}
      pt={".8rem"}
      justifyContent={"center"}
      w={"100%"}
      position={"fixed"}
      zIndex={999}
    >
      <ChakraLink as={Link} href={"/"} _hover={{ textDecoration: "none" }}>
        <Flex fontSize={"20px"}>
          <Text color={timeLineMode === "e" ? "#F4E92A" : "#17949D"}>e</Text>
          <Text
            color={headerMode && timeLineMode === "e" ? "white" : "#F4E92A"}
          >
            n
          </Text>
          <Text color={timeLineMode === "e" ? "white" : "#17949D"}>tech</Text>
        </Flex>
      </ChakraLink>
    </Flex>
  );
};
