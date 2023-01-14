import { Flex, Text, Link as ChakraLink } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { timeLineModeState } from "../../stores/recoil";
import Link from "next/link";
import { useColorAssets } from "../../hooks/view/useColorAssets";

export const Header = (): JSX.Element => {
  const timeLineMode = useRecoilValue(timeLineModeState);
  const ColorAssets = useColorAssets();
  return (
    <Flex
      h={"7vh"}
      bgColor={ColorAssets.entechMainBlue}
      pt={".6rem"}
      justifyContent={"center"}
      w={"100%"}
      position={"fixed"}
      zIndex={999}
    >
      <ChakraLink as={Link} href={"/"} _hover={{ textDecoration: "none" }}>
        <Flex fontSize={"28px"}>
          <Text
            color={
              ~timeLineMode.indexOf("e")
                ? ColorAssets.yellow
                : ColorAssets.white
            }
          >
            e
          </Text>
          <Text
            color={
              ~timeLineMode.indexOf("n")
                ? ColorAssets.yellow
                : ColorAssets.white
            }
          >
            n
          </Text>
          <Text color={ColorAssets.white}>tech</Text>
        </Flex>
      </ChakraLink>
    </Flex>
  );
};
