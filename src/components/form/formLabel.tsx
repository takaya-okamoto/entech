import { Text } from "@chakra-ui/react";

type Props = {
  label: string;
};

export const FormLabel = (props: Props): JSX.Element => {
  return (
    <Text fontWeight={"bold"} color={"blackAlpha.700"}>
      {props.label}
    </Text>
  );
};
