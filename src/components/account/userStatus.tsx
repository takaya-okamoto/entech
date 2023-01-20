import { Flex, Text } from "@chakra-ui/react";
import { useColorAssets } from "../../hooks/view/useColorAssets";

type Props = {
  num: number;
  text: string;
  onClick: VoidFunction;
};

export const UserStatus = (props: Props): JSX.Element => {
  const colorAssets = useColorAssets();
  return (
    <Flex
      direction={"column"}
      justifyContent={"center"}
      color={colorAssets.textColor}
      onClick={props.onClick}
      _hover={{ color: colorAssets.entechSubBlue }}
    >
      <Text align={"center"} fontSize={"20px"} fontWeight={"bold"}>
        {props.num}
      </Text>
      <Text align={"center"} fontSize={"14px"}>
        {props.text}
      </Text>
    </Flex>
  );
};
