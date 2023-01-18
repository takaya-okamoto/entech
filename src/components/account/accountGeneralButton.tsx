import { Box, Flex, Text } from "@chakra-ui/react";
import { useColorAssets } from "../../hooks/view/useColorAssets";

type Props = {
  w: string;
  text: string;
  followButton: boolean;
  onClick?: VoidFunction;
};

export const AccountGeneralButton = (props: Props): JSX.Element => {
  const colorAssets = useColorAssets();
  return (
    <Flex
      w={props.w}
      color={props.followButton ? "white" : colorAssets.textColor}
      bgColor={props.followButton ? colorAssets.entechMainBlue : "white"}
      borderWidth={props.followButton ? "none" : "1px"}
      borderRadius={"5px"}
      justifyContent={"center"}
      onClick={props.onClick}
      _hover={{}}
    >
      <Text fontSize={"14px"}>{props.text}</Text>
    </Flex>
  );
};
