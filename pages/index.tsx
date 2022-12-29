import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

const Index = (): JSX.Element => {
  return (
    <Flex direction={"column"}>
      <Text>Home</Text>
      <Link href={"./login"}>
        <Text shadow={"md"}>Next</Text>
      </Link>
    </Flex>
  );
};

export default Index;
