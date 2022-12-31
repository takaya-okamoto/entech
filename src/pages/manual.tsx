import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

const Manual = (): JSX.Element => {
  return (
    <Flex direction={"column"}>
      <Text>Manual page</Text>
      <Link href={"./login"}>
        <Text shadow={"md"}>Next</Text>
      </Link>
    </Flex>
  );
};
export default Manual;
