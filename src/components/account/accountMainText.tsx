import { Text, TextProps } from "@chakra-ui/react";
import { useColorAssets } from "../../hooks/view/useColorAssets";

type Props = {
  text: string;
  textProps?: TextProps;
  isWhite?: boolean;
  isMatching?: boolean;
};

export const AccountMainText = (props: Props): JSX.Element => {
  const colorAssets = useColorAssets();
  return (
    <Text
      {...props.textProps}
      color={props.isWhite ? colorAssets.white : colorAssets.textColor}
      fontSize={props.isMatching ? "12px" : "14px"}
    >
      {props.text}
    </Text>
  );
};
