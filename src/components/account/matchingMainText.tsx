import { Text, TextProps } from "@chakra-ui/react";
import { useColorAssets } from "../../hooks/view/useColorAssets";

type Props = {
  text: string;
  textProps?: TextProps;
  isBold?: boolean;
};

export const MatchingMainText = (props: Props): JSX.Element => {
  const colorAssets = useColorAssets();
  return (
    <Text
      {...props.textProps}
      color={"#000000"}
      fontSize={"16px"}
      fontWeight={props.isBold ? "bold" : "normal"}
    >
      {props.text}
    </Text>
  );
};
