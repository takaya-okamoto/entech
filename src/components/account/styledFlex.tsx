import { Flex, FlexProps } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  borderColor: string;
  children: ReactNode;
  flexProps?: FlexProps;
};

export const StyledFlex = (props: Props): JSX.Element => {
  return (
    <Flex
      {...props.flexProps}
      borderColor={props.borderColor}
      borderWidth={"1px"}
      borderRadius={"5px"}
      py={".5rem"}
      px={".8rem"}
      direction={"column"}
    >
      {props.children}
    </Flex>
  );
};
