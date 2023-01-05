import { SubmitButton } from "formik-chakra-ui";

type Props = {
  text: string | number;
  w?: string;
};

export const StyledSubmitButton = (props: Props): JSX.Element => {
  return (
    <SubmitButton
      bgColor={"#17949D"}
      transition={".3s"}
      w={props.w}
      _hover={{ bgColor: "#77CBD1" }}
    >
      {props.text}
    </SubmitButton>
  );
};
