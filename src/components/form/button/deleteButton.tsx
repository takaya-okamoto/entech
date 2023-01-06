import { AiOutlineClose } from "react-icons/ai";
import { Button } from "@chakra-ui/react";
import { FormEventHandler } from "react";

type Props = {
  onClick: FormEventHandler;
};

export const DeleteButton = (props: Props): JSX.Element => {
  return (
    <Button
      onClick={props.onClick}
      color={"#86C8D0"}
      transition={".3s"}
      borderWidth={"1px"}
      borderColor={"#86C8D0"}
      bgColor={"white"}
      _hover={{ bgColor: "#86C8D0", color: "white" }}
    >
      <AiOutlineClose />
    </Button>
  );
};
