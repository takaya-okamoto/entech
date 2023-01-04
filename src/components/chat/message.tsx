import { Avatar, VStack, Flex, Text, Box } from "@chakra-ui/react";

export const Message = (): JSX.Element => {
  return (
    <Flex _hover={{ bgColor: "#f7f7f7" }}>
      <Avatar size={"sm"} />
      <Text wordBreak={"break-all"} px={".5rem"}>
        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
      </Text>
    </Flex>
  );
};
