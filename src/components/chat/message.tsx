import { Avatar, VStack, Flex, Text, Box } from "@chakra-ui/react";
import { useColorAssets } from "hooks/view/useColorAssets";

export const Message = (): JSX.Element => {
  const ColorAssets = useColorAssets();
  return (
    <Flex _hover={{ bgColor: ColorAssets.massageBg }}>
      <Avatar size={"sm"} />
      <Text wordBreak={"break-all"} px={".5rem"}>
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      </Text>
    </Flex>
  );
};
