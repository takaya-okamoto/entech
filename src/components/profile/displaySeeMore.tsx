import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { useColorAssets } from "../../hooks/view/useColorAssets";

export const DisplaySeeMore = (): JSX.Element => {
  const ColorAssets = useColorAssets();
  return (
    <Flex pos={"relative"} alignItems={"center"} justifyContent={"center"}>
      <Box
        bgColor={ColorAssets.entechSubBlue}
        opacity={0.3}
        h={"15px"}
        w={"60px"}
        rounded={5}
      ></Box>
      <HStack pos={"absolute"}>
        <Text color={ColorAssets.yellow} fontSize={"10px"}>
          {" "}
          {">>"}{" "}
        </Text>
        <Text color={ColorAssets.white} fontSize={"10px"}>
          {" "}
          See more
        </Text>
      </HStack>
    </Flex>
  );
};
