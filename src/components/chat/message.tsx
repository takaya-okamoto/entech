import { Avatar, VStack, Flex, Text, Box } from "@chakra-ui/react";
import ColorAssets from "constants/useColorAssets";

export const Message = (): JSX.Element => {
  return (
    <Flex _hover={{ bgColor: ColorAssets.massageBg }}>
      <Avatar size={"sm"} />
      <Text wordBreak={"break-all"} px={".5rem"}>
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      </Text>
    </Flex>
  );
};
