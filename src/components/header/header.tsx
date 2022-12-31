import { Flex, Text } from "@chakra-ui/react";

export const Header = (): JSX.Element => {
  return (
    <Flex h={"6vh"} bgColor={"teal.50"}>
      <Text>header</Text>
      <Text>Page</Text>
    </Flex>
  );
};
