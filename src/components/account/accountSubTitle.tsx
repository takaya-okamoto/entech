import { Text, TextProps } from "@chakra-ui/react";
import { useColorAssets } from "../../hooks/view/useColorAssets";

type Props = {
  text: string;
  textProps?: TextProps;
};

export const AccountSubTitle = (props: Props): JSX.Element => {
  const colorAssets = useColorAssets();
  return (
    <Text
      {...props.textProps}
      fontSize={"14px"}
      color={colorAssets.textColor}
      fontWeight={"bold"}
    >
      {props.text}
    </Text>
  );
};
