import { HStack, Text } from "@chakra-ui/react";
import { useColorAssets } from "../../hooks/view/useColorAssets";

type Props = {
  fontSize: string;
  text: string;
};

export const ProfileLayout = (props: Props): JSX.Element => {
  const ColorAssets = useColorAssets();
  return (
    <HStack pl={"12px"} pt={"8px"}>
      <Text color={ColorAssets.yellow} fontSize={props.fontSize}>
        -
      </Text>
      <Text color={ColorAssets.white} fontSize={props.fontSize}>
        {" "}
        {props.text}
      </Text>
      <Text color={ColorAssets.yellow} fontSize={props.fontSize}>
        -
      </Text>
    </HStack>
  );
};
