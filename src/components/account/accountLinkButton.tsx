import Link from "next/link";
import { Link as ChakraLInk } from "@chakra-ui/layout";
import { Box, Flex, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { useSetRecoilState } from "recoil";
import { viewTypeState } from "../../stores/recoil";

type Props = {
  link: string;
  icon: IconType;
  text: string;
};

export const AccountLinkButton = (props: Props): JSX.Element => {
  const setViewType = useSetRecoilState(viewTypeState);
  return (
    <ChakraLInk
      as={Link}
      href={props.link}
      onClick={() => {
        setViewType(undefined);
      }}
      _hover={{ textDecoration: "none" }}
    >
      <Flex
        gap={3}
        color={"blackAlpha.700"}
        borderWidth={"1px"}
        borderX={"none"}
        borderTop={"none"}
        transition={".3s"}
        _hover={{ color: "#86C8D0" }}
      >
        <Box fontSize={"35px"}>
          <props.icon />
        </Box>
        <Text fontSize={"20px"} fontWeight={"semibold"} pt={".2rem"}>
          {props.text}
        </Text>
      </Flex>
    </ChakraLInk>
  );
};
