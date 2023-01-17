import { Link as ChakraLink, Flex, Text } from "@chakra-ui/react";
import { useColorAssets } from "../../hooks/view/useColorAssets";
import Link from "next/link";

type Props = {
  num: number;
  text: string;
  link: string;
};

export const UserStatus = (props: Props): JSX.Element => {
  const colorAssets = useColorAssets();
  return (
    <Flex
      direction={"column"}
      justifyContent={"center"}
      color={colorAssets.textColor}
    >
      <ChakraLink
        as={Link}
        href={props.link}
        _hover={{ textDecoration: "none", color: colorAssets.entechSubBlue }}
      >
        <Text align={"center"} fontSize={"20px"} fontWeight={"bold"}>
          {props.num}
        </Text>
        <Text align={"center"} fontSize={"14px"}>
          {props.text}
        </Text>
      </ChakraLink>
    </Flex>
  );
};
