import {
  Flex,
  FlexProps,
  Text,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import { FieldHookConfig, useField } from "formik";
import { ChangeEvent } from "react";

type Props = {
  fieldProps: FieldHookConfig<string> & {
    name: string;
  };
  placeHolder?: string;
  flexProps?: FlexProps;
  textAreaProps?: TextareaProps;
};

export const StyledTextArea = (props: Props): JSX.Element => {
  const [field, meta, helpers] = useField(props.fieldProps);
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    helpers.setValue(e.target.value);
  };
  return (
    <Flex {...props.flexProps} direction={"column"}>
      <Textarea
        {...props.textAreaProps}
        onChange={handleChange}
        onClick={() => {
          helpers.setTouched(true);
        }}
        value={field.value}
        placeholder={props.placeHolder}
        focusBorderColor={"#86C8D0"}
      />
      {meta.touched && meta.error && (
        <Text color={"red.500"} fontSize={"14px"}>
          {meta.error}
        </Text>
      )}
    </Flex>
  );
};
