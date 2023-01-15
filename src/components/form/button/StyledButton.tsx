import { Button } from "@chakra-ui/react";
import { FormEventHandler } from "react";

type Props = {
  onClick: FormEventHandler;
  text: string;
};

export const StyledButton = (props: Props): JSX.Element => {
  return (
    <Button
      onClick={props.onClick}
      color={"white"}
      transition={".3s"}
      bgColor={"#86C8D0"}
      w={"100px"}
      _hover={{ bgColor: "#b4ec77", color: "white" }}
    >
      {props.text}
    </Button>
  );
};
