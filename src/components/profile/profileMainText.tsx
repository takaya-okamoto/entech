import { Text, TextProps, Flex, Box } from "@chakra-ui/react";
import { useColorAssets } from "../../hooks/view/useColorAssets";

type Props = {
  text: string;
  isBlack?: boolean;
  textProps?: TextProps;
  isMatching?: boolean;
};

export const ProfileMainText = (props: Props): JSX.Element => {
  const ColorAssets = useColorAssets();
  return (
    <Flex justifyContent={"center"} pt={"8px"}>
      <Text
        {...props.textProps}
        px={"8px"}
        color={props.isBlack ? ColorAssets.textColor : ColorAssets.white}
        fontSize={props.isMatching ? "12px" : "14px"}
        className={"profileText"}
      >
        {props.text}
      </Text>
    </Flex>
  );
};
