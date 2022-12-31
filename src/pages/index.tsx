import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

const Index = (): JSX.Element => {
  return (
    <Flex direction={"column"}>
      <Text>Top page</Text>
      <Link href={"./manual"}>
        <Text shadow={"md"}>Next</Text>
      </Link>
      <Link href={"./login"}>
        <Text shadow={"md"}>Login</Text>
      </Link>
    </Flex>
  );
};

export default Index;
