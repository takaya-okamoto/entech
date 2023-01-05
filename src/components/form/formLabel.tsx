import { Text, TextProps } from "@chakra-ui/react";

type Props = {
  label: string;
  textProps?: TextProps;
};

export const FormLabel = (props: Props): JSX.Element => {
  return (
    <Text {...props.textProps} fontWeight={"bold"} color={"blackAlpha.700"}>
      {props.label}
    </Text>
  );
};
