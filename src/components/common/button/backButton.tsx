import { Flex, FlexProps, Text } from "@chakra-ui/react";
import { AiOutlineLeft } from "react-icons/ai";
import { useColorAssets } from "../../../hooks/view/useColorAssets";

type Props = {
  onClick: VoidFunction;
  needText: boolean;
  flexProps?: FlexProps;
};

export const BackButton = (props: Props): JSX.Element => {
  const colorAssets = useColorAssets();
  return (
    <Flex
      position={"relative"}
      color={colorAssets.textColor}
      onClick={props.onClick}
      {...props.flexProps}
    >
      <AiOutlineLeft />
      {props.needText && (
        <Text position={"absolute"} left={"20px"} top={"-3px"}>
          BACK
        </Text>
      )}
    </Flex>
  );
};
