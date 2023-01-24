import { Text, TextProps } from "@chakra-ui/react";
import { useColorAssets } from "../../hooks/view/useColorAssets";

type Props = {
  text: string;
  textProps?: TextProps;
  isWhite?: boolean;
};

export const AccountMainText = (props: Props): JSX.Element => {
  const colorAssets = useColorAssets();
  return (
    <Text
      {...props.textProps}
      color={props.isWhite ? colorAssets.white : colorAssets.textColor}
      fontSize={"14px"}
    >
      {props.text}
    </Text>
  );
};
